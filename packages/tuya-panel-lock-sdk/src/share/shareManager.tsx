import React from 'react';
import { View, StyleSheet, Clipboard, NativeModules } from 'react-native';
import { Utils, Button, Popup, GlobalToast, Dialog } from 'tuya-panel-kit';
import { ShareMessageProps, shareItem as shareItemData } from './interface';
import { initShareList, getShareList } from './utils';

const shareManger = NativeModules.TYRCTShareManager;

const { width, convertX } = Utils.RatioUtils;

const ShareManager: React.FC<ShareMessageProps> = props => {
  const {
    themeColor,
    shareData,
    modalStyle,
    onClick,
    onFail,
    onSuccess,
    confirmText = 'Confirm',
    pswCopySuccess = 'Copy success',
    sendSuccess = 'Send success',
    sendSuccessTip = 'Current information sharing successfully',
    customShareList,
  } = props;
  const shareList = getShareList();
  const shareItem = (item: string) => {
    onClick && onClick(item);
    if (item === 'Copy') {
      Popup.close();
      Clipboard.setString(shareData.message);
      GlobalToast.show({
        text: pswCopySuccess,
      });
    } else {
      try {
        shareManger
          .share(item, shareData)
          .then(() => {
            Dialog.alert({
              title: sendSuccess,
              subTitle: sendSuccessTip,
              onConfirm: Dialog.close,
              confirmText,
            });
            onSuccess && onSuccess(type);
          })
          .catch((err: any) => {
            onFail && onFail(type, err);
          });
      } catch (e) {
        onFail && onFail(type, e);
      }
    }
  };

  const { type = initShareList } = shareManger || {};
  if (type.indexOf('Copy') === -1) {
    type.splice(-1, 0, 'Copy');
  }

  if (customShareList && customShareList.length > 0) {
    customShareList.forEach((item: shareItemData) => {
      if (shareList[item.key]) {
        shareList[item.key] = {
          img: item.img,
          title: item.title,
        };
      }
    });
  }
  return (
    <View style={[styles.container, modalStyle]}>
      {type.map((i: string) => {
        const { img, title } = shareList[i.toLocaleLowerCase()] || {};
        return (
          <Button
            wrapperStyle={{ width: width / 3 }}
            key={i}
            image={img}
            style={styles.btn}
            text={title}
            imageColor={themeColor}
            textStyle={styles.text}
            textDirection="bottom"
            onPress={() => {
              shareItem(i);
            }}
          />
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  btn: {
    borderRadius: convertX(23),
    height: convertX(46),
    marginTop: convertX(23),
    width: convertX(46),
  },
  container: {
    alignSelf: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 228,
    width,
  },
  text: {
    color: '#333',
    fontSize: 16,
    marginTop: 8,
  },
});

export default ShareManager;
