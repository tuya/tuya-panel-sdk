import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Utils, Dialog, Popup } from 'tuya-panel-kit';
import { LinkSelect } from '@tuya/tuya-panel-lock-sdk';

const { convertX } = Utils.RatioUtils;
const { width } = Dimensions.get('window');
export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      switch: false,
      show: true,
      clickTitle5_2: '1',
      switchOne: true,
      switchInfo5_1_1_1: false,
    };
  }

  componentDidMount() {
    // this.getData(this.props);
  }

  getData = () => {
    return [
      {
        keyValue: '2',
        type: 'click',
        title: 'clickTitle这个是个超级哦啊就哦啊煎熬煎熬煎熬煎熬的长的为宝宝宝宝宝宝',
        titleStyle: {
          maxWidth: 260,
        },
        tip: 'clickTip',
        choiceValue: '',
        onClick: () => {
          Dialog.alert({
            title: 'onClick',
            subTitle: 'onClick',
            confirmText: 'confirm',
            subTitleStyle: { textAlign: 'left' },
          });
        },
      },
      {
        keyValue: '3',
        type: 'switchInfo',
        title: 'switchInfoTitle',
        tip: 'switchInfoTip',
        switchValue: true,
        info: () => {
          Dialog.alert({
            title: 'ModeInfo',
            subTitle: 'InfoTip',
            confirmText: 'confirm',
            subTitleStyle: { textAlign: 'left' },
          });
        },
        onSwitch: () => {},
      },
      {
        keyValue: '4',
        type: 'switch',
        title: 'switch',
        switchValue: this.state.switchOne,
        onSwitch: value => {
          console.log(value);
          this.setState({
            switchOne: value,
          });
        },
      },
      {
        keyValue: '5',
        type: 'switch',
        title: '我是祖先',
        tip: '当我为true时我的后代显示',
        switchValue: this.state.switch,
        onSwitch: value => {
          console.log(value);
          this.setState({
            switch: value,
          });
        },
        customLinkList: [
          {
            keyValue: '5_1',
            type: 'switch',
            title: '我是大儿子5_1',
            tip: '当我为true时我的孩子出现',
            switchValue: this.state.show,
            onSwitch: value => {
              console.log(value);
              this.setState({
                show: value,
              });
            },
            relation: ['switchValue', '===', 'true'],
            customLinkList: [
              {
                keyValue: '5_1_1',
                type: 'switch',
                title: '我是5_1的儿子5_1_1',
                tip: '我为true的时候我孩子出现',
                switchValue: !!this.state.switch2,
                onSwitch: value => {
                  this.setState({
                    switch2: value,
                  });
                },
                relation: ['switchValue', '===', 'true'],
                customLinkList: [
                  {
                    keyValue: '5_1_1_1',
                    type: 'switchInfo',
                    title: '我是5_1_1_1我没孩子',
                    tip: '我没孩子',
                    switchValue: !!this.state.switchInfo5_1_1_1,
                    onSwitch: value => {
                      this.setState({
                        switchInfo5_1_1_1: value,
                      });
                    },
                    info: () => {
                      Dialog.alert({
                        title: 'ModeInfo',
                        subTitle: 'InfoTip',
                        confirmText: 'confirm',
                        subTitleStyle: { textAlign: 'left' },
                      });
                    },
                    relation: ['switchValue', '===', 'true'],
                  },
                ],
              },
            ],
          },
          {
            keyValue: '5_2',
            type: 'click',
            title: '我是二儿子5_2',
            tip: '当我的值为2时我的孩子出现',
            choiceValue: this.state.clickTitle5_2,
            choiceValueKey: this.state.clickTitle5_2,
            onClick: () => {
              Popup.picker({
                dataSource: [
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                  {
                    label: '3',
                    value: '3',
                  },
                  {
                    label: '3',
                    value: '3',
                  },
                ],
                title: 'clickTitle5_2',
                cancelText: 'cancel',
                confirmText: 'confirm',
                value: this.state.clickTitle5_2,
                onConfirm: value => {
                  this.setState({
                    clickTitle5_2: value,
                  });

                  Popup.close();
                },
              });
            },
            relation: ['switchValue', '===', 'true'],
            customLinkList: [
              {
                keyValue: '5_2_1',
                type: 'switch',
                title: '我是5_2的儿子5_2_1',
                tip: '我还小，也没有孩子',
                switchValue: !!this.state.switch21,
                onSwitch: value => {
                  this.setState({
                    switch21: value,
                  });
                },
                relation: ['choiceValueKey', '===', '2'],
              },
            ],
          },
        ],
      },
    ];
  };

  render() {
    const data = this.getData();
    return (
      <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.listView}>
            {data.map(element => {
              return (
                <View style={styles.space} key={element.keyValue}>
                  <LinkSelect {...element} />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listView: {
    alignItems: 'center',
    width,
  },
  space: {
    marginTop: convertX(10),
  },
});
