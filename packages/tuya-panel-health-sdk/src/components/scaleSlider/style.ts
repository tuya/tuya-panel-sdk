/* eslint-disable react-native/sort-styles */
import { StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx, convertY: cy } = Utils.RatioUtils;
export default StyleSheet.create({
  wrapper: {
    // height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  outer: {
    height: cy(46),
    width: cx(303),
    marginTop: cy(14),
    overflow: 'hidden',
  },

  inner: {
    height: cy(46),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  item: {
    width: 1,
  },
});
