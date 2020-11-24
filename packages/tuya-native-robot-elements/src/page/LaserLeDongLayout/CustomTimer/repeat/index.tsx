import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Utils, TYFlatList, IconFont } from '@tuya-rn/tuya-native-components';
import { timer } from '../theme';
import { TopBar } from '../components';
// @ts-ignore
import Strings from '../i18n';
import { StyledContainer, StyledCell, StyledTitle } from './style';
import { ITheme, IRepeatSceneProps } from './interface';

const { convertX: cx } = Utils.RatioUtils;
// const { ThemeProvider, ThemeConsumer } = Utils.ThemeUtils;

const checkIconPath =
  'M288.67 374.37l18.69 25.26a5.217 5.217 0 0 0 7.29 1.09c0.02-0.01 0.04-0.03 0.06-0.04l113.01-86.01a5.216 5.216 0 0 1 6.48 0.13l275.9 228.25a5.22 5.22 0 0 0 6.97-0.29l17.32-16.98a5.212 5.212 0 0 0 0.07-7.37l-0.08-0.08-299.65-292.84a5.221 5.221 0 0 0-7.37 0.08l-0.01 0.01-138.22 142.06a5.206 5.206 0 0 0-0.46 6.73z';

class RepeatScene extends React.Component<IRepeatSceneProps, any> {
  constructor(props: IRepeatSceneProps) {
    super(props);
    this.state = {
      selected: props.repeat,
    };
  }

  get theme() {
    const theme = this.props.theme ? { timer: this.props.theme } : {};
    return theme;
  }

  get weekData() {
    return Array(7)
      .fill(1)
      .map((_, index) => ({
        value: index,
        title: Strings.getLang(`day${index}`),
      }));
  }

  onRepeatChange = (index: number) => {
    const selected = this.state.selected.split('');
    selected[index] = selected[index] === '1' ? '0' : '1';
    const newSelected = selected.join('');
    this.setState({ selected: newSelected });
    this.props.onRepeatChange && this.props.onRepeatChange(newSelected);
  };

  renderHeader = () => {
    const { title, navigator } = this.props;
    return <TopBar title={title} onBack={navigator.pop} />;
  };

  render() {
    return (
      <StyledContainer>
        {this.renderHeader()}

        <TYFlatList
          contentContainerStyle={{
            marginTop: cx(16),
            backgroundColor: timer.boardBg,
          }}
          data={this.weekData}
          keyExtractor={(item: any) => item.value}
          separatorStyle={{
            marginLeft: cx(16),
            backgroundColor: timer.cellLine,
          }}
          extraData={this.state.selected}
          renderItem={({ item, index }: { item: any; index: number }) => {
            const inUnSelect = this.state.selected[index] === '0';
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                accessibilityLabel={`Timer_Repeat_Row${index}`}
                onPress={() => this.onRepeatChange(index)}
              >
                <StyledCell style={{ flex: 1 }}>
                  <StyledTitle size={cx(16)}>{item.title}</StyledTitle>
                  <IconFont
                    style={[inUnSelect && { opacity: 0 }]}
                    d={checkIconPath}
                    color={timer.repeatColor}
                    size={28}
                    useART={true}
                  />
                </StyledCell>
              </TouchableOpacity>
            );
          }}
        />
      </StyledContainer>
    );
  }
}

export default RepeatScene;
