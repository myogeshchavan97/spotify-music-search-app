import { SET_ARTISTS, ADD_ARTISTS } from '../utils/constants';

const artistsReducer = (state = {}, action) => {
  const { artists } = action;
  switch (action.type) {
    case SET_ARTISTS:
      return artists;
    case ADD_ARTISTS:
      return {
        ...state,
        next: artists.next,
        items: [...state.items, ...artists.items]
      };
    default:
      return state;
  }
};

export default artistsReducer;
