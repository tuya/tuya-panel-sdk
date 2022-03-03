import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { BrickButton } from 'tuya-panel-kit';

import { usePreviewModal } from '@tuya/tuya-panel-lock-sdk';

const pictureUrl =
  'https://images.tuyacn.com/smart_res/iot_os/smart-lock/video/wifi_video_cover_demo_20220105.jpg';
const videoUrl =
  'https://images.tuyacn.com/smart_res/iot_os/smart-lock/video/wifi_video_demo_20220105.mjpeg';

const pictureKey = 'vayu9dpnvjnduhm3';
const videoKey = 'fhmm8cfwux8eg7jg';

const AvPreviewDemo: React.FC = () => {
  const previewer = usePreviewModal();
  const [text, setText] = useState<string>();

  const handleAesImagePress = () => {
    previewer.open({
      imagePath: pictureUrl,
      imageKey: pictureKey,
      rotate: Number(text) || 0,
    });
  };

  const handleAesVideoPress = () => {
    previewer.open({
      videoKey,
      videoSource: videoUrl,
      rotate: Number(text) || 0,
      imagePath: pictureUrl,
      imageKey: pictureKey,
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
      <TextInput
        style={{ height: 50, width: 200, borderColor: '#ddd', borderWidth: 1 }}
        placeholder="please input rotate"
        onChangeText={t => {
          setText(t);
        }}
      />
      {/* <AesVideo
        imageKey={pictureKey}
        imagePath={pictureUrl}
        videoKey={videoKey}
        videoSource={videoUrl}
      /> */}
      <BrickButton text="AesImage" onPress={handleAesImagePress} />
      <BrickButton text="AesVideo" onPress={handleAesVideoPress} />
    </View>
  );
};

export default AvPreviewDemo;
