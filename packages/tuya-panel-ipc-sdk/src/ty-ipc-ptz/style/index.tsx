import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  PtzCommonPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pieCommon: {
    backgroundColor: 'transparent',
  },
  hoverImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleImage: {
    width: 50,
    height: 50,
  },
  ptzDotImage: {
    width: 10,
    height: 10,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -5,
    marginLeft: -5,
  },
});

export default Styles;
