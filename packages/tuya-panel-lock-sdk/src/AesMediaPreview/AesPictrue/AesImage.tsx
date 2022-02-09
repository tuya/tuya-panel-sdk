import React, { useState, useRef, useEffect } from 'react';
import { View, requireNativeComponent, ViewStyle, Image, StyleSheet } from 'react-native';
import moment from 'moment';
import { Utils, TYText } from 'tuya-panel-kit';
import { delayCall } from '../../utils';
import { IAesImage } from '../interface';

const { isIos, width: winWidth, convertX: cx } = Utils.RatioUtils;

const isValidNumber = (r: any) => r !== undefined && r !== null && !Number.isNaN(r);

const AESImageView = isIos
  ? requireNativeComponent('TYRCTAESImageView')
  : requireNativeComponent('TYRCTEncryptImageManager');

const AesImage: React.FC<IAesImage> = ({
  imageStyle,
  width = cx(50),
  height,
  onLoadImageFailed,
  onLoadImageSuccess,
  rotate = 0,
  imageKey,
  imagePath,
  errorImage = (
    <Image source={require('../res/failFace.png')} style={{ width: '50%', height: '50%' }} />
  ),
  errorTextStyle,
  errorText = '加载失败',
}) => {
  const [isError, setisError] = useState(false);
  const [imgWidth, setImageWidth] = useState(width);
  const [imgHeight, setImageHeight] = useState(height);
  const [imgKey, setImgkey] = useState(moment().valueOf());
  /** 记录重新渲次数 */
  const reRenderCount = useRef<number>(0);
  const reRenderTimer = useRef<ReturnType<typeof setTimeout>>();
  const noImageInfo = !imagePath && !imageKey;
  const boxWidth = width || winWidth;

  useEffect(() => {
    return () => clearTimeout(reRenderTimer.current);
  }, []);

  /** 旋转后是否为 水平状态 */
  const isHorizontal = !isValidNumber(rotate) || rotate % 180 === 0;

  const onLoadImgSuccess = (data: { width: number; height: number }) => {
    reRenderCount.current = 0;

    const { width: w, height: h } = data || {};
    const rate = isHorizontal ? h / w : w / h;
    const caclHeight = rate * boxWidth;

    const imgW = isHorizontal ? boxWidth : caclHeight;
    const imgH = isHorizontal ? caclHeight : boxWidth;

    setImageWidth(imgW);
    setImageHeight(isValidNumber(height) ? height : imgH);

    isError && setisError(false);

    onLoadImageSuccess && onLoadImageSuccess({ width: imgW, height: imgHeight });
  };

  const onLoadImgFail = (e: Error) => {
    setisError(true);
    onLoadImageFailed && onLoadImageFailed(e);
    /** app 加载失败了 重新渲染五次 */
    if (reRenderCount.current < 5) {
      reRenderCount.current += 1;

      const updateKey = () => {
        setImgkey(moment().valueOf());
      };

      reRenderTimer.current = delayCall(updateKey, 2000);
    }
  };

  if (noImageInfo) return <View />;

  const aesImageStyles: ViewStyle = {
    width: imgWidth,
    height: imgHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    transform: [{ rotate: `${rotate}deg` }],
  };

  const errorBgStyle: ViewStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    width,
    height: width,
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: isHorizontal ? imgWidth : imgHeight,
      }}
    >
      {isError ? (
        <View style={errorBgStyle}>
          {errorImage}
          <TYText
            style={StyleSheet.flatten([{ color: '#fff', fontSize: cx(18) }, errorTextStyle])}
            text={errorText}
          />
        </View>
      ) : (
        <AESImageView
          key={imgKey}
          style={[aesImageStyles, imageStyle]}
          info={{
            imagePath,
            encryptKey: imageKey,
          }}
          encryptPath={imagePath}
          encryptKey={imageKey}
          onLoadSuccess={(e: any) => onLoadImgSuccess(e.nativeEvent)}
          onLoadFailure={(e: any) => onLoadImgFail(e)}
        />
      )}
    </View>
  );
};

export default React.memo(AesImage);
