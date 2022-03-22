import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TYListItemSeries } from '@tuya/tuya-panel-lock-sdk';
import { Popup } from 'tuya-panel-kit';

export default class HijackManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false,
      pickerValue: '1',
    };
  }

  componentDidMount() {}
  switchValueChange = value => {
    this.setState({
      switchValue: !value,
    });
  };

  render() {
    const { switchValue, pickerValue } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
        <View style={styles.item}>
          <View style={styles.title}>
            <Text>default</Text>
          </View>
          <TYListItemSeries
            title="测试"
            subTitle="测试门锁联动组件"
            childTitle="子组件"
            childSubTitle="子组件测试联动"
            switchValue={!switchValue}
            switchValueChange={this.switchValueChange}
            themeColor="#57BCFB"
            childValueChange={() => {
              return Popup.picker({
                dataSource: [
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                ],
                title: 'Picker',
                cancelText: '取消',
                confirmText: '确认',
                value: pickerValue,
                onMaskPress: ({ close }) => close(),
                onConfirm: (value, idx, { close }) => {
                  this.setState({ pickerValue: value });
                  close();
                },
              });
            }}
            Action={pickerValue}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    fontSize: 16,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20,
    width: '100%',
  },
  title: {
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    height: 50,
    justifyContent: 'center',
    width: '100%',
  },
});
