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
    panelItemActiveColor,
    containerStyle,
    rotateDegree,
    themeType,
    disabled,
  } = props;
  const [ptzData, setptzData] = useState([
    {
      key: 'up',
      imageSource: themeType === 'dark' ? Res.circleHoverUpDark : Res.circleHoverUp,
      hasPtz: true,
    },
    {
      key: 'right',
      imageSource: themeType === 'dark' ? Res.circleHoverRightDark : Res.circleHoverRight,
      hasPtz: true,
    },
    {
      key: 'left',
      imageSource: themeType === 'dark' ? Res.circleHoverLeftDark : Res.circleHoverLeft,
      hasPtz: true,
    },
    {
      key: 'down',
      imageSource: themeType === 'dark' ? Res.circleHoverDownDark : Res.circleHoverDown,
      hasPtz: true,
    },
  ]);
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
        disabled={(item.hasPtz !== undefined && !item.hasPtz) || disabled}
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
                tintColor: panelItemActiveColor === '#fc2f07' ? undefined : panelItemActiveColor,
              }}
            />
          </View>
        )}
        {item.hasPtz && (
          <View style={Styles.ptzDotImage}>
            <Image source={Res.ptzDot} style={{ width: 10, height: 10, tintColor: '#fc2f07' }} />
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

  const pieNumber = ptzData.length;
  const pieItemWidth = pieWidth / (pieNumber / 2);
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
                transform: [{ rotate: rotateDegree }],
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
                transform: [{ rotate: rotateDegree }],
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
  disabled: false,
  pieWidth: 200,
  pieHeight: 200,
  pieNumber: 4,
  themeType: 'light',
  rotateDegree: '45deg',
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
