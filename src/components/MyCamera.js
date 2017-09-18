'use strict';
import React from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Camera from 'react-native-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
  photobombs: {
    backgroundColor: 'skyblue',
  }
});

export default class MyCamera extends React.Component {
  constructor(props) {
    super(props);

    console.log('PLATFORM.OS:::::::::: ' + Platform.OS)

    if(Platform.OS == 'android') {
      console.log('IN android');
    } else {
      console.log('HOPEFULLY IN IOS')
    }
    let photoUri = '';

    this.camera = null;
    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.stretch,
        captureTarget: Camera.constants.CaptureTarget.disk,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.portrait,
        flashMode: Camera.constants.FlashMode.off,
        // Capture Quality:
        captureQuality: Camera.constants.CaptureQuality.preview,
      },
      isRecording: false
    };
  }

  componentWillMount() {
    console.log('MyCamera.js componentWillMount');
  }

  componentDidMount() {
    console.log('MyCamera.js componentDidMount');
    console.log('this.props.clickedSquareIndex: ' + this.props.clickedSquareIndex);
  }

  takePicture = () => {
        console.log('takePicture this.state.clickedSquareIndex: ' + this.props.clickedSquareIndex);
    if (this.camera) {
      console.log('takePicure CaptureQuality: ' + this.state.camera.captureQuality);
      this.camera.capture()
        .then((data) => this.props.takePhoto(data.path))
        .then((data) =>console.log('MyCamera takePicture() Promise'))
        .catch(err => console.error(err));
    }
  };

  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('../assets/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('../assets/ic_camera_front_white.png');
    }

    return icon;
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }

  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      icon = require('../assets/ic_flash_auto_white.png');
    } else if (this.state.camera.flashMode === on) {
      icon = require('../assets/ic_flash_on_white.png');
    } else if (this.state.camera.flashMode === off) {
      icon = require('../assets/ic_flash_off_white.png');
    }
    return icon;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated
          hidden
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          defaultTouchToFocus
          mirrorImage={false}
          captureQuality={this.state.camera.captureQuality}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={this.switchType}
          >
            <Image
              source={this.typeIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={this.switchFlash}
          >
            <Image
              source={this.flashIcon}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View style={[styles.overlay, styles.bottomOverlay]}>
            <TouchableOpacity
                style={styles.captureButton}
                onPress={this.takePicture}>
              <Image
                  source={require('../assets/ic_photo_camera_36pt.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.photobombs}>
          <Text style={{ fontSize: 20, color: 'white', textAlign: 'center'}}>Teammate photobombs are encouraged.</Text>
        </View>
      </View>
    )
  }
}

export { MyCamera };