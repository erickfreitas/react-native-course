import { useState } from 'react';
import { View, StyleSheet, Alert, Text, Image } from 'react-native';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';
import { useNavigation } from '@react-navigation/native';

import OutlinedButton from '../ui/OutlinedButton';
import { Colors } from '../../constants/colors';
import { getMapPreviewUrl } from '../../util/location';

function LocationPicker() {
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  const [location, setLocation] = useState();

  const navigation = useNavigation();

  async function verifyPermissions() {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInfo.status == PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.'
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (hasPermission === false) {
      return;
    }

    const location = await getCurrentPositionAsync({
      accuracy: 5,
      enableHighAccuracy: true,
    });

    console.log(location);
    setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate('Map');
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {!location && <Text>No location set yet.</Text>}
        {location && (
          <Image
            style={styles.image}
            source={{
              uri: getMapPreviewUrl(
                location.lat,
                location.lng
              ),
            }}
          />
        )}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon='location' size={24} onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon='map' size={24} onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
