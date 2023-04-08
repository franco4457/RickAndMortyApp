import axios from 'axios'

export const ADD_FAVORITE = 'ADD_FAVORITE'
export const DELETE_FAVORITE = 'DELETE_FAVORITE'
export const FILTER = 'FILTER'
export const GET_ALL_FAVS_USER = 'GET_ALL_FAVS'
export const ORDER = 'ORDER'
export const RESET_FAVORITES = 'RESET_FAVORITES'
export const SET_ACCESS = 'SET_ACCESS'
export const SET_USER_ID = 'SET_USER_ID'
export const SET_USERNAME = 'SET_USERNAME'
export const LOG_OUT = 'LOG_OUT'

export const logOut = () => {
  return { type: LOG_OUT }
}

export const addFavorite = (character) => {
  return { type: ADD_FAVORITE, payload: character }
}
export const deleteFavorite = (id) => {
  return { type: DELETE_FAVORITE, payload: id }
}

export const filterCards = (gender) => {
  return { type: FILTER, payload: gender }
}

export const orderCards = (id) => {
  return { type: ORDER, payload: id }
}

export const resetFavorites = () => {
  return { type: RESET_FAVORITES }
}

export const setUsername = (userName) => {
  return { type: SET_USERNAME, payload: userName }
}
export const setUserId = (userId) => {
  return { type: SET_USER_ID, payload: userId }
}
export const setAccess = (access) => {
  return { type: SET_ACCESS, payload: access }
}
export const getAllFavsUser = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/rickandmorty/fav`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(window.localStorage.getItem('user')).token
          }`,
        },
      })
      return dispatch({ type: GET_ALL_FAVS_USER, payload: res.data })
    } catch (error) {
      console.log(error)
    }
  }
}
