import React from 'react';
import { requireNativeComponent, View } from 'react-native';
import PropTypes from 'prop-types';

const Player = requireNativeComponent('TYRCTCameraPlayer', CameraPlayer, {
  nativeOnly: { onChange: true },
});

class CameraPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Player
        {...this.props}
        onChange={event => {
          this.props.onChangePreview(event);
        }}
      />
    );
  }
}

CameraPlayer.propTypes = {
  action: PropTypes.number.isRequired,
  onChangePreview: PropTypes.func.isRequired,
  ...View.propTypes,
};

export default CameraPlayer;
