import React from 'react';
import { View, Image } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Drawer from '../index.tsx';

const winWidth = 375;
const winHeight = 667;
const imgUrlList = [
  'https://images.tuyacn.com/rms-static/3f5ccbb0-94bc-11ea-8e3b-e3ecba4013ec-1589334682603.png?tyName=speed1.png',
];

describe('Drawer components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <Drawer
        width={['left', 'right'].includes('left') ? winWidth / 3 : winWidth}
        height={['left', 'right'].includes('left') ? winHeight : winHeight / 3}
        placement={'left'}
        visible={false}
        onClose={() => {
          this.setState({ visible: false });
        }}
        onStateChange={state => {
          console.log(state);
        }}
        renderContent={() => (
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'red',
            }}
          >
            {imgUrlList.map(item => (
              <View
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                key={item}
              >
                <Image source={{ uri: item }} style={{ width: 100, height: 100 }} />
              </View>
            ))}
          </View>
        )}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
