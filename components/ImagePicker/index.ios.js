import React, {PureComponent} from 'react';
import {View, Text, ActionSheetIOS} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

class ImagePicker extends PureComponent {
  toggleImagePicker = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Select From Camera...', 'Select From Library...'],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          launchCamera(
            {
              mediaType: 'photo',
              cameraType: 'front',
            },
            res => {
              this.props.onImageSelect(res);
            },
          );
        } else if (buttonIndex === 2) {
          launchImageLibrary(
            {
              mediaType: 'photo',
            },
            res => {
              this.props.onImageSelect(res);
            },
          );
        }
      },
    );
  };

  render() {
    return null;
  }
}

export default ImagePicker;
