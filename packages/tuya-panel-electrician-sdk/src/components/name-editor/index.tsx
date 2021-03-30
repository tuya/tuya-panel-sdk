/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { TYSdk, Utils, TYText, IconFont } from 'tuya-panel-kit';
import { commonApi } from '@tuya/tuya-panel-api';
import Strings from './i18n';

const TYEvent = TYSdk.event;
const TYMobile = TYSdk.mobile;
const { getDpsInfos, getGroupDpsInfos, updateDpName, updateGroupDpName } = commonApi.deviceApi;

const { convertX: cx } = Utils.RatioUtils;

interface NameEditorProps {
  dpCode: string;
  eventType: 'Press' | 'LongPress';
  disabled?: boolean;
  stopPropagation?: boolean;
  wrapperStyle?: { [styleKey: string]: any };
  textStyle?: { [styleKey: string]: any };
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  defaultName?: string;
}

interface NameEditorState {
  name: string;
}

export default class NameEditor extends PureComponent<NameEditorProps, NameEditorState> {
  static defaultProps = {
    eventType: 'Press',
    iconSize: cx(10),
    iconColor: '#333',
    defaultName: '',
  };

  constructor(props: NameEditorProps) {
    super(props);
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    this.formatName();
    TYEvent.on('dpNameChanged', () => {
      this.formatName();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dpCode !== nextProps.dpCode) {
      this.formatName(nextProps);
    }
  }

  getDpLang = (dpCode, defaultName) => {
    const str = Strings.getDpLang(dpCode);
    if (str.startsWith('dp_') && !!defaultName) {
      return defaultName;
    }
    return str;
  };

  get wrapperConfig() {
    const { stopPropagation, disabled, eventType, dpCode, wrapperStyle } = this.props;
    const common = { style: [styles.container, wrapperStyle] };
    if (!stopPropagation && !disabled && dpCode) {
      return { ...common, [`on${eventType}`]: this.handleNameEditor };
    }
    return {};
  }

  formatName = async (props?) => {
    const { dpCode, defaultName } = props || this.props;
    const { devId } = TYSdk.devInfo;
    // @ts-ignore
    const isGroup = !!TYSdk.devInfo.groupId;
    let n = '';
    if (dpCode) {
      try {
        // @ts-ignore
        const postData = isGroup ? TYSdk.devInfo.groupId : { gwId: devId, devId };
        const func = isGroup ? getGroupDpsInfos : getDpsInfos;
        const dps: any = Platform.OS === 'web' ? [] : await func(postData);
        const { name } = dps.find(({ code }) => code === dpCode) || { name: '' };
        n = name;
      } catch (error) {
        return;
      }
      this.setState({ name: n || this.getDpLang(dpCode, defaultName) });
    }
  };

  handleNameEditor = () => {
    const { dpCode } = this.props;
    const { name } = this.state;
    TYMobile.showEditDialog(
      Strings.getLang('edit'),
      name,
      async value => {
        const newName = value.trim().substr(0, 10);
        if (newName) {
          const { devId } = TYSdk.devInfo;
          // @ts-ignore
          const isGroup = !!TYSdk.devInfo.groupId;
          const postData: any = isGroup
            ? {
                // @ts-ignore
                groupId: TYSdk.devInfo.groupId,
                dpId: TYSdk.device.getDpIdByCode(dpCode),
                name: newName,
              }
            : {
                gwId: devId,
                devId,
                dpId: TYSdk.device.getDpIdByCode(dpCode),
                name: newName,
              };
          const func = isGroup ? updateGroupDpName : updateDpName;
          await func(postData);
          TYEvent.emit('dpNameChanged', () => {});
          this.setState({ name: newName });
          return;
        }
        TYMobile.simpleTipDialog(Strings.getLang('emptyTip'), () => {});
      },
      () => {}
    );
  };

  render() {
    const { textStyle, icon, iconSize, iconColor } = this.props;
    const { name } = this.state;
    return (
      <TouchableOpacity {...this.wrapperConfig}>
        <TYText
          style={[styles.text, icon && { marginRight: cx(5) }, textStyle]}
          numberOfLines={2}
          type="paragraph"
          size="large"
          ellipsizeMode="tail"
        >
          {name}
        </TYText>
        {icon && <IconFont d={icon} size={iconSize} color={iconColor} />}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: cx(20),
    padding: cx(4),
  },

  text: {
    color: '#333',
    fontSize: cx(12),
  },
});
