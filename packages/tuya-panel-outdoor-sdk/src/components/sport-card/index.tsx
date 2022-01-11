import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Utils, IconFont } from 'tuya-panel-kit';

export interface ISportCardProps {
  /**
   *
   */
  tip: string;
  /**
   * iconfont字符串图片
   */
  image: string;
  /**
   * 值
   */
  value: string;
  /**
   * 单位
   */
  unit: string;
  /**
   * key
   */
  code: string;
  /**
   * 背景色
   */
  bgColor: string;
}

type IProps = {
  /**
   * dp点数据
   */
  dpDatas: ISportCardProps[];
  /**
   * 目标步数
   */
  targetSteps: number;
};

const { convertX: cx } = Utils.RatioUtils;

const SportCard: React.FC<IProps> = ({ dpDatas, targetSteps }) => {
  return (
    <View style={styles.contentBottom}>
      {dpDatas.map((item: ISportCardProps) => {
        return (
          <View style={styles.dpElement} key={item.code}>
            <View style={styles.dpElementTop}>
              <Text style={[styles.dpElementTopTitle, { color: targetSteps ? '#333' : '#FFF' }]}>
                {item.value}
              </Text>
              <Text style={[styles.dpElementTopUnit, { color: targetSteps ? '#333' : '#FFF' }]}>
                {item.unit}
              </Text>
            </View>
            <View style={styles.dpElementBottom}>
              <View style={[styles.iconView, { backgroundColor: item.bgColor }]}>
                <IconFont color="#FFF" size={cx(14)} d={item.image} />
              </View>
              <Text
                style={[
                  styles.dpElementBottomName,
                  { color: targetSteps ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)' },
                ]}
              >
                {item.tip}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  contentBottom: {
    flexDirection: 'row',
    height: cx(50),
  },
  dpElement: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  dpElementBottom: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: cx(5),
  },
  dpElementBottomName: {
    fontSize: cx(10),
    lineHeight: cx(14),
  },
  dpElementTop: {
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  dpElementTopTitle: {
    fontSize: cx(22),
    fontWeight: 'bold',
  },
  dpElementTopUnit: {
    fontSize: cx(14),
  },
  iconView: {
    borderRadius: cx(7),
    height: cx(14),
    marginRight: cx(6),
    width: cx(14),
  },
});

export default SportCard;
