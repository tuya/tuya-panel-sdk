import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import ImagePicker from '@tuya-rn/react-native-image-picker';
import { AvatarProps, PickerResponseType } from './interface';
import Strings from './i18n';

const avatarSizes = {
  small: 34,
  medium: 50,
  large: 75,
  xlarge: 150,
};

const eventNamesMap = {
  picker: 'showImagePicker',
  camera: 'launchCamera',
  library: 'launchImageLibrary',
};

const defaultPickerProps: AvatarProps['pickerProps'] = {
  title: Strings.getLang('TYLock_default_Picker_Title'),
  cancelButtonTitle: Strings.getLang('TYLock_default_Cancel_Title'),
  chooseFromLibraryButtonTitle: Strings.getLang('TYLock_default_Choose_Title'),
  takePhotoButtonTitle: Strings.getLang('TYLock_default_Photo_Title'),
};

const defaultAccessary = require('./res/camera.png');
const defaultuser = require('./res/user.png');

const Avatar: React.FC<AvatarProps> = ({
  onPress,
  source,
  type = 'circle',
  size = 'medium',
  showPicker = false,
  pickerProps = {},
  onSuccess,
  onError,
  containerStyle,
  accessaryStyle,
  accessarySource,
  avatarStyle,
  children,
  placeholderSource,
  Component = onPress || showPicker ? TouchableOpacity : View,
  ...restProps
}: AvatarProps) => {
  const width = typeof size === 'number' ? size : avatarSizes[size];
  const height = width;
  const accessaryWidth = width / 3;
  const accessaryHeight = height / 3;
  const composeContainerStyle = StyleSheet.flatten([
    styles.container,
    containerStyle,
    { width, height },
  ]);
  const imageContainerStyle = StyleSheet.flatten([
    styles.imageContainer,
    type === 'circle' && { borderRadius: width / 2, resizeMode: 'contain' },
    { width, height },
  ]);
  // 角标
  const accessory = showPicker && (
    <TouchableHighlight
      testID="TYLock_Avatar_AccessaryIcon"
      style={StyleSheet.flatten([
        styles.accessoryIcon,
        { height: accessaryHeight, width: accessaryWidth, borderRadius: accessaryWidth / 2 },
        accessaryStyle,
      ])}
    >
      <Image style={styles.cameraIcon} source={accessarySource || defaultAccessary} />
    </TouchableHighlight>
  );

  const handlePickerPress = () => {
    const eventName =
      (typeof showPicker === 'string' && eventNamesMap[showPicker]) || eventNamesMap.picker;
    const fn = ImagePicker[eventName];
    try {
      fn &&
        fn({ ...defaultPickerProps, ...pickerProps }, async (response: PickerResponseType) => {
          if (!response.didCancel && !response.error) {
            onSuccess && onSuccess(response);
          } else {
            onError && onError(response);
          }
        });
    } catch (e) {
      // e
    }
  };

  return (
    <Component
      {...restProps}
      testID="TYLock_Avatar_Container"
      style={composeContainerStyle}
      onPress={onPress || handlePickerPress}
    >
      <>
        <View testID="TYLock_Avatar_ImageContainer" style={imageContainerStyle}>
          <Image
            testID="TYLock_Avatar_Image"
            source={source || placeholderSource || defaultuser}
            style={[styles.avatar, avatarStyle]}
          />
        </View>
        {accessory}
        {children}
      </>
    </Component>
  );
};

const styles = StyleSheet.create({
  accessoryIcon: {
    bottom: 0,
    height: 25,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    width: 25,
  },
  avatar: {
    height: '100%',
    width: '100%',
  },
  cameraIcon: {
    height: '100%',
    width: '100%',
  },
  container: {
    position: 'relative',
  },
  imageContainer: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
});

export default Avatar;
