/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC } from 'react';
import { View, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { TYText, Button, Divider, TYSdk, Popup } from 'tuya-panel-kit';
import { TipItem, AddDeviceTipProps, AddDeviceTipModalProps } from './interface';
import Strings from './i18n';
import styles from './styles';

const { width: windowWidth } = Dimensions.get('window');

const AddDeviceTipModal = {
  show: ({
    maskStyle = { backgroundColor: 'rgba(51, 51, 51, 0.7)' },
    onMaskPress = () => Popup.close(),
    ...rest
  }: AddDeviceTipModalProps) =>
    Popup.custom(
      {
        // @ts-ignore
        showTitleDivider: false,
        titleWrapperStyle: { display: 'none' },
        footerWrapperStyle: { display: 'none' },
        content: <AddDeviceTip {...rest} />,
        wrapperStyle: { alignSelf: 'center', backgroundColor: 'transparent' },
      },
      {
        alignContainer: 'center',
        onMaskPress,
        maskStyle,
      }
    ),
};

const AddDeviceTip: FC<AddDeviceTipProps> = ({
  title,
  desc,
  contentPaddingHorizontal,
  titleNumberOfLines,
  descNumberOfLines,
  itemNumberOfLines,
  appHelpUrl,
  appSearchUrl,
  dividerColor,
  dataSource,
  containerStyle,
  addButtonText,
  addButtonStyle,
  addButtonTextStyle,
  addButtonWrapperStyle,
  closeButtonSize,
  closeButtonIcon,
  closeButtonIconColor,
  closeButtonStyle,
  closeButtonTextStyle,
  closeButtonWrapperStyle,
  moreButtonText,
  moreButtonStyle,
  moreButtonTextStyle,
  titleStyle,
  descStyle,
  tipListStyle,
  renderTipItem,
  renderSeparatorComponent,
  closeModal,
  moreButtonOnPress,
  addButtonOnPress,
}: AddDeviceTipProps) => {
  const renderItem = ({ item }: { item: TipItem }) => {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View style={[styles.rowLine, styles.item]}>
          <Image
            style={styles.itemImg}
            source={typeof item.icon === 'string' ? { uri: item.icon } : item.icon}
          />
          <View style={styles.itemContent}>
            <TYText style={styles.itemDesc} numberOfLines={itemNumberOfLines}>
              <TYText text={`${item.name} `} style={styles.itemTitle} />
              <TYText>{item.content}</TYText>
            </TYText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.modalContainer, { paddingHorizontal: contentPaddingHorizontal }]}>
      <View
        style={[
          styles.container,
          { width: windowWidth - 2 * contentPaddingHorizontal },
          containerStyle,
        ]}
      >
        <TYText style={[styles.title, titleStyle]} numberOfLines={titleNumberOfLines}>
          {title}
        </TYText>
        <TYText style={[styles.desc, descStyle]} numberOfLines={descNumberOfLines}>
          {desc}
        </TYText>
        <FlatList
          style={[styles.list, tipListStyle]}
          data={dataSource}
          renderItem={renderTipItem !== null ? renderTipItem : renderItem}
          ItemSeparatorComponent={
            renderSeparatorComponent !== null
              ? renderSeparatorComponent
              : () => <Divider color={dividerColor} height={1} />
          }
          showsVerticalScrollIndicator={false}
        />
        <Button
          text={moreButtonText}
          textStyle={[styles.moreText, moreButtonTextStyle]}
          style={[styles.moreBtn, moreButtonStyle]}
          activeOpacity={0.8}
          onPress={() => moreButtonOnPress(appHelpUrl)}
        />
        <Divider color={dividerColor} height={1} />
        <Button
          text={addButtonText}
          textStyle={[styles.addBtnText, addButtonTextStyle]}
          style={[styles.addBtn, addButtonStyle]}
          wrapperStyle={[styles.addBtnBox, addButtonWrapperStyle]}
          activeOpacity={0.8}
          onPress={() => addButtonOnPress(appSearchUrl)}
        />
      </View>
      <Button
        icon={closeButtonIcon}
        iconColor={closeButtonIconColor}
        wrapperStyle={[styles.closeBtnWrapper, closeButtonWrapperStyle]}
        textStyle={[closeButtonTextStyle]}
        style={[styles.closeBtn, closeButtonStyle]}
        size={closeButtonSize}
        onPress={closeModal}
      />
    </View>
  );
};
AddDeviceTip.defaultProps = {
  title: Strings.getLang('addTitle'),
  desc: Strings.getLang('addDesc'),
  contentPaddingHorizontal: 20,
  titleNumberOfLines: 3,
  descNumberOfLines: 3,
  itemNumberOfLines: 2,
  appHelpUrl: 'device_gw_sub_device_help_list',
  appSearchUrl: 'device_only_search_config_gw_sub',
  dividerColor: '#E8E8E8',
  dataSource: [],
  containerStyle: {},
  addButtonText: Strings.getLang('toAdd'),
  addButtonStyle: {},
  addButtonTextStyle: {},
  addButtonWrapperStyle: {},
  closeButtonSize: 16,
  closeButtonIcon: 'close',
  closeButtonIconColor: '#FFF',
  closeButtonStyle: {},
  closeButtonTextStyle: {},
  closeButtonWrapperStyle: {},
  moreButtonText: Strings.getLang('toMoreSub'),
  moreButtonStyle: {},
  moreButtonTextStyle: {},
  titleStyle: {},
  descStyle: {},
  tipListStyle: {},
  renderTipItem: null,
  renderSeparatorComponent: null,
  closeModal: () => Popup.close(),
  moreButtonOnPress: (url: string) => {
    Popup.close();
    setTimeout(() => {
      TYSdk.native.jumpTo(`tuyaSmart://${url}?gwId=${TYSdk.devInfo.devId}`);
    }, 300);
  },
  addButtonOnPress: (url: string) => {
    Popup.close();
    setTimeout(() => {
      TYSdk.native.jumpTo(`tuyaSmart://${url}?gwId=${TYSdk.devInfo.devId}`);
    }, 300);
  },
};

export { AddDeviceTip, AddDeviceTipModal };
