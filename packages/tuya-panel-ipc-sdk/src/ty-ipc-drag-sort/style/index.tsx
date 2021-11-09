import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
  },
  itemBorder: {
    flexDirection: 'row',
  },
  move: {
    height: '100%',
    position: 'absolute',
    zIndex: 2,
  },
  order: {
    opacity: 0.6,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  orderButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  orderIcon: {
    height: 28,
    width: 28,
  },
});
