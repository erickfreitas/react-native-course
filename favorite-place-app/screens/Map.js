import { useLayoutEffect, useState, useCallback, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButtons from '../components/ui/IconButtons';

function Map({ navigation, route }) {
  const [selectedLocation, setSelectedLocation] = useState();

  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng
  };

  const region = {
    latitude: initialLocation?.lat || 37.78825,
    longitude: initialLocation?.lng || -122.4324,
    latitudeDelta: 0.007,
    longitudeDelta: 0.007,
  };

  useEffect(() => {
    if (initialLocation) {
      setSelectedLocation({
        lat: initialLocation.lat,
        lng: initialLocation.lng,
      });
    }
  }, [setSelectedLocation]);

  function selectLocationHandler(event) {

    if (initialLocation) {
      return;
    }

    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('No location picked!', 'Please pick a location on the map.');
      return;
    }

    navigation.navigate('AddPlaces', { pickedLocation: selectedLocation });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (!initialLocation) {
      navigation.setOptions({
        headerRight: ({ tintColor }) => (
          <IconButtons
            icon='save'
            size={24}
            color={tintColor}
            onPress={savePickedLocationHandler}
          />
        ),
      });
    }
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title='Picked Location'
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
