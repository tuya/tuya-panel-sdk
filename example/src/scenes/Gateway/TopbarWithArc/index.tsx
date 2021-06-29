import React, { FC, useState } from 'react';
import { StyleSheet, View, ScrollView, StatusBarStyle } from 'react-native';
import { Button, Utils } from 'tuya-panel-kit';
import { TopBarWithArc } from '@tuya/tuya-panel-gateway-sdk';
import Strings from './i18n';

const { convertX: cx } = Utils.RatioUtils;
interface TopBarWithArcSceneProps {
  title: string;
}
const TopBarWithArcScene: FC<TopBarWithArcSceneProps> = ({
  title: defaultTitle,
}: TopBarWithArcSceneProps) => {
  const defaultBarStyle = 'light-content';
  const defaultFill = '#27b6ff';
  const defaultColor = '#FFF';
  const defaultArcHeight = cx(77);
  const [barStyle, setBarStyle] = useState<StatusBarStyle>(defaultBarStyle);
  const [title, setTitle] = useState(defaultTitle);
  const [fill, setFill] = useState(defaultFill);
  const [color, setColor] = useState(defaultColor);
  const [arcHeight, setArcHeight] = useState(defaultArcHeight);

  const changeBarStyle = () => {
    setBarStyle('dark-content');
  };
  const changeTitle = () => {
    setTitle('Coustom Title');
  };
  const changeFill = () => {
    setFill('pink');
  };
  const changeColor = () => {
    setColor('red');
  };
  const changeArcHeight = () => {
    setArcHeight(cx(120));
  };

  const backInitialState = () => {
    setBarStyle(defaultBarStyle);
    setTitle(defaultTitle);
    setFill(defaultFill);
    setColor(defaultColor);
    setArcHeight(defaultArcHeight);
  };

  const exampleConfigList = [
    {
      text: Strings.getLang('changeBarStyle'),
      onPress: changeBarStyle,
    },
    {
      text: Strings.getLang('changeTitle'),
      onPress: changeTitle,
    },
    {
      text: Strings.getLang('changeFill'),
      onPress: changeFill,
    },
    {
      text: Strings.getLang('changeColor'),
      onPress: changeColor,
    },
    {
      text: Strings.getLang('changeArcHeight'),
      onPress: changeArcHeight,
    },
    {
      text: Strings.getLang('backInitialState'),
      onPress: backInitialState,
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <TopBarWithArc
        barStyle={barStyle}
        title={title}
        fill={fill}
        color={color}
        arcHeight={arcHeight}
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
    margin: 20,
    padding: 20,
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

export default TopBarWithArcScene;
