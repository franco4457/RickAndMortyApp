export const ADD_FAVORITE = "ADD_FAVORITE";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const FILTER="FILTER";
export const ORDER="ORDER";
export const RESET_FAVORITES="RESET_FAVORITES";
export const SET_USERNAME="SET_USERNAME";

export const addFavorite=(character)=>{
    return{type:ADD_FAVORITE,payload:character}

}
export const deleteFavorite=(id)=>{
    return{type:DELETE_FAVORITE,payload:id}
}

export const filterCards=(gender)=>{
return {type:FILTER,payload:gender}
}

export const orderCards=(id)=>{
return {type:ORDER,payload:id}
}

export const resetFavorites=()=>{
    return{type:RESET_FAVORITES}
}

export const setUsername=(userName)=>{
    return {type:SET_USERNAME, payload:userName}
}
