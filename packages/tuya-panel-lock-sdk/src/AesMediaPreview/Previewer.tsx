import React from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Utils, TYText } from 'tuya-panel-kit';
import Video from './AesVideo/Video';
import Picture from './AesPictrue/Picture';
import Mantle from './Mantle';
import { IPreviewer } from './interface';

const { convertX: cx } = Utils.RatioUtils;

/**
 * 判断状态栏是否在手机屏幕内
 * @returns boolean
 */
const isStatusBarInScreen = () => {
  const screen = Dimensions.get('screen');
  const window = Dimensions.get('window');

  return screen.height === window.height;
};

const Preview: React.FC<IPreviewer> = React.forwardRef(
  ({
    imageKey,
    imagePath,
    videoKey,
    videoSource,
    rotate,
    onClose,
    headerText,
    errorText,
    errorImage,
    ...restProps
  }) => {
    const needPadding = isStatusBarInScreen() || Utils.RatioUtils.isIphoneX;
    let content = null;

    if (videoSource && videoKey) {
      content = (
        <Video
          imageKey={imageKey}
          imagePath={imagePath}
          videoSource={videoSource}
          videoKey={videoKey}
          rotate={rotate}
          errorImage={errorImage}
          errorText={errorText}
          {...restProps}
        />
      );
    } else {
      content = (
        <Picture
          imageKey={imageKey}
          imagePath={imagePath}
          rotate={rotate}
          onClose={onClose}
          errorImage={errorImage}
          {...restProps}
        />
      );
    }

    const handlePress = () => {
      onClose && onClose();
    };

    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
          {!!headerText && (
            <Mantle
              style={[
                styles.header,
                {
                  /** 防止刘海屏遮挡 */
                  top: needPadding ? Utils.RatioUtils.statusBarHeight : 0,
                },
              ]}
              height={cx(60)}
            >
              <TYText style={[styles.headerTitle, { fontSize: cx(12) }]} text={headerText} />
            </Mantle>
          )}
          {content}
        </View>
      </TouchableWithoutFeedback>
    );
  }
);

Preview.displayName = 'AVPreview';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
  },

  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: cx(8),
    position: 'absolute',
    width: '100%',
    zIndex: 999,
  },

  headerTitle: {
    color: '#fff',
    fontSize: cx(16),
  },
});

export default Preview;
