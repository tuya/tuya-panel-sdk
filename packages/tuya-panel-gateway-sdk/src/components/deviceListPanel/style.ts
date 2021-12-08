import { StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    alignItems: 'flex-end',
    width: '100%',
  },
  iconMore: {
    marginTop: -6,
  },
  iconPullDown: {
    transform: [
      {
        rotate: '90deg',
      },
    ],
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    margin: cx(10),
  },
  itemImage: {
    height: cx(48),
    resizeMode: 'stretch',
    width: cx(48),
  },
  itemText: {
    fontSize: cx(12),
  },
  list: {
    flex: 1,
  },
  listColumnWrapper: {
    justifyContent: 'space-between',
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: cx(24),
  },
  pullDown: {
    backgroundColor: '#ffffff',
    // height: pullDownHeight,
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
  },
  pullDownButton: {
    alignItems: 'center',
    height: cx(30),
    justifyContent: 'center',
    marginLeft: cx(10),
    width: cx(30),
  },
  scrollMain: {
    // backgroundColor: '#FFF',
    backgroundColor: '#FAFAFA',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  tabBar: {
    backgroundColor: 'rgb(235,235,235)',
  },
  tabMain: {
    alignSelf: 'center',
    height: cx(56),
    justifyContent: 'space-between',
    marginBottom: cx(10),
    width: '100%',
  },
  tabMainIcon: {
    alignSelf: 'center',
    height: cx(4),
    marginTop: cx(5),
    width: cx(27),
  },
});

export default styles;
