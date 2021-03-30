import _pickBy from 'lodash/pickBy';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import Socket from '../socket-view';
import NameEditor from '../name-editor';
import CountdownView from '../countdown-view';

const { convertX: cx } = Utils.RatioUtils;

export default class SocketListItem extends React.PureComponent<Omit<any, 'dpCode'>> {
  get socketProps() {
    const propKey = [
      'socketBackgroundImage',
      'socketBackgroundImageSize',
      'socketImage',
      'socketImageSize',
      'socketImageTintColor',
      'onPress',
    ];
    return _pickBy(this.props, (__, key) => propKey.includes(key));
  }

  get nameEditorProps() {
    const propKey = [
      'eventType',
      'disabled',
      'stopPropagation',
      'textStyle',
      'icon',
      'iconSize',
      'iconColor',
      'defaultName',
    ];
    return _pickBy(this.props, (__, key) => propKey.includes(key));
  }

  get countdownProps() {
    const propKey = [
      'value',
      'counting',
      'timeStr',
      'timeUnit',
      'formatString',
      'completeText',
      'countdownTextStyle',
    ];
    return _pickBy(this.props, (__, key) => propKey.includes(key));
  }

  render() {
    const { style, wrapperStyle, socketCode, countdownCode } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Socket
          socketImageSize={{ width: cx(40), height: cx(40) }}
          socketBackgroundImageSize={{ width: cx(80), height: cx(80) }}
          {...this.socketProps}
        />
        <View style={styles.rightContainerStyle}>
          {socketCode && (
            <NameEditor
              dpCode={socketCode}
              wrapperStyle={[countdownCode && { marginBottom: cx(8) }, wrapperStyle]}
              {...this.nameEditorProps}
            />
          )}
          {countdownCode && <CountdownView counting {...this.countdownProps} />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: cx(16),
    flexDirection: 'row',
    minHeight: cx(118),
    paddingHorizontal: cx(16),
    paddingVertical: cx(20),
  },

  rightContainerStyle: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: cx(24),
  },
});
