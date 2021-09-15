import React, { FC, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Dialog } from 'tuya-panel-kit';
import { AddProgress } from '@tuya/tuya-panel-gateway-sdk';
import Strings from './i18n';

let interval: number;
const AddProgressScene: FC = () => {
  const defaultTitle = Strings.getLang('title');
  const defaultTitleStyle = {};

  const defaultForeColor = '#27b6ff';
  const defaultProgressBarStyle = {};
  const defaultProgressText = '';

  const defaultPrompt = Strings.getLang('prompt');
  const defaultPromptStyle = {};

  const defaultIsCustomProgressChange = false;
  const defaultCustomTotal = 10;
  const defaultCustomProgress = 0;

  const [title, setTitle] = useState(defaultTitle);
  const [titleStyle, setTitleStyle] = useState(defaultTitleStyle);

  const [foreColor, setForeColor] = useState<any>(defaultForeColor);
  const [progressStyle, setProgressStyle] = useState(defaultProgressBarStyle);
  const [progressText, setProgressText] = useState(defaultProgressText);

  const [prompt, setPrompt] = useState(defaultPrompt);
  const [promptStyle, setPromptStyle] = useState(defaultPromptStyle);

  const [isCustomProgressChange, setIsCustomProgressChange] = useState(
    defaultIsCustomProgressChange
  );
  const [customTotal, setCustomTotal] = useState(defaultCustomTotal);
  const [customProgress, setCustomProgress] = useState(defaultCustomProgress);

  // 修改标题及样式
  const changeTitleAndStyle = () => {
    setTitle(Strings.getLang('titleChanged'));
    setTitleStyle({ color: 'pink' });
  };
  // 修改描述及样式
  const changePromptAndStyle = () => {
    setPrompt(Strings.getLang('promptChanged'));
    setPromptStyle({ color: 'lightblue' });
  };
  // 修改进度样式
  const changeProgressView = () => {
    setForeColor({
      '0%': 'pink',
      '100%': 'lightblue',
    });
  };
  const changeIsCustomProgressChange = () => {
    const progressMax = 10;
    setIsCustomProgressChange(true);
    setCustomTotal(progressMax);
    setCustomProgress(0);
    let i = 0;
    interval = setInterval(() => {
      i++;
      setCustomProgress(i);
      if (i === progressMax) {
        clearInterval(interval);
      }
    }, 1000);
  };
  // 回到初始状态
  const backInitialState = () => {
    clearInterval(interval);

    setTitle(defaultTitle);
    setTitleStyle(defaultTitleStyle);

    setPrompt(defaultPrompt);
    setPromptStyle(defaultPromptStyle);

    setForeColor(defaultForeColor);
    setProgressStyle(defaultProgressBarStyle);
    setProgressText(defaultProgressText);

    setCustomProgress(defaultCustomProgress);
    setCustomTotal(defaultCustomTotal);
    setTimeout(() => {
      setIsCustomProgressChange(defaultIsCustomProgressChange);
    }, 100);
  };

  const onFinish = () => {
    Dialog.alert({
      title: 'Tips',
      subTitle: 'Add devices finished',
      confirmText: 'confirm',
      onConfirm: (_data, { close }) => {
        close();
      },
    });
  };

  const exampleConfigList = [
    {
      text: Strings.getLang('changeTitleAndStyle'),
      onPress: changeTitleAndStyle,
    },
    {
      text: Strings.getLang('changePromptAndStyle'),
      onPress: changePromptAndStyle,
    },
    {
      text: Strings.getLang('changeIsCustomProgressChange'),
      onPress: changeIsCustomProgressChange,
    },
    {
      text: Strings.getLang('changeProgressView'),
      onPress: changeProgressView,
    },
    {
      text: Strings.getLang('backInitialState'),
      onPress: backInitialState,
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <AddProgress
        title={title}
        titleStyle={titleStyle}
        prompt={prompt}
        promptStyle={promptStyle}
        foreColor={foreColor}
        progressStyle={progressStyle}
        progressText={progressText}
        devIds={['6c8c071759fa1cf3e585eu']}
        isCustomProgressChange={isCustomProgressChange}
        customTotal={customTotal}
        customProgress={customProgress}
        onFinish={onFinish}
      />
      <ScrollView>
        <View style={styles.btnContainer}>
          {exampleConfigList.map(({ text, onPress }) => (
            <Button
              key={text}
              style={styles.btn}
              textStyle={styles.btnText}
              text={text}
              onPress={onPress}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#E5E5E5',
    borderRadius: 20,
    margin: 10,
    padding: 15,
  },
  btnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 14,
  },
});

export default AddProgressScene;
