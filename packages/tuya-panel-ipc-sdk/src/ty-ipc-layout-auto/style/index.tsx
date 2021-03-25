import { StyleSheet } from 'react-native';
import publicConfig from '../../publicConfig';

const { cx } = publicConfig;

const Styles = StyleSheet.create({
  layoutAutoNormalPage: {
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    flex: 1,
    justifyContent: 'center',
  },
  layoutAutoScrollPage: {
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    paddingHorizontal: cx(12),
    paddingVertical: cx(15),
  },
  mainContentStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Styles;
