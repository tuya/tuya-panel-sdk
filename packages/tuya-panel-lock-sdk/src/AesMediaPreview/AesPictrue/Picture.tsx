import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import { Utils } from 'tuya-panel-kit';
import ViewTransformer from 'react-native-easy-view-transformer';
import res from '../../res';
import { useToast } from '../../hooks';
import Strings from '../i18n';
import AesImage from './AesImage';
import { IPictureProps } from '../interface';

const downloader = NativeModules.TYRCTEncryptImageDownloadManager;

const { width: screenWidth, height: screenHeight, convertX: cx, convertY: cy } = Utils.RatioUtils;

const Picture: React.FC<IPictureProps> = ({
  onClose,
  imageKey,
  imagePath,
  rotate,
  width,
  height,
  onLoadImageFailed,
  onLoadImageSuccess,
  downloadAble = true,
}) => {
  const [toastElement, toastApi] = useToast();

  const handleDownLoad = () => {
    try {
      toastApi.loading();
      downloader.saveToAlbum(
        imagePath,
        imageKey,
        () => {
          toastApi.success(Strings.getLang('saveSuccess'));
        },
        () => {
          toastApi.error(Strings.getLang('saveFail'));
        }
      );
    } catch (err) {
      toastApi.error(Strings.getLang('saveFail'));
    }
  };

  const imgWidth = width !== undefined ? width : screenWidth;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Image source={res.minclose} style={styles.closeIcon} />
        </TouchableWithoutFeedback>

        <ViewTransformer
          maxScale={2}
          enableTranslate={false}
          enableScale
          onSingleTapConfirmed={() => {
            onClose && onClose();
          }}
        >
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <AesImage
              width={imgWidth}
              height={height}
              rotate={rotate}
              imageKey={imageKey}
              imagePath={imagePath}
              onLoadImageSuccess={onLoadImageSuccess}
              onLoadImageFailed={onLoadImageFailed}
            />
          </View>
        </ViewTransformer>

        {downloadAble && (
          <TouchableOpacity
            testID="download-btn"
            style={styles.downloadButton}
            onPress={handleDownLoad}
          >
            <Image source={res.download} style={{ width: cy(32), height: cy(32) }} />
          </TouchableOpacity>
        )}

        {toastElement}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    height: cy(32),
    left: cx(16),
    marginLeft: cx(16),
    marginTop: cy(40),
    position: 'absolute',
    top: cx(23),
    width: cy(32),
    zIndex: 9999,
  },

  container: {
    alignItems: 'center',
    backgroundColor: '#000',
    height: screenHeight,
    justifyContent: 'center',
    position: 'relative',
    width: screenWidth,
  },

  downloadButton: {
    bottom: cx(75),
    position: 'absolute',
    right: cx(16),
    zIndex: 9999,
  },
});

export default Picture;
