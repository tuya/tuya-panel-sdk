import React, { useContext, useState, useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Utils, TYText, Button, TYSdk } from 'tuya-panel-kit';
import { AesImage } from '../AesMediaPreview';
import Strings from './i18n';
import Mantle from './Mantle';
import ManagerContext from './context/managerContext';
import { ImagePannelProps } from './interface';
import DPUtil from '../utils/DPUtil';

const DP = DPUtil.createPageDp();
const { width: screenWidth, convertX: cx } = Utils.RatioUtils;

const ImagePannel: React.FC<ImagePannelProps> = ({ contentHeight = 500 }) => {
  const manager = useContext(ManagerContext);
  const { toastApi, dpData } = manager;
  const [photoAgainDisable, setPhotoAgainDisable] = useState<boolean>(false);
  const hasPhotoAgain = TYSdk.device.checkDpExist('photo_again');

  useEffect(() => {
    return () => {
      DP.off();
    };
  }, []);

  const onLoadSuccess = () => {
    manager.toastApi?.success(Strings.getLang('TYLock_getSuccess'));
  };

  const renderImage = () => {
    return (
      <AesImage
        width={screenWidth}
        rotate={dpData.imageFiles?.rotate}
        imagePath={dpData.imageFiles?.filePath}
        imageKey={dpData.imageFiles?.fileKey}
        onLoadImageFailed={onLoadSuccess}
      />
    );
  };

  const renderFail = () => {
    return (
      <View
        style={{
          height: cx(400),
          width: screenWidth,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image source={require('./res/failface.png')} />

        <TYText style={{ color: '#fff', fontSize: cx(16), marginTop: cx(12) }}>
          {Strings.getLang('TYLock_getFailed')}
        </TYText>

        <Button
          text={Strings.getLang('TYLock_refresh')}
          wrapperStyle={{
            width: cx(88),
            height: cx(40),
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: cx(20),
            marginTop: cx(32),
          }}
          textStyle={{
            color: '#fff',
            fontSize: cx(14),
          }}
          onPress={() => dpData.refreshImage()}
        />
      </View>
    );
  };

  const againCamera = () => {
    setPhotoAgainDisable(true);
    toastApi?.loading();

    DP.dispatch({ photo_again: true })
      .listenWithinTime('initiative_message', 30 * 1000)
      .reply(() => {
        toastApi?.hide();
        setPhotoAgainDisable(false);
      })
      .timeout(() => {
        setPhotoAgainDisable(false);
        toastApi?.error(
          `${Strings.getLang('TYLock_timeout')}, ${Strings.getLang('TYLock_photoAgainfail')}`
        );
      });
  };

  return (
    <View
      style={{
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        height: contentHeight,
      }}
    >
      {dpData.imageFiles.error ? renderFail() : renderImage()}

      <Mantle
        style={{
          position: 'absolute',
          zIndex: 999,
          bottom: 0,
          width: '100%',
        }}
        height={cx(88)}
        stops={{
          '0%': 'rgba(0,0,0,0)',
          '100%': 'rgba(0,0,0,0.4)',
        }}
      />

      {hasPhotoAgain && (
        <TouchableOpacity
          style={{
            alignItems: 'center',
            position: 'absolute',
            bottom: cx(42),
            zIndex: 9999,
          }}
          onPress={againCamera}
          disabled={photoAgainDisable}
        >
          <Image source={require('./res/camera.png')} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImagePannel;
