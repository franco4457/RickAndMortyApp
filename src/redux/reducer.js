import {
  ADD_FAVORITE,
  DELETE_FAVORITE,
  FILTER,
  ORDER,
  RESET_FAVORITES,
  SET_USERNAME,
} from "./actions";

const initialState = {
  myFavorites: [],
  allCharacters: [],
  userName: "",
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FAVORITE:
      return {
        ...state,
        allCharacters: [...state.allCharacters, payload],
        myFavorites: [...state.myFavorites, payload],
      };
    case DELETE_FAVORITE:
      let deleted = state.allCharacters.filter((char) => char.id !== payload);
      return {
        ...state,
        allCharacters: deleted,
      };
    case FILTER:
      return {
        ...state,
        myFavorites: state.allCharacters.filter(
          (char) => char.gender === payload
        ),
      };
    case ORDER:
      let sorted = state.myFavorites.sort((a, b) => a.id - b.id);
      payload === "Descendiente" && sorted.reverse();
      return {
        ...state,
        myFavorites: sorted,
      };
    case RESET_FAVORITES:
      return {
        ...state,
        myFavorites: [...state.allCharacters],
      };
    case SET_USERNAME:
      return { ...state, userName: payload };

    default:
      return { ...state };
  }
};

export default reducer;
