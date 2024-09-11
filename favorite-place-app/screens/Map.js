import { useLayoutEffect, useState, useCallback } from 'react';
import { StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButtons from '../components/ui/IconButtons';

function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('No location picked!', 'Please pick a location on the map.');
      return;
    }

    console.log(selectedLocation);
    navigation.navigate('AddPlaces', { pickedLocation: selectedLocation });

  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
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
  }, [navigation, savePickedLocationHandler]);

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
