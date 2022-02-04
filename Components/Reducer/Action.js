import {FETCH_USERS_REQUEST,FETCH_USERS_SUCCESS,FETCH_USERS_FAILURE} from "./Actiontypes";
import axios from "axios";

/*
export const fetchcards = () => dispatch =>{
    try {
        const response = axios.get('https://nut-case.s3.amazonaws.com/coursessc.json')
        dispatch({
            type:GET_CARDS,
            payload: response.data.slice(0,100)
        })
    }
    catch(error){
        dispatch({
            type:CARDS_ERROR,
            payload:error
        })
    }
    
}
*/
/*
export const fetchusersrequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}
*/
export const fetchuserssuccess = data => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: data
    }
}

export const fetchusersfailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

export const fetchcards = () => {
    
    return (dispatch) => {
      //  dispatch(fetchusersrequest)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    axios.get('https://nut-case.s3.amazonaws.com/coursessc.json')
    .then(response => {
        const data = response.data.slice(0,100)
      
        dispatch(fetchuserssuccess(data))
    })
    .catch(error => {
        const errorMsg = error.message
        dispatch(fetchusersfailure(errorMsg))
    })
    }
}