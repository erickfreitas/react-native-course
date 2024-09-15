import { useEffect } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';

import { Colors } from '../constants/colors';
import OutlinedButton from '../components/ui/OutlinedButton';

function PlaceDetails({ route }) {

  function showOnMapHandler() { }

  const selectedPlaceId = route.params.placeId;
  
  useEffect(() => {
    
  }, [selectedPlaceId]);

  return (
    <ScrollView>
      <Image style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>Address</Text>
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
