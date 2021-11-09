import { StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx, width, convertY: cy } = Utils.RatioUtils;
export default StyleSheet.create({
  container: {
    width,
  },
  item: {
    alignSelf: 'flex-start',
    marginRight: cx(7),
    width: cx(1),
  },
  itemWrap: {
    flexDirection: 'row',
    width: cx(80),
  },
  pointer: {
    borderBottomColor: '#666',
    borderBottomWidth: 4,
    borderLeftColor: 'transparent',
    borderLeftWidth: 4,
    borderRightColor: 'transparent',
    borderRightWidth: 5,
    borderTopColor: 'transparent',
    borderTopWidth: 5,
    height: 0,
    width: 0,
  },
  pointerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: cx(8),
  },
  title: {
    color: '#666',
    fontSize: cx(16),
    fontWeight: 'bold',
    marginBottom: cy(10),
    textAlign: 'center',
  },
  value: {
    color: '#666',
    fontSize: cx(48),
    fontWeight: 'bold',
    marginBottom: cy(12),
    marginTop: cy(18),
  },
  valueWrap: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
