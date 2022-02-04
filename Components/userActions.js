import { FETCH_USERS_REQUEST,FETCH_USERS_SUCCESS , FETCH_USERS_FAILURE, FILTER_COURSE_NAME } from "./userTypes"
import axios from "axios"

export const fetchusersrequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

export const fetchuserssuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

export const fetchusersfailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}




export const fetchUsers = () => {
    
    return (dispatch) => {
        dispatch(fetchusersrequest)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    axios.get('https://nut-case.s3.amazonaws.com/coursessc.json')
    .then(response => {
        const users = response.data.slice(0,100)
      
        dispatch(fetchuserssuccess(users))
    })
    .catch(error => {
        const errorMsg = error.message
        dispatch(fetchusersfailure(errorMsg))
    })
    }
}


export const filterbycourse = users => ({
    type:FILTER_COURSE_NAME,
    payload:users['Course Name']
})

