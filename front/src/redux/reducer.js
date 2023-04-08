import {
  ADD_FAVORITE,
  DELETE_FAVORITE,
  FILTER,
  ORDER,
  RESET_FAVORITES,
  SET_USERNAME,
  SET_USER_ID,
  SET_ACCESS,
  GET_ALL_FAVS_USER,
  LOG_OUT,
} from './actions'

const initialState = {
  myFavorites: [],
  allCharacters: [],
  userName: '',
  userId: 0,
  access: false,
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FAVORITE:
      return {
        ...state,
        allCharacters: [...state.allCharacters, payload],
        myFavorites: [...state.myFavorites, payload],
      }
    case DELETE_FAVORITE:
      let deleted = state.allCharacters.filter((char) => char.id !== payload)//eslint-disable-line
      return {
        ...state,
        allCharacters: deleted,
        myFavorites: deleted,
      }
    case FILTER:
      return {
        ...state,
        myFavorites: state.allCharacters.filter(
          (char) => char.gender === payload
        ),
      }
    case ORDER:
      let sorted = state.myFavorites.sort((a, b) => a.id - b.id)//eslint-disable-line
      payload === 'Descendiente' && sorted.reverse()
      return {
        ...state,
        myFavorites: sorted,
      }
    case RESET_FAVORITES:
      return {
        ...state,
        myFavorites: [...state.allCharacters],
      }
    case SET_USERNAME:
      return { ...state, userName: payload }
    case SET_USER_ID:
      return { ...state, userId: payload }
    case SET_ACCESS:
      return { ...state, access: payload }
    case LOG_OUT:
      return { ...initialState }
    case GET_ALL_FAVS_USER:
      return { ...state, myFavorites: payload, allCharacters: payload }
    default:
      return { ...state }
  }
}

export default reducer
