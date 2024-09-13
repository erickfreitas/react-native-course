import PlaceForm from "../components/Places/PlaceForm";

function AddPlaces({ navigation }) {
  function createPlaceHandler(place) {
    navigation.navigate('AllPlaces', { place });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />
}

export default AddPlaces;