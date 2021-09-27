import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Popup, TYText } from 'tuya-panel-kit';
import { ShareProps } from './interface';
import ShareManager from './shareManager';

const Share: React.FC<ShareProps> = props => {
  const {
    shareMessage,
    text,
    style,
    textStyle,
    themeColor = '#239C8E',
    modalStyle,
    onClick,
    onFail,
    onSuccess,
    opacity,
    children,
    cancelText = 'Cancel',
    customShareList,
  } = props;
  const startShare = () => {
    Popup.custom({
      content: (
        <ShareManager
          shareData={{
            title: '',
            message: shareMessage,
          }}
          themeColor={themeColor}
          modalStyle={modalStyle}
          onClick={onClick}
          onFail={onFail}
          onSuccess={onSuccess}
          customShareList={customShareList}
        />
      ),
      title: <View />,
      footerType: 'singleCancel',
      cancelText,
      onCancel: Popup.close,
    });
  };
  return (
    <TouchableOpacity style={style} activeOpacity={opacity} onPress={startShare}>
      {(React.isValidElement(children) && children) || <TYText text={text} style={textStyle} />}
    </TouchableOpacity>
  );
};

export default Share;
