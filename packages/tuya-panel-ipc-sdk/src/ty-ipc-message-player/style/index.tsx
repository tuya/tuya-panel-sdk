import { StyleSheet } from 'react-native';
import publicConfig from '../../publicConfig';

const { cx } = publicConfig;

const Styles = StyleSheet.create({
  img: {
    borderRadius: 8,
    height: '100%',
    position: 'absolute',
    resizeMode: 'contain',
    right: 0,
    top: 0,
    width: '100%',
  },
  imgBox: {
    backgroundColor: 'black',
    borderRadius: 8,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  imgIcon: {
    bottom: cx(12),
    height: cx(40),
    position: 'absolute',
    resizeMode: 'contain',
    right: cx(12),
    tintColor: '#fff',
    width: cx(40),
  },
  item: {
    height: '60%',
    justifyContent: 'center',
    marginLeft: '5%',
    marginTop: 20,
    width: '90%',
  },
  shareTouch: {
    bottom: 0,
    height: cx(50),
    position: 'absolute',
    right: 0,
    width: cx(50),
  },
  timImg: {
    left: cx(14),
    position: 'absolute',
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  timeBox: {
    height: cx(24),
    left: 0,
    marginTop: cx(14),
    position: 'absolute',
  },
  timeText: {
    color: '#fff',
    left: cx(40),
    position: 'absolute',
    top: cx(2),
  },
});

export default Styles;
