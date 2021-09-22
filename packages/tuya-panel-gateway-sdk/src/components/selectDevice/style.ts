import { StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx, convertY: cy } = Utils.RatioUtils;

const styles = StyleSheet.create({
  alarmItemText: {
    backgroundColor: 'transparent',
    color: '#333333',
    fontSize: cx(17),
    marginTop: cy(8),
  },
  checkBox: {
    alignItems: 'center',
    borderRadius: cx(11),
    height: cx(22),
    justifyContent: 'center',
    width: cx(22),
  },
  devInfoContainer: {
    marginLeft: cx(10),
  },
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: cx(80),
  },
  itemIcon: {
    height: cx(48),
    resizeMode: 'contain',
    width: cx(48),
  },
  itemMain: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: cx(10),
    width: '100%',
  },
  itemText: {
    color: '#303030',
    fontSize: cx(15),
  },

  list: {
    flex: 1,
    padding: cx(6),
  },

  main: {
    backgroundColor: '#FFF',
    flex: 1,
  },

  offlineText: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: cx(12),
  },

  offlineWrap: {
    alignItems: 'center',
    backgroundColor: '#51525c',
    borderRadius: cx(4),
    justifyContent: 'center',
    marginTop: cy(8),
    paddingHorizontal: cx(2),
    paddingVertical: cx(1),
  },

  selectText: {
    color: 'rgb(57,106,246)',
    fontSize: cx(14),
  },

  statusContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  tip: {
    color: '#888',
    fontSize: cx(14),
  },

  top: {
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    height: cy(40),
    justifyContent: 'space-between',
    paddingHorizontal: cx(15),
  },
});

export default styles;
