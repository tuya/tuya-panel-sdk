import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  PtzCommonPage: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  circleImage: {
    height: 50,
    width: 50,
  },
  hoverImage: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  pieBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pieCommon: {
    backgroundColor: 'transparent',
  },
  ptzDotImage: {
    height: 10,
    left: '50%',
    marginLeft: -5,
    marginTop: -5,
    position: 'absolute',
    top: '50%',
    width: 10,
  },
});

export default Styles;
