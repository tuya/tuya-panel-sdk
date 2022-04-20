import React, { useState } from 'react';
import { View } from 'react-native';
import ColorRecognition from '@tuya/tuya-panel-lamp-sdk/src/components/container/colorRecognition/index';

const ColorRecognitionScene: React.FC = () => {
  const [activeKey, setActiveKey] = useState(0);
  const handlePress = (key: number) => {
    setActiveKey(key);
  };

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ width: '100%' }}>
        <ColorRecognition handlePress={handlePress} activeKey={activeKey} />
      </View>
    </View>
  );
};
export default ColorRecognitionScene;
