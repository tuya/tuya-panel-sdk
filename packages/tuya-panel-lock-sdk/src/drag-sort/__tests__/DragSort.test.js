import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { shallow } from 'enzyme';
import DragSort from '../index';

describe('DragSort components', () => {
  it('DragSort render', () => {
    const [dragSortList, setDragSortList] = useState([]);
    const _renderItem = (item, isSelect) => {
      return (
        <View style={styles.item_wrap}>
          <View
            style={[
              styles.item,
              {
                width: item.width,
                height: item.height,
                backgroundColor: isSelect ? 'red' : '#f39c12',
              },
            ]}
          >
            {isSelect ? <View style={styles.item_icon_swipe} /> : null}
            <View style={styles.item_text_swipe}>
              <TouchableOpacity>
                <Text style={styles.item_text}>{item.text}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    };
    const wrapper = shallow(
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <DragSort
          dragSortList={dragSortList}
          renderItem={_renderItem}
          onDataChange={(data, callback) => {
            setDragSortList(data);
            callback();
          }}
        />
      </SafeAreaView>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    backgroundColor: '#f39c12',
    borderRadius: 4,
    justifyContent: 'space-around',
  },
  item_icon_swipe: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50 * 0.5,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  item_text: {
    color: '#444',
    fontSize: 20,
    fontWeight: 'bold',
  },
  item_text_swipe: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    width: 56,
  },
  item_wrap: {
    paddingLeft: 20,
    paddingTop: 20,
    position: 'relative',
  },
});
