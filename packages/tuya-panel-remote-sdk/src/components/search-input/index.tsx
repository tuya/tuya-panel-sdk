import React, { useRef, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { TYText, Utils } from 'tuya-panel-kit';
import { debounce } from 'lodash';
import { MainProps } from './interface';
import { hexToRgb } from '../../utils';
import Res from '../../res';
import Strings from './i18n';

const { convertX: cx, convertY: cy } = Utils.RatioUtils;

const SearchInput: React.FC<MainProps> = props => {
  const textInput = useRef().current;
  const {
    onChange,
    allowClear = false,
    placeholder,
    inputStyle,
    style: mainStyle,
    onCancel,
    showSearchIcon,
    defaultValue = '',
    resetTextStyle,
    resetValue,
    placeholderTextColor,
    searchImageStyle,
    searchIcon,
    resetTouchableStyle,
    ...otherParmas
  } = props;
  const fontColor = '#000';
  const resetValues = resetValue && resetValue.substring(0, 11);
  const [searchValue, setSearchValue] = useState<string>(defaultValue);
  const onSearch = (text: string) => {
    setSearchValue(text);
    onChange(text.trim());
  };
  const onCancels = () => {
    onChange('');
    setSearchValue('');
    onCancel && onCancel();
  };
  return (
    <View style={[styles.main, mainStyle]}>
      <TextInput
        ref={textInput}
        defaultValue={searchValue}
        style={[styles.input, showSearchIcon ? styles.inputWithSearch : {}, inputStyle]}
        onChangeText={debounce(v => onSearch(v), 300)}
        placeholder={placeholder || Strings.getLang('TYRemote_pholder')}
        placeholderTextColor={placeholderTextColor || hexToRgb(fontColor, 0.7)}
        inlineImageLeft="search"
        underlineColorAndroid="transparent"
        {...otherParmas}
      />
      {showSearchIcon && (
        <Image
          style={[
            styles.searchImage,
            searchImageStyle,
            {
              tintColor: hexToRgb(fontColor, 0.3),
            },
          ]}
          source={searchIcon || Res.searchIcon}
        />
      )}
      {allowClear && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[{ marginLeft: cx(10) }, resetTouchableStyle]}
          onPress={onCancels}
        >
          <TYText style={[resetTextStyle, { color: fontColor, fontSize: cx(14) }]}>
            {resetValues || Strings.getLang('TYRemote_reset')}
          </TYText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F8F8F8',
    borderColor: 'gray',
    borderRadius: cx(17),
    flex: 1,
    height: cx(34),
    padding: 0,
    paddingLeft: cx(15),
  },
  inputWithSearch: {
    paddingLeft: cx(36),
  },
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    height: cy(50),
    justifyContent: 'space-between',
    paddingHorizontal: cx(10),
    position: 'relative',
    width: '100%',
  },
  searchImage: {
    height: cx(16),
    left: cx(25),
    position: 'absolute',
    width: cx(16),
  },
});

export default SearchInput;
