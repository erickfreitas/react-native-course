import { useState } from 'react';
import { Alert, Button, View, Image, Text, StyleSheet } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';

import OutlinedButton from '../ui/OutlinedButton';
import { Colors } from '../../constants/colors';

function ImagePicker() {
  const [image, setImage] = useState();
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.'
      );

      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const capturedImage = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setImage(capturedImage.assets[0].uri);
    console.log(image);
  }

  return (
    <View>
      <View style={styles.imagePreview}>
        {!image && <Text>No image taken yet.</Text>}
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <OutlinedButton icon='camera' onPress={takeImageHandler} size={24}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
