import { createContext, useState } from 'react';

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

function FavoritesContextProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function addFavorite(id) { 
    setFavorites((currentFavorites) => {
      return [...currentFavorites, id];
    });
  }

  function removeFavorite(id) {
    setFavorites((currentFavorites) => {
      return currentFavorites.filter((mealId) => mealId !== id);
    });
  }

  const value = {
    ids: favorites,    
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export default FavoritesContextProvider;
