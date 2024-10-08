import PlaceForm from "../components/Places/PlaceForm";

import { insertPlace } from "../util/database";

function AddPlaces({ navigation }) {

  async function createPlaceHandler(place) {
    await insertPlace(place);
    navigation.navigate('AllPlaces', { place });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />
}

export default AddPlaces;