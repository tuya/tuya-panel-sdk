import { StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';
const { convertX: cx } = Utils.RatioUtils;

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: '#FF4800',
    borderRadius: Math.floor(cx(24)),
    height: cx(47),
    overflow: 'hidden',
    width: cx(220),
  },
  addBtnBox: {
    alignItems: 'center',
    height: cx(87),
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: Math.floor(cx(33 / 2)),
    height: cx(33),
    overflow: 'hidden',
    width: cx(33),
  },
  closeBtnWrapper: {
    position: 'absolute',
    right: cx(24),
    top: -cx(44),
  },
  container: {
    backgroundColor: '#FFF',
    borderRadius: Math.floor(cx(16)),
    // height: 'auto',
    paddingTop: cx(36),
  },
  desc: {
    color: '#495054',
    fontSize: 15,
    lineHeight: 21,
    paddingHorizontal: cx(26),
  },

  item: {
    justifyContent: 'center',
    paddingVertical: cx(10),
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: cx(12),
  },
  itemDesc: {
    color: '#81828B',
    fontSize: 12,
    lineHeight: cx(17),
  },
  itemImg: {
    height: cx(40),
    width: cx(40),
  },
  itemTitle: {
    color: '#22242C',
    fontSize: 14,
    fontWeight: 'bold',
  },
  list: {
    flexGrow: 0,
    marginTop: cx(26),
    paddingHorizontal: cx(32),
  },
  modalContainer: {
    alignItems: 'center',
    // backgroundColor: 'pink',
    justifyContent: 'center',
    // position: 'relative',
    // left: 0,
    // right: 0,
    // width: '100%',
  },
  moreBtn: {
    marginTop: cx(16),
    paddingBottom: cx(10),
    width: cx(250),
  },
  moreText: {
    color: '#0091FF',
    fontSize: 14,
  },
  rowLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#22242C',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
    marginBottom: cx(10),
    paddingHorizontal: cx(26),
  },
});

export default styles;
