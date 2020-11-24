import { Utils, Button, TopBar } from '@tuya-rn/tuya-native-components';
import styled from 'styled-components/native';

// const {
//   ThemeUtils: { getTheme },
// } = Utils;

const getTheme = (Utils.ThemeUtils && Utils.ThemeUtils.getTheme) || (() => {});

const defaultDeleteButton = {
  fontColor: '#FF1000',
  fontSize: 16,
  bgColor: 'rgba(0,0,0,0)',
};

const defaultSelectAllButton = {
  fontSize: 16,
};

export const StyledDeleteButton = styled(Button).attrs({
  theme: (props: any) => {
    const {
      theme: { deleteBtn },
    } = props;
    return (
      deleteBtn ||
      getTheme(
        { theme: deleteBtn },
        'robotElement.recordSectionList.deleteBtn',
        defaultDeleteButton
      )
    );
  },
})``;

export const StyledSelectAllButton = styled(Button).attrs({
  theme: (props: any) => {
    const {
      theme: { selectAllBtn },
    } = props;
    return (
      selectAllBtn ||
      getTheme(
        { theme: selectAllBtn },
        'robotElement.recordSectionList.selectAllBtn',
        defaultSelectAllButton
      )
    );
  },
})``;

export const StyledTopBar = styled(TopBar).attrs({
  theme: (props: any) => {
    const {
      theme: { topbar },
    } = props;
    return topbar || getTheme({ theme: topbar }, 'robotElement.recordSectionList.topbar');
  },
})``;
