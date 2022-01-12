import React, { FC, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { SportCard } from '@tuya/tuya-panel-outdoor-sdk';
import icons from './res/icons';

const { convertX: cx } = Utils.RatioUtils;

// const dps = ['activetime_day', 'calories_day', 'distance_day'];
interface ICard {
  dp: string;
  bgColor: string;
  iconFont: string;
  unit: string;
  tip: string;
  value: string;
}
const dps: ICard[] = [
  {
    dp: 'activetime_day',
    bgColor: '#24D671',
    iconFont: icons.target,
    unit: 'h',
    tip: '',
    value: '',
  },
  {
    dp: 'calories_day',
    bgColor: '#FE9456',
    iconFont: icons.target,
    unit: 'cal',
    tip: '',
    value: '',
  },
  {
    dp: 'distance_day',
    bgColor: '#F6BA7B',
    iconFont: icons.target,
    unit: 'km',
    tip: '',
    value: '',
  },
];

const Component: FC = () => {
  const [cardDatas, setCardDatas] = useState<ICard[]>([]);

  useEffect(() => {
    const currentDps = dps.reduce((preArray: ICard[], data: ICard) => {
      const card: ICard = {
        tip: '',
        value: '',
        iconFont: data.iconFont,
        unit: data.unit,
        dp: data.dp,
        bgColor: data.bgColor,
      };
      if (data.dp === 'activetime_day') {
        card.tip = 't1';
        card.value = 'v1';
        const card2: ICard = {
          tip: 'v2',
          iconFont: data.iconFont,
          value: 'v2',
          unit: 'h',
          dp: 'resttime_day',
          bgColor: '#0060D3',
        };
        return [...preArray, card, card2];
      }
      if (data.dp === 'calories_day') {
        card.tip = 't3';
        card.value = 'v3';
        return [...preArray, card];
      }
      if (data.dp === 'distance_day') {
        card.tip = 't4';
        card.value = 'v4';
      }
      return [...preArray, card];
    }, []);
    setCardDatas(currentDps);
  }, []);

  return (
    <View style={[styles.contentTarget, { backgroundColor: '#fff' }]}>
      <SportCard dpDatas={cardDatas} />
    </View>
  );
};

const styles = StyleSheet.create({
  contentTarget: {
    height: cx(400),
  },
});

export default Component;
