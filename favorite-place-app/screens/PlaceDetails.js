import { useEffect, useState } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';

import { Colors } from '../constants/colors';
import OutlinedButton from '../components/ui/OutlinedButton';
import { fetchPlaceDetails } from '../util/database';

function PlaceDetails({ route, navigation }) {
  const [selectedPlace, setSelectedPlace] = useState();

  function showOnMapHandler() { }

  const selectedPlaceId = route.params.placeId;
  
  useEffect(() => {
    async function loadPlaceData() { 
      const place = await fetchPlaceDetails(selectedPlaceId);

      setSelectedPlace(place);

      navigation.setOptions({
        title: place.title,
      });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  if (!selectedPlace) {
    return (
      <View style={styles.fallBack}>
        <Text style={styles.fallBackText}>Loading Place Data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedPlace?.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace?.address}</Text>
        </View>
        <OutlinedButton icon={'map'} onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallBackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  location: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
