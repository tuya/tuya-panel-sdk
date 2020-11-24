import React, { Component } from 'react';
import { Image } from 'react-native-svg';

import api from '../../../api';

interface IProps {
  uri: string;
}
interface IState {
  imgBase64: string;
}
export default class SvgImageUri extends Component<IProps, IState> {
  state = {
    imgBase64: '',
  };

  static defaultProps = {
    uri: '',
  };

  componentDidMount() {
    this.loadingImg();
  }
  loadingImg = async () => {
    const { uri } = this.props;
    const imgBase64 = await api.downloadImage(uri);
    if (!!imgBase64)
      this.setState({
        imgBase64: `data:image/*;base64,${imgBase64}`,
      });
  };
  render() {
    const { imgBase64 } = this.state;
    const { uri, ...ImageProps } = this.props;
    debugger
    if (!!imgBase64) {
      return (
        <Image
          {...ImageProps}
          href={{
            uri: `${this.state.imgBase64}`,
          }}
        />
      );
    }
    return null;
  }
}
