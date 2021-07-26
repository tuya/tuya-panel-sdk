import React, { useState } from 'react';
import { View, StyleSheet, ImageSourcePropType, Text } from 'react-native';
import { Avatar } from '@tuya/tuya-panel-lock-sdk';
import { PickerResponseType } from '@tuya/tuya-panel-lock-sdk/src/avatar';

const AvatarDemo = () => {
  const [source, setSource] = useState<ImageSourcePropType>(require('./res/avatar.png'));
  return (
    <View style={styles.container}>
      <Text style={styles.title}>size: small | medium(default) ｜ large ｜ xlarge</Text>
      <View style={styles.group}>
        <Avatar size="small" onSuccess={(res: PickerResponseType) => setSource(res)} />
        <Avatar size="medium" onSuccess={(res: PickerResponseType) => setSource(res)} />
        <Avatar
          size="large"
          source={source}
          onSuccess={(res: PickerResponseType) => setSource(res)}
        />
        <Avatar size="xlarge" onSuccess={(res: PickerResponseType) => setSource(res)} />
      </View>

      <Text style={styles.title}>different type: circle(default) | square </Text>
      <View style={[styles.group, { height: 100 }]}>
        <Avatar type="circle" source={source} />
        <Avatar type="square" source={source} />
      </View>

      <Text style={styles.title}>
        with picker, set value of showPicker: picker(default) | camera | library | boolean
      </Text>
      <View style={[styles.group, { height: 100 }]}>
        <Avatar
          showPicker
          source={source}
          size="large"
          activeOpacity={0.8}
          onSuccess={(res: PickerResponseType) => setSource(res)}
        />
        <Avatar
          showPicker="camera"
          source={source}
          size="large"
          onSuccess={(res: PickerResponseType) => setSource(res)}
        />
        <Avatar
          showPicker="library"
          source={source}
          size="large"
          onSuccess={(res: PickerResponseType) => setSource(res)}
        />
      </View>
      <Text style={styles.title}>use accessarySource or children to change accessaryIcon</Text>
      <View style={[styles.group, { height: 100 }]}>
        <Avatar
          accessarySource={require('./res/avatar.png')}
          showPicker
          size="large"
          source={source}
          onSuccess={(res: PickerResponseType) => setSource(res)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  group: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 200,
    justifyContent: 'space-around',
    width: '100%',
  },
  title: {
    color: 'black',
    fontSize: 16,
  },
});

export default AvatarDemo;
