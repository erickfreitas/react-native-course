import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    ids: []
  },
  reducers: {
    addfavorite: (state, action) => {
      state.ids.push(action.payload.id);
    },
    removefavorite: (state, action) => { 
      state.ids.splice(state.ids.indexOf(action.payload.id), 1);
    }
  }
});

export const addFavorite = favoriteSlice.actions.addfavorite;
export const removeFavorite = favoriteSlice.actions.removefavorite;
export default favoriteSlice.reducer;