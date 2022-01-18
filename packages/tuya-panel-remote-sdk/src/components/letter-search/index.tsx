import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import { Utils, TYText } from 'tuya-panel-kit';
import { debounce } from 'lodash';
import Strings from './i18n';
import { MainProps, SectionItem, SectionLists } from './interface';
import Res from '../../res';

const { convertX: cx, convertY: cy } = Utils.RatioUtils;

let sectionIndex = 0;
const LetterSearch: React.FC<MainProps> = props => {
  const {
    header,
    itemHeight = cx(60),
    offset = 0,
    sections,
    initialNumToRender = 100,
    animated = false,
    placeholderText,
    letterMainStyle,
    letterItemStyle,
    sectionItemOpacity = 0.7,
    searchListItemOpacity = 0.7,
    letterItemOpacity = 0.7,
    researchBtnOpacity = 0.7,
    sectionItemStyle,
    sectionItemTextStyle,
    sectionItemSubTextStyle,
    sectionHeaderStyle,
    sectionHeaderTextStyle,
    letterItemTextStyle,
    letterItemTextActiveStyle,
    letterTopStyle,
    letterTopActiveStyle,
    searchListItemStyle,
    searchListTextStyle,
    searchListSubTextStyle,
    reset,
    letterTopImage,
    onPress,
    researchStyle,
    researchInputStyle,
    researchTextStyle,
  } = props;
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchValue, setSearchValue] = useState('');
  const [searchData, setSearchData] = useState<Array<SectionItem>>([]);
  const sectionListRef = useRef<any>(null);

  const letterList = useMemo(() => {
    return sections.map((item: SectionLists) => item.title);
  }, [sections]);

  const changeLetter = (index: number) => {
    sectionIndex = index === -1 ? 0 : index;
    sectionListRef.current.scrollToLocation({
      sectionIndex,
      itemIndex: 0,
      viewPosition: 0,
      viewOffset: index === -1 ? offset : 0,
      animated,
    });
  };

  const _getItemLayout = (_data: any, index: number) => {
    return {
      length: itemHeight,
      offset: offset + itemHeight * (index - sectionIndex - 1),
      index,
    };
  };
  const _search = (value: string) => {
    const trimValue = value.trim().toLowerCase();
    const searchResult: Array<SectionItem> = [];
    if (trimValue.length > 0) {
      sections.forEach((item: SectionLists) => {
        item.data.forEach((d: SectionItem) => {
          const { name = '', subName = '' } = d;
          if (name.toLowerCase().includes(trimValue) || subName.toLowerCase().includes(trimValue)) {
            searchResult.push(d);
          }
        });
      });
    }
    setSearchData(searchResult);
    setSearchValue(trimValue);
  };
  const _renderSearchListItem = ({ item }: { item: SectionItem }) => {
    const { name, subName } = item;
    return (
      <TouchableOpacity
        onPress={() => onPress && onPress(item)}
        activeOpacity={searchListItemOpacity}
        style={[styles.sectionItem, { height: itemHeight }, searchListItemStyle]}
      >
        <TYText style={[styles.sectionItemText, searchListTextStyle]}>{name}</TYText>
        <TYText style={[styles.sectionItemSubText, searchListSubTextStyle]}>{subName}</TYText>
      </TouchableOpacity>
    );
  };
  const _renderSectionItem = ({ item }: { item: SectionItem }) => {
    const { name, subName } = item;
    return (
      <TouchableOpacity
        onPress={() => onPress && onPress(item)}
        activeOpacity={sectionItemOpacity}
        style={[styles.sectionItem, { height: itemHeight }, sectionItemStyle]}
      >
        <TYText style={[styles.sectionItemText, sectionItemTextStyle]}>{name}</TYText>
        <TYText style={[styles.sectionItemSubText, sectionItemSubTextStyle]}>{subName}</TYText>
      </TouchableOpacity>
    );
  };
  const _renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => {
    return (
      <View style={[styles.renderSectionHeader, { height: itemHeight }, sectionHeaderStyle]}>
        <TYText style={[styles.sectionHeaderText, sectionHeaderTextStyle]}>{title}</TYText>
      </View>
    );
  };
  const _renderSearch = () => {
    const resetValue = reset && reset.substring(0, 11);
    return (
      <View style={[styles.researchBox, researchStyle]}>
        <TextInput
          defaultValue={searchValue}
          onChangeText={debounce(v => _search(v), 300)}
          placeholder={placeholderText || Strings.getLang('TYRemote_pholder')}
          inlineImageLeft="search"
          underlineColorAndroid="transparent"
          style={[styles.input, researchInputStyle]}
        />
        <TouchableOpacity
          activeOpacity={researchBtnOpacity}
          onPress={() => setSearchValue('')}
          style={styles.researchBtn}
        >
          <TYText style={[styles.researchText, researchTextStyle]}>
            {resetValue || Strings.getLang('TYRemote_reset')}
          </TYText>
        </TouchableOpacity>
      </View>
    );
  };
  const _keyExtractor = (item: SectionItem) => item.key;
  return (
    <View>
      {_renderSearch()}
      {searchValue.length === 0 ? (
        <>
          <SectionList
            ref={sectionListRef}
            ListHeaderComponent={header}
            renderItem={_renderSectionItem}
            renderSectionHeader={_renderSectionHeader}
            getItemLayout={_getItemLayout}
            sections={sections}
            initialNumToRender={initialNumToRender}
            keyExtractor={_keyExtractor}
          />
          <View style={[styles.letterMain, letterMainStyle]}>
            {letterList.length > 0 && (
              <TouchableOpacity
                activeOpacity={letterItemOpacity}
                style={[styles.item, letterItemStyle]}
                onPress={() => {
                  setCurrentIndex(-1);
                  changeLetter(-1);
                }}
              >
                <Image
                  source={letterTopImage || Res.starIcon}
                  style={
                    currentIndex === -1
                      ? [styles.letterTopActive, letterTopActiveStyle]
                      : [styles.letterTop, letterTopStyle]
                  }
                />
              </TouchableOpacity>
            )}
            {letterList.map((item: string, index: number) => (
              <TouchableOpacity
                key={item}
                activeOpacity={letterItemOpacity}
                style={[styles.item, letterItemStyle]}
                onPress={() => {
                  setCurrentIndex(index);
                  changeLetter(index);
                }}
              >
                <TYText
                  style={
                    index === currentIndex
                      ? [styles.letterItemTextActive, letterItemTextActiveStyle]
                      : [styles.letterItemText, letterItemTextStyle]
                  }
                >
                  {letterList[index]}
                </TYText>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <FlatList
          data={searchData}
          renderItem={_renderSearchListItem}
          extraData={searchData}
          keyExtractor={_keyExtractor}
        />
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
  item: {
    alignItems: 'center',
    height: cy(17),
    justifyContent: 'center',
    width: '100%',
  },
  letterItemText: {
    color: '#000000',
    fontSize: cx(16),
  },
  letterItemTextActive: {
    color: '#00CC99',
    fontSize: cx(18),
  },
  letterMain: {
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: cy(170),
    width: cx(34),
  },
  letterTop: {
    height: cx(14),
    resizeMode: 'contain',
    tintColor: '#000000',
    width: cx(14),
  },
  letterTopActive: {
    height: cx(14),
    resizeMode: 'contain',
    tintColor: '#00CC99',
    width: cx(14),
  },
  renderSectionHeader: {
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    paddingLeft: cx(15),
  },
  researchBox: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: cx(50),
    justifyContent: 'space-between',
    paddingHorizontal: cx(10),
  },
  researchBtn: {
    marginLeft: cx(10),
  },
  researchText: {
    color: '#000',
    fontSize: cx(14),
  },
  sectionHeaderText: {
    fontSize: cx(18),
  },
  sectionItem: {
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    justifyContent: 'center',
    paddingHorizontal: cx(15),
  },
  sectionItemSubText: {
    color: '#767272',
    fontSize: cx(12),
    marginTop: cx(5),
  },
  sectionItemText: {
    fontSize: cx(15),
  },
});

export default LetterSearch;
