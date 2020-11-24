import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Divider, Utils, TYText } from '@tuya-rn/tuya-native-components';
import _isEmpty from 'lodash/isEmpty';

const { convertX: cx, width } = Utils.RatioUtils;

interface IItemProp {
  title: string;
  subTitle: string;
}

export default class Item extends PureComponent<IItemProp> {
  static defaultProps = {
    title: '',
    subTitle: '',
  };

  render() {
    const { title, subTitle, children } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <TYText style={styles.titleText} text={title} />
          <TYText style={styles.subTitleText} text={subTitle} />
        </View>
        <Divider />
        <View style={styles.main}>{children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 20,
    marginHorizontal: cx(15),
    marginTop: cx(15),
    padding: cx(15),
  },
  main: {
    flex: 1,
  },

  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: cx(10),
  },
  titleText: {
    fontSize: cx(15),
    fontWeight: 'bold',
  },
  subTitleText: {
    fontSize: cx(15),
    color: 'rgba(0,0,0,0.6)',
  },
});
