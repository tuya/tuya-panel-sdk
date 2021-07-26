import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { shallow } from 'enzyme';
import Avatar from '../index';

describe('Avatar component', () => {
  const image = require('../res/user.png');

  it('should render without issues', () => {
    const avatar = shallow(<Avatar source={image} />);

    expect(avatar.length).toBe(1);
    expect(avatar).toMatchSnapshot();
  });

  it('should render without source', () => {
    const avatar = shallow(<Avatar />);

    expect(avatar.length).toBe(1);
    expect(avatar).toMatchSnapshot();
  });

  it('should render with children', () => {
    const avatar = shallow(
      <Avatar>
        <Image testID="testImage" source={image} />
      </Avatar>
    );

    expect(avatar.find({ testID: 'testImage' }).exists()).toBeTruthy();
    expect(avatar.length).toBe(1);
    expect(avatar).toMatchSnapshot();
  });

  it('should render circle type', () => {
    const avatar = shallow(<Avatar type="circle" source={image} />);

    expect(avatar.length).toBe(1);
    expect(avatar).toMatchSnapshot();
  });

  it('should render square type', () => {
    const avatar = shallow(<Avatar type="square" source={image} />);

    expect(avatar.length).toBe(1);
    expect(avatar).toMatchSnapshot();
  });

  it('render with avatarStyle', () => {
    const avatar = shallow(<Avatar avatarStyle={{ width: 50 }} source={image} />);

    expect(avatar.props().style.width).toBe(50);
    expect(avatar.length).toBe(1);
    expect(avatar).toMatchSnapshot();
  });

  it('render with accessaryStyle', () => {
    const avatar = shallow(<Avatar accessaryStyle={{ width: 50 }} showPicker source={image} />);
    const accessary = avatar.find({ testID: 'TYLock_Avatar_AccessaryIcon' });

    expect(accessary.props().style.width).toBe(50);
    expect(avatar.length).toBe(1);
    expect(avatar).toMatchSnapshot();
  });

  it('render with accessarySource', () => {
    const avatar = shallow(<Avatar accessarySource={image} source={image} />);

    expect(avatar.length).toBe(1);
    expect(avatar).toMatchSnapshot();
  });

  it('render with pickerProps', () => {
    const avatar = shallow(<Avatar pickerProps={{ title: '选啊' }} source={image} />);

    expect(avatar.length).toBe(1);
    expect(avatar).toMatchSnapshot();
  });

  it('render small size', () => {
    const lgAvatar = shallow(<Avatar source={image} size="small" />);

    expect(lgAvatar.length).toBe(1);
    expect(lgAvatar).toMatchSnapshot();
  });

  it('render medium size', () => {
    const lgAvatar = shallow(<Avatar source={image} size="medium" />);

    expect(lgAvatar.length).toBe(1);
    expect(lgAvatar).toMatchSnapshot();
  });

  it('render large size', () => {
    const lgAvatar = shallow(<Avatar source={image} size="large" />);

    expect(lgAvatar.length).toBe(1);
    expect(lgAvatar).toMatchSnapshot();
  });

  it('render xlarge size', () => {
    const lgAvatar = shallow(<Avatar source={image} size="xlarge" />);

    expect(lgAvatar.length).toBe(1);
    expect(lgAvatar).toMatchSnapshot();
  });

  it('render number of size', () => {
    const numberSize = shallow(<Avatar source={image} size={100} />);

    expect(numberSize.length).toBe(1);
    expect(numberSize).toMatchSnapshot();
  });

  it('render touchable if it has onPress', () => {
    const onPress = jest.fn();
    const avatar = shallow(<Avatar source={image} onPress={onPress} />);
    avatar.simulate('press');
    expect(onPress).toHaveBeenCalled();
    expect(avatar.find(TouchableOpacity)).toBeTruthy();
    expect(avatar.length).toBe(1);
    expect(avatar).toMatchSnapshot();
  });

  it('render touchable if it has showPicker', () => {
    const avatar = shallow(<Avatar source={image} showPicker />);
    const accessary = avatar.find({ testID: 'TYLock_Avatar_AccessaryIcon' });

    avatar.simulate('press');
    expect(accessary.length).toBe(1);
    expect(avatar.find(TouchableOpacity)).toBeTruthy();
    expect(avatar.length).toBe(1);
    expect(avatar).toMatchSnapshot();
  });

  it('render with camera showPicker', () => {
    const avatar = shallow(<Avatar source={image} showPicker="camera" />);
    const accessary = avatar.find({ testID: 'TYLock_Avatar_AccessaryIcon' });

    avatar.simulate('press');
    expect(accessary.length).toBe(1);
    expect(avatar.find(TouchableOpacity)).toBeTruthy();
    expect(avatar.length).toBe(1);
    expect(avatar).toMatchSnapshot();
  });

  it('render with library showPicker', () => {
    const avatar = shallow(<Avatar source={image} showPicker="library" />);
    const accessary = avatar.find({ testID: 'TYLock_Avatar_AccessaryIcon' });

    avatar.simulate('press');
    expect(accessary.length).toBe(1);
    expect(avatar.find(TouchableOpacity)).toBeTruthy();
    expect(avatar.length).toBe(1);
    expect(avatar).toMatchSnapshot();
  });

  it('render with Component', () => {
    const Warpper = () => <TouchableOpacity />;
    const avatar = shallow(<Avatar Component={Warpper} />);

    expect(avatar.length).toBe(1);
    expect(avatar).toMatchSnapshot();
  });
});
