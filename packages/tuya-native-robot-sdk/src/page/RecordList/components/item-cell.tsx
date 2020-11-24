import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Utils, UnitText, TYSdk, IconFont } from '@tuya-rn/tuya-native-components';

import Record from '@RecordDataCollection';
import i18n from '../../../i18n';

const { convertY: cy, convertX: cx } = Utils.RatioUtils;

interface IProps {
  cleanTimeTitle: string;
  cleanTimeUnit: string;
  cleanAreaTitle: string;
  cleanAreaUnit: string;
  item: Record.IRecord;
  mapRouteId: string;
  is12Hours: boolean;
  onPress: () => any;
}

export default class ItemCell extends Component<IProps> {
  static defaultProps = {
    index: 0,
    cleanTimeTitle: i18n.getLang('recordTime'),
    cleanTimeUnit: i18n.getLang('recordTimeUnit'),
    cleanAreaTitle: i18n.getLang('recordArea'),
    cleanAreaUnit: i18n.getLang('recordAreaUnit'),
    mapRouteId: 'mapHistory',
    is12Hours: true,
    onDelete: () => {},
    onPress: () => {},
  };

  handleRowClick = (item: Record.IRecord) => () => {
    const { cleanTime, cleanArea, bucket, dateTitle, dateTitle24 } = item;
    const {
      mapRouteId,
      cleanTimeTitle,
      cleanAreaTitle,
      cleanTimeUnit,
      cleanAreaUnit,
      is12Hours,
    } = this.props;
    TYSdk.Navigator.push({
      id: mapRouteId,
      title: is12Hours ? dateTitle : dateTitle24,
      cleanTime,
      cleanArea,
      cleanTimeTitle: cleanTimeTitle,
      cleanAreaTitle: cleanAreaTitle,
      cleanTimeUnit: cleanTimeUnit,
      cleanAreaUnit: cleanAreaUnit,
      bucket,
      history: { ...item },
    });
  };

  renderRowItem(value, title, unit) {
    return (
      <Text style={styles.listItemTips}>
        {title}
        <Text style={styles.listItemValue}>{`${value}${unit}`}</Text>
      </Text>
    );
  }

  render() {
    const { item, is12Hours } = this.props;
    const { cleanArea, cleanTime, time12, time12Unit, time24 } = item;

    return (
      <TouchableOpacity style={styles.listItem} onPress={this.handleRowClick(item)}>
        <View>
          <View style={styles.listItemBottom}>
            <UnitText
              valueSize={cx(24)}
              valueColor="#4D4D4D"
              value={is12Hours ? `${time12}` : `${time24}`}
            />
            {is12Hours && <Text style={styles.textHour12}>{time12Unit}</Text>}
          </View>
          <View style={styles.listItemBottom}>
            {this.renderRowItem(cleanTime, this.props.cleanTimeTitle, this.props.cleanTimeUnit)}
            {this.renderRowItem(cleanArea, this.props.cleanAreaTitle, this.props.cleanAreaUnit)}
          </View>
        </View>
        <IconFont name="arrow" />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    height: cy(88),
    paddingHorizontal: cx(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },

  listItemBottom: {
    marginTop: cy(13),
    flexDirection: 'row',
  },

  listItemTips: {
    color: '#4D4D4D',
    fontSize: cx(12),
    marginRight: cx(10),
  },

  listItemValue: {
    color: '#4D4D4D',
    fontSize: cx(12),
  },

  textHour12: {
    color: '#4D4D4D',
    fontSize: cx(20),
    fontWeight: 'bold',
  },
});
