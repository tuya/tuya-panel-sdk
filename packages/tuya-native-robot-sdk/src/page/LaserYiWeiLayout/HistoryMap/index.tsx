import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Utils } from '@tuya-rn/tuya-native-components';

const { convertY: cy } = Utils.RatioUtils;

export interface LaserMapHistoryProps {
  cleanArea: number;
  cleanTime: number;
  cleanTimeTitle: string;
  cleanAreaTitle: string;
  cleanTimeUnit: string;
  cleanAreaUnit: string;
  pointsColor: string[];
  pathColor: string;
  mapConfig: object;
  bucket: string;
  history: { file: string; mapLen: number; pathLen: number };
}

export function withMapHistory(MapComponent: any, options?: { fontColor: string }) {
  return class LaserMapHistory extends Component<LaserMapHistoryProps> {
    static defaultProps = {
      cleanArea: 0,
      cleanTime: 0,
      cleanTimeTitle: '',
      cleanAreaTitle: '',
      cleanTimeUnit: '',
      cleanAreaUnit: '',
      bucket: '',
      history: {},
      mapConfig: {},
    };

    getTopData = () => {
      const {
        cleanArea,
        cleanTime,
        cleanTimeTitle,
        cleanTimeUnit,
        cleanAreaTitle,
        cleanAreaUnit,
      } = this.props;

      return [
        {
          title: cleanArea,
          unit: cleanAreaUnit,
          subtitle: cleanAreaTitle,
        },
        {
          title: cleanTime,
          unit: cleanTimeUnit,
          subtitle: cleanTimeTitle,
        },
      ];
    };

    getFontColorStyle = () => {
      if (options && options.fontColor) {
        return {
          color: options.fontColor,
        };
      }
    };

    renderTopItem = (d, k) => {
      return (
        <View key={k} style={styles.topItem}>
          <View style={styles.itemTitle}>
            <Text style={[styles.title, this.getFontColorStyle()]}>{d.title}</Text>
            <Text style={[styles.unit, this.getFontColorStyle()]}>{d.unit}</Text>
          </View>
          <Text style={[styles.subtitle, this.getFontColorStyle()]}>{d.subtitle}</Text>
        </View>
      );
    };

    render() {
      return (
        <View style={styles.container}>
          <MapComponent
            pointsColor={this.props.pointsColor}
            pathColor={this.props.pathColor}
            bucket={this.props.bucket}
            history={this.props.history}
            isEdit={false}
            mapConfig={this.props.mapConfig}
          />
          <View style={styles.topContainer}>
            {this.getTopData().map((d, k) => {
              return this.renderTopItem(d, k);
            })}
          </View>
        </View>
      );
    }
  };
}

export default class LaserMapHistoryYiWei extends Component {
  // static V1 = withMapHistory(LaserMapYiWei.V1);
  // static V2 = withMapHistory(LaserMapYiWei.V2);
  render() {
    return null;
    // const { MapComponent } = this.props;
    // return <LaserMapHistoryYiWei.V1 {...this.props}></LaserMapHistoryYiWei.V1>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topContainer: {
    height: cy(120),
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },

  topItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemTitle: {
    flexDirection: 'row',
  },

  title: {
    fontSize: cy(46),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  unit: {
    fontSize: cy(10),
    marginTop: cy(9),
    color: '#FFFFFF',
  },

  subtitle: {
    fontSize: cy(12),
    marginTop: cy(-6),
    color: '#FFFFFF',
  },
});
