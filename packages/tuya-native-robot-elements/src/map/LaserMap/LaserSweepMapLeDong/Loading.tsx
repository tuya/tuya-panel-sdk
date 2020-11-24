import React, { PureComponent } from 'react';
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Utils, TYText } from '@tuya-rn/tuya-native-components';

import { LoadingBubbles } from '../../../components/Display/Loading';
import I18n from '../../../i18n';
import panelMapConfig, { ILaserMapPanelConfig } from './constant/panelMapConfig';
import res from './res';

const { convertY: cy, viewWidth } = Utils.RatioUtils;

interface IProps {
  loadingShowType?: ILaserMapPanelConfig['map']['loadingShowType'];
  loadingColor?: ILaserMapPanelConfig['map']['loadingColor'];
  loadingImageUri?: ILaserMapPanelConfig['map']['loadingImageUri'];
  isLoading?: boolean;
  isEmpty?: boolean;
  isLite?: boolean; // 小菊花模式
  isShowLoadingTips?: boolean; // 是否展示提示
}
export default class Loading extends PureComponent<IProps> {
  static defaultProps = {
    loadingShowType: panelMapConfig.map.loadingShowType,
    loadingColor: panelMapConfig.map.loadingColor,
    isLoading: false,
    isEmpty: false,
    isShowLoadingTips: false,
  };

  renderTips() {
    const { isLoading, isEmpty, isShowLoadingTips, loadingColor } = this.props;
    const textStyle = [styles.tips, { color: loadingColor }];
    if (!isShowLoadingTips) return null;
    if (isLoading) return <TYText style={textStyle} text={I18n.getLang('mapLoading')} />;
    if (isEmpty) return <TYText style={textStyle} text={I18n.getLang('mapEmpty')} />;
    return null;
  }

  renderLite() {
    const { loadingColor, isEmpty } = this.props;
    if (isEmpty) return null;
    return <ActivityIndicator size="large" color={loadingColor} />;
  }

  renderLoading() {
    const { loadingShowType, loadingColor, loadingImageUri } = this.props;

    // let context;
    switch (loadingShowType) {
      case 'bubble':
        return <LoadingBubbles size={10} color={loadingColor} />;

      case 'image':
        const imageSource = !!loadingImageUri ? { uri: loadingImageUri } : res.mapIcon;
        return <Image source={imageSource} style={styles.image} resizeMode="contain" />;
      default:
        return null;
    }
  }

  render() {
    const { isLite } = this.props;
    return (
      <View style={styles.loading}>
        {isLite ? this.renderLite() : [this.renderLoading(), this.renderTips()]}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    // flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: cy(120),
    height: cy(120),
    // opacity: 0.8,
  },
  tips: {
    marginTop: cy(20),
    color: 'rgba(255,255,255, 0.5)',
    textAlign: 'center',
    lineHeight: cy(21),
    maxWidth: viewWidth - cy(150),
  },
});
