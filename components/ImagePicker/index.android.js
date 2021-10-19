import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {gestureHandlerRootHOC, RectButton} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Divider from '../Divider';
import Typography from '../Typography';
import styles from './styles';

const ImagePickerModelView = gestureHandlerRootHOC(
  ({onPress}) => {
    return (
      <>
        <View style={styles.box}>
          <Typography variant="h3" style={{color: 'dodgerblue'}}>
            Select Avatar
          </Typography>
        </View>
        <Divider style={{backgroundColor: 'dodgerblue'}} />
        <RectButton style={styles.box} onPress={() => onPress('camera')}>
          <Typography variant="body1">Select From Camera...</Typography>
        </RectButton>
        <RectButton style={styles.box} onPress={() => onPress('library')}>
          <Typography variant="body1">Select From Library...</Typography>
        </RectButton>
        <RectButton style={styles.box} onPress={() => onPress('cancel')}>
          <Typography variant="body1">Cancel</Typography>
        </RectButton>
      </>
    );
  },
  {
    backgroundColor: '#fff',
    flex: 0,
  },
);

class ImagePicker extends PureComponent {
  state = {
    isModelVisible: false,
  };

  toggleImagePicker = () => {
    this.setState(({isModelVisible}) => ({
      isModelVisible: !isModelVisible,
    }));
  };

  render() {
    const {isModelVisible} = this.state;
    return (
      <Modal isVisible={isModelVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingVertical: 10,
          }}>
          <ImagePickerModelView
            onPress={type => {
              switch (type) {
                case 'camera':
                  launchCamera(
                    {
                      mediaType: 'photo',
                      cameraType: 'front',
                    },
                    res => {
                      this.props.onImageSelect(res);
                      this.toggleImagePicker();
                    },
                  );
                  break;
                case 'library':
                  launchImageLibrary(
                    {
                      mediaType: 'photo',
                    },
                    res => {
                      this.props.onImageSelect(res);
                      this.toggleImagePicker();
                    },
                  );
                  break;

                default:
                  this.toggleImagePicker();
                  break;
              }
            }}
          />
        </View>
      </Modal>
    );
  }
}

export default ImagePicker;
