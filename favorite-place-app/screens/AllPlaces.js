import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

import { fetchPlaces } from "../util/databaseTeste";

function AllPlaces({ route, navigation }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('passou')

    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    loadPlaces();
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />
}

export default AllPlaces;