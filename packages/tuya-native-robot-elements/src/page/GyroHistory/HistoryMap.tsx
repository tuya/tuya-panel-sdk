import React, { PureComponent } from 'react';
import { StyleSheet, View, StatusBarStyle, StatusBar } from 'react-native';
import {
  Utils,
  TopBar,
  TYText as TYTextBase,
  RefText as RefTextBase,
  TYSdk,
} from '@tuya-rn/tuya-native-components';
import GyroSweepMap from '../../components/Basic/RCTGyroMap';
import RobotCleanInfo, { CleanInfoEnum } from '../../components/RobotBusiness/RobotCleanInfo';

import Strings from '../../i18n';
import Res from './res';

const { convertX: cx, isIos, isIphoneX, convertY } = Utils.RatioUtils;
const backIcon = isIos ? 'backIos' : 'backAndroid';
const TYText = TYTextBase || RefTextBase;

interface HistoryMapProps {
  dayDate: string;
  timeDate: string;
  cleanArea: number;
  cleanTime: number;
  cleanAreaCode: string;
  cleanTimeCode: string;
  subRecordId: string;
  mapConfig: string;
  item: {};
  deleteApi(callback: () => any): void;
  barStyle: StatusBarStyle;

  gyroConfig?: any;
  iconVFlip?: boolean;
}

interface HistoryMapState {
  mapHeight: number;
}

export class HistoryMap extends PureComponent<HistoryMapProps, HistoryMapState> {
  static defaultProps = {
    gyroConfig: {},
  };
  state = {
    mapHeight: 0,
  };

  onLayout = (e: any) => {
    const { mapHeight } = this.state;

    if (mapHeight <= 0 && e) {
      this.setState({
        mapHeight: e.nativeEvent.layout.height,
      });
    }
  };

  handleHeaderLeft = () => {
    TYSdk.Navigator.pop();
  };

  handleHeaderRight = () => {
    this.props.deleteApi(TYSdk.Navigator.pop);
  };

  renderOldHeader = () => {
    const { barStyle } = this.props;
    const isDefaultTheme = barStyle !== 'default';
    return (
      <View>
        <TopBar
          alignCenter={true}
          textStyle={{ color: isDefaultTheme ? '#fff' : '#000', fontSize: 17 }}
          centerText={Strings.getLang('cleanDetail')}
          isLeftBack={true}
          rightImage={Res.delete}
          // rightText={rightText}
          isRightMore={false}
          onChange={(tab: string) => {
            if (tab === 'right') {
              this.handleHeaderRight();
            } else {
              this.handleHeaderLeft();
            }
          }}
        />
      </View>
    );
  };

  renderNewHeader = () => {
    const { barStyle } = this.props;
    const isDefaultTheme = barStyle !== 'default';
    return (
      <View>
        <StatusBar barStyle={barStyle} />
        <TopBar.Container>
          <TopBar.Action name={backIcon} onPress={this.handleHeaderLeft} />
          <TopBar.Content
            title={Strings.getLang('cleanDetail')}
            titleStyle={{ color: isDefaultTheme ? '#fff' : '#000', fontSize: 17 }}
          />
          <TopBar.Action source={Res.delete} onPress={this.handleHeaderRight} />
        </TopBar.Container>
      </View>
    );
  };

  renderHeader = () => {
    return !!TopBar.Action ? this.renderNewHeader() : this.renderOldHeader();
  };

  convertMapConfig = () => {
    const { mapConfig } = this.props;
    let mapMatrix = 199;
    let isTopLeft = true;
    if (mapConfig) {
      const array = Utils.StringUtils.hexStringToNumber(mapConfig);
      isTopLeft = array[0] === 0;
      mapMatrix =
        mapConfig.length === 4 ? array[1] : parseInt(mapConfig.substr(2, mapConfig.length), 16);
    }
    return { mapMatrix, isTopLeft };
  };

  render() {
    const {
      cleanArea,
      cleanTime,
      dayDate,
      timeDate,
      subRecordId,
      barStyle,
      cleanAreaCode,
      cleanTimeCode,
      iconVFlip,
      // themeColor,
      // fontColor,
      // topBarTextColor,
    } = this.props;
    const isDefaultTheme = barStyle !== 'default';
    const topBarTextColor = isDefaultTheme ? '#fff' : '#000';
    // const { fontColor, themeColor, topBarTextColor } = Config;

    const textColor = Utils.ColorUtils.color.hex2RgbString(topBarTextColor, 0.5);
    const infoData = {
      [CleanInfoEnum.CleanArea]: cleanArea,
      [CleanInfoEnum.CleanTime]: cleanTime,
    };
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <View style={styles.date}>
          <TYText style={[styles.textDay, { color: textColor, marginRight: cx(4) }]}>
            {dayDate}
          </TYText>
          <TYText style={[styles.textDay, { color: textColor }]}>{timeDate}</TYText>
        </View>
        <GyroSweepMap
          history={{ subRecordId }}
          subRecordId={subRecordId}
          // pointsColor={[themeColor, fontColor, themeColor]}
          {...this.convertMapConfig()}
          {...this.props.gyroConfig}
        />

        <RobotCleanInfo
          style={styles.info}
          data={infoData}
          isStatic={true}
          vFlip={iconVFlip}
          cleanAreaCode={cleanAreaCode}
          cleanTimeCode={cleanTimeCode}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  info: {
    marginBottom: convertY(isIphoneX ? 30 : 20),
  },

  date: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textDay: {
    fontSize: cx(12),
  },
});
