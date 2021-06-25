import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import _ from 'lodash';
import { TYSdk } from 'tuya-panel-kit';
import Res from './res';
import Styles from './style';
import { TYIpcPtzProps } from './interface';
import Config from './config';
import CameraManager from '../ty-ipc-native/nativeApi';

const { smallScreen, middlleScreen, is7Plus } = Config;

const TYIpcPtz: React.FC<TYIpcPtzProps> & {
  defaultProps: Partial<TYIpcPtzProps>;
} = (props: TYIpcPtzProps) => {
  const {
    pieWidth,
    pieHeight,
    activeColor,
    containerStyle,
    dotStyle,
    themeType,
    disabled,
    hasPtzUp,
    hasPtzDown,
    hasPtzLeft,
    hasPtzRight,
  } = props;
  const ptzdata = [
    {
      key: 'up',
      imageSource: themeType === 'dark' ? Res.circleHoverUpDark : Res.circleHoverUp,
      hasPtz: hasPtzUp,
    },
    {
      key: 'right',
      imageSource: themeType === 'dark' ? Res.circleHoverRightDark : Res.circleHoverRight,
      hasPtz: hasPtzRight,
    },
    {
      key: 'left',
      imageSource: themeType === 'dark' ? Res.circleHoverLeftDark : Res.circleHoverLeft,
      hasPtz: hasPtzLeft,
    },
    {
      key: 'down',
      imageSource: themeType === 'dark' ? Res.circleHoverDownDark : Res.circleHoverDown,
      hasPtz: hasPtzDown,
    },
  ];
  const [ptzData, setptzData] = useState(ptzdata);
  const [hoverKey, sethoverKey] = useState(-1);

  useEffect(() => {
    const ptzSchema = TYSdk.device.getDpSchema('ptz_control');
    if (ptzSchema !== undefined) {
      const ptz = ptzSchema.range;
      const oldPtzData = ptzData;
      const hasTop = _.indexOf(ptz, '0');
      const hasBottom = _.indexOf(ptz, '4');
      const hasLeft = _.indexOf(ptz, '6');
      const hasRight = _.indexOf(ptz, '2');
      if (hasTop !== -1) {
        oldPtzData[0].hasPtz = true;
      }
      if (hasRight !== -1) {
        oldPtzData[1].hasPtz = true;
      }
      if (hasLeft !== -1) {
        oldPtzData[2].hasPtz = true;
      }
      if (hasBottom !== -1) {
        oldPtzData[3].hasPtz = true;
      }
      setptzData(oldPtzData);
    }
  }, []);

  const pressIn = (index: number) => {
    sethoverKey(index);
    props.pressIn(index);
  };
  const pressOut = index => {
    sethoverKey(-1);
    props.pressOut(index);
  };

  const pieItemRender = (pieItemWidth, pieItemHeight, containerBgImg) => {
    return ptzData.map((item, index) => (
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!item.hasPtz || disabled}
        onPressIn={() => pressIn(index)}
        onPressOut={() => pressOut(index)}
        key={item.key}
        style={[
          Styles.pieCommon,
          {
            backgroundColor: containerBgImg ? 'transparent' : '#fff',
            width: pieItemWidth,
            height: pieItemHeight,
          },
        ]}
      >
        {item.imageSource && hoverKey === index && (
          <View style={Styles.hoverImage}>
            <Image
              source={item.imageSource}
              style={{
                width: pieItemWidth,
                height: pieItemWidth,
                tintColor: activeColor === '#fc2f07' ? undefined : activeColor,
              }}
            />
          </View>
        )}
        {item.hasPtz && (
          <View style={Styles.ptzDotImage}>
            <Image source={Res.ptzDot} style={[Styles.dotImage, dotStyle]} />
          </View>
        )}
      </TouchableOpacity>
    ));
  };

  let pieSize = 200;

  if (smallScreen) {
    pieSize = 130;
  } else if (middlleScreen) {
    if (is7Plus) {
      pieSize = 200;
    } else {
      pieSize = 170;
    }
  }

  const pieItemWidth = pieWidth / 2;
  const pieItemHeight = pieHeight / 2;

  return (
    <View style={Styles.PtzCommonPage}>
      <View
        style={[
          {
            width: pieWidth,
            height: pieHeight,
            borderRadius: pieWidth / 2,
            overflow: 'hidden',
          },
          containerStyle,
        ]}
      >
        {themeType ? (
          <ImageBackground
            source={themeType === 'dark' ? Res.ptzBgImgDark : Res.ptzBgImg}
            style={[
              Styles.pieBox,
              {
                width: pieWidth,
                height: pieHeight,
                transform: [{ rotate: '45deg' }],
              },
            ]}
          >
            {pieItemRender(pieItemWidth, pieItemHeight, themeType)}
          </ImageBackground>
        ) : (
          <View
            style={[
              Styles.pieBox,
              {
                width: pieWidth,
                height: pieHeight,
                transform: [{ rotate: '45deg' }],
              },
            ]}
          >
            {pieItemRender(pieItemWidth, pieItemHeight, themeType)}
          </View>
        )}
      </View>
    </View>
  );
};

TYIpcPtz.defaultProps = {
  containerStyle: {},
  dotStyle: {},
  disabled: false,
  pieWidth: 200,
  pieHeight: 200,
  themeType: 'light',
  hasPtzUp: true,
  hasPtzDown: true,
  hasPtzLeft: true,
  hasPtzRight: true,
  pressIn: index => {
    if (index === 0) {
      CameraManager.startPtzUp();
    } else if (index === 1) {
      CameraManager.startPtzRight();
    } else if (index === 2) {
      CameraManager.startPtzLeft();
    } else if (index === 3) {
      CameraManager.startPtzDown();
    }
  },
  pressOut: () => {
    CameraManager.stopPtz();
  },
};

export default TYIpcPtz;
