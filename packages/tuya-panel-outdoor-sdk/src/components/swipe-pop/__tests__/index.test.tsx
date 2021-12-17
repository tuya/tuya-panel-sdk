import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import { TYText, TopBar } from 'tuya-panel-kit';
import SwipePop from '../index';

function Header() {
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <TYText>
        Spring’s flexible libraries are trusted by developers all over the world. Spring delivers
        delightful experiences to millions of end-users every day—whether that’s streaming TV,
        online shopping, or countless other innovative solutions. Spring also has contributions from
        all the big names in tech, including Alibaba, Amazon, Google, Microsoft, and more.
      </TYText>
    </View>
  );
}

function Bottom() {
  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,.2)',
        padding: 20,
        height: '100%',
      }}
    >
      <TYText>
        Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications
        that you can "just run". We take an opinionated view of the Spring platform and third-party
        libraries so you can get started with minimum fuss. Most Spring Boot applications need
        minimal Spring configuration. If you’re looking for information about a specific version, or
        instructions about how to upgrade from an earlier release, check out the project release
        notes section on our wiki
      </TYText>
    </View>
  );
}

function Top() {
  return (
    <TopBar
      style={{ backgroundColor: 'rgba(0,0,0,0)' }}
      onBack={() => {}}
      actions={[
        {
          name: 'moreH',
          onPress: () => {},
          spacing: 12,
        },
      ]}
      title="swipe demo"
    />
  );
}

describe('SwipePop components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <SwipePop arrowColor="#111" header={<Header />} topBar={<Top />} bottom={<Bottom />} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
