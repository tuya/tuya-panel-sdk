import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TYSdk, TYText, Utils, IconFont } from 'tuya-panel-kit';
import { CurtainControlProps, CurtainControlState } from './indexs';
import { renderStyle, DEFAULTPROPS, getTextColor, ICON, getDisable } from './utils';
import AnimateMotion from './animate';

const RATIO = 0.32;
const TYDevice = TYSdk.device;
const { convertX: cx } = Utils.RatioUtils;

export default class CurtainControl extends Component<CurtainControlProps, CurtainControlState> {
  static defaultProps = DEFAULTPROPS;

  constructor(props: CurtainControlProps) {
    super(props);
    this.state = {
      dpState: TYDevice.getState(),
    };
  }

  componentDidMount() {
    TYSdk.event.on('deviceDataChange', data => {
      if (data.type === 'dpData') {
        const { payload }: any = data;
        const { dpState } = this.state;
        const dpData = { ...payload };
        this.setState({ dpState: { ...dpState, ...dpData } });
      }
    });
  }

  get controlData() {
    const { data, open, close, isHorizontal, stop } = this.props;
    const { dpState } = this.state;
    return data.map((d: { [key: string]: string }) => {
      const { controlCode } = d;
      const { range = [] } = TYDevice.getDpSchema(controlCode) || { range: [] };
      const controlState = dpState[controlCode];
      const percentState = d.percentCode ? dpState[d.percentCode] : 0;
      return range.slice(0, 3).map((val: string) => {
        const isStop = val === 'stop';
        const onPress = () => this._handleToSet(controlCode, val);
        const isStopState = controlState === 'stop';
        return {
          key: val,
          title: getTextColor(val, open, close, stop).txt,
          titleColor: getTextColor(val, open, close, stop).color,
          onPress,
          icon: ICON[val],
          code: controlCode,
          element: isStop ? (
            <View />
          ) : (
            <AnimateMotion
              icon={ICON[val]}
              color={this.props[val].animateColor}
              isTop={val === 'open'}
              isHorization={isHorizontal}
              onPress={onPress}
            />
          ),
          needAnimate: !isStop && controlState === val,
          disabled: d.percentCode ? getDisable(val, percentState, isStopState) : false,
        };
      });
    });
  }

  _handleToSet = (code: string, val: string) => {
    TYDevice.putDeviceData({
      [code]: val,
    });
  };

  renderItem = ({ item }: any) => {
    const { title, icon, onPress, needAnimate, element, disabled, key, titleColor } = item;
    const { isHorizontal, radius, smallCircleBg, smallBorderColor } = this.props;
    const isStop = key === 'stop';
    const MARGIN = isHorizontal ? 0 : cx(10);
    const wt = (radius / 3) * 2;
    const smallRadius = RATIO * radius;
    const wts = {
      width: wt,
      height: wt,
    };
    return (
      <TouchableOpacity
        style={[
          styles.itemContent,
          {
            ...wts,
          },
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        {needAnimate ? (
          element
        ) : (
          <View style={[styles.itemContent, isHorizontal && { flexDirection: 'row' }, { ...wts }]}>
            {key === 'close' && (
              <TYText style={[styles.title, { color: titleColor, marginBottom: MARGIN }]}>
                {title}
              </TYText>
            )}
            <View
              style={[
                !isStop &&
                  isHorizontal && {
                    transform: [
                      {
                        rotate: '270deg',
                      },
                    ],
                  },
                key === 'stop' && {
                  ...renderStyle(smallRadius, smallCircleBg, smallBorderColor),
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
            >
              <IconFont d={icon} color={titleColor} size={cx(30)} />
            </View>
            {key === 'open' && (
              <TYText style={[styles.title, { color: titleColor, marginTop: MARGIN }]}>
                {title}
              </TYText>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  render() {
    const { radius, bigCircleBg, bigBorderColor, isHorizontal } = this.props;
    return (
      <View
        style={{
          ...renderStyle(radius, bigCircleBg, bigBorderColor),
        }}
      >
        <FlatList
          data={this.controlData[0]}
          keyExtractor={(item: any) => item.key}
          scrollEnabled={false}
          renderItem={this.renderItem}
          horizontal={isHorizontal}
          extraData={this.state}
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: cx(14),
  },
});
