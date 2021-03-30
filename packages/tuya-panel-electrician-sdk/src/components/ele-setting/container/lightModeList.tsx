import React, { Component } from 'react';
import { TouchableOpacity, Animated, View, StyleSheet, FlatList } from 'react-native';
import { Utils, TYText, IconFont, Divider, TYSdk, Popup } from 'tuya-panel-kit';
import Strings from '../i18n';
import { LightModeProps, LightModeState, DefaultLightModeProps } from './index.type';

const TYDevice = TYSdk.device;
const { convertX: cx } = Utils.RatioUtils;
const selectedPath =
  'M288.67 521.63l18.69-25.26a5.217 5.217 0 0 1 7.29-1.09c0.02 0.01 0.04 0.03 0.06 0.04l113.01 86.01a5.216 5.216 0 0 0 6.48-0.13l275.9-228.25a5.22 5.22 0 0 1 6.97 0.29l17.32 16.98a5.212 5.212 0 0 1 0.07 7.37l-0.08 0.08-299.65 292.84a5.221 5.221 0 0 1-7.37-0.08l-0.01-0.01-138.22-142.06a5.206 5.206 0 0 1-0.46-6.73z';

export default class LightModeList extends Component<LightModeProps, LightModeState> {
  static defaultProps = DefaultLightModeProps;

  constructor(props: LightModeProps) {
    super(props);
    const { value } = props;
    this.state = {
      selectValue: value,
    };
  }

  _handleToSet = (value: any) => {
    const { code } = this.props;
    this.setState(
      {
        selectValue: value,
      },
      () => {
        TYDevice.putDeviceData({
          [code]: value,
        });
        Popup.close();
      }
    );
  };

  renderItem = ({ item }: any) => {
    const { iconTintColor } = this.props;
    const { title, value } = item;
    const { selectValue } = this.state;
    const isSelect = value === selectValue;
    const subTitle = Strings.getLang(`light_mode_${value}_tip`);
    return (
      <TouchableOpacity style={styles.itemContent} onPress={() => this._handleToSet(value)}>
        <View style={styles.leftContent}>
          <TYText style={styles.title} numberOfLines={1}>
            {title}
          </TYText>
          {value !== 'none' && (
            <TYText style={styles.subTitle} numberOfLines={2}>
              {subTitle}
            </TYText>
          )}
        </View>
        {isSelect && (
          <Animated.View
            style={{
              transform: [
                {
                  rotateX: '180deg',
                },
              ],
            }}
          >
            <IconFont useART d={selectedPath} size={cx(28)} color={iconTintColor} />
          </Animated.View>
        )}
      </TouchableOpacity>
    );
  };

  render() {
    const { dataSource } = this.props;
    return (
      <View style={[styles.content, { height: 65 * dataSource.length }]}>
        <FlatList
          data={dataSource}
          keyExtractor={item => item.key}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <Divider height={StyleSheet.hairlineWidth} color="rgba(51, 51, 51, 0.1)" />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 195,
    justifyContent: 'center',
    width: cx(375),
  },
  itemContent: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 65,
    justifyContent: 'space-between',
    paddingLeft: cx(24),
    paddingRight: cx(28),
    width: cx(375),
  },
  leftContent: {
    alignItems: 'flex-start',
    height: 65,
    justifyContent: 'center',
    width: cx(290),
  },
  subTitle: {
    backgroundColor: 'transparent',
    color: '#999999',
    fontSize: 10,
    marginTop: 5,
  },
  title: {
    backgroundColor: 'transparent',
    color: '#333333',
    fontSize: 16,
  },
});
