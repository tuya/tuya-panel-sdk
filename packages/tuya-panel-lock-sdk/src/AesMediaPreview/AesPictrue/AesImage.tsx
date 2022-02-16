import React, { useState, useRef } from 'react';
import { View, requireNativeComponent, ViewStyle } from 'react-native';
import moment from 'moment';
import { Utils } from 'tuya-panel-kit';
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
  errorImage = <View />,
}) => {
  const [isError, setisError] = useState(false);
  const [imgWidth, setImageWidth] = useState(width);
  const [imgHeight, setImageHeight] = useState(height);
  const [imgKey, setImgkey] = useState(moment().valueOf());
  /** 记录重新渲次数 */
  const reRenderCount = useRef<number>(0);
  const noImageInfo = !imagePath && !imageKey;
  const boxWidth = width || winWidth;

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
    /** app 加载失败了 重新渲染五次 */
    if (reRenderCount.current < 5) {
      reRenderCount.current += 1;

      const updateKey = () => {
        setImgkey(moment().valueOf());
      };

      delayCall(updateKey, 2000);
    } else {
      setisError(true);
      onLoadImageFailed && onLoadImageFailed(e);
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
    width: imgWidth,
    height: imgHeight,
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
        <View style={errorBgStyle}>{errorImage}</View>
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
