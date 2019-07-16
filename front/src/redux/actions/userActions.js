import axios from 'axios';
import { LOG_IN_USER, LOG_OUT_USER } from '../../constants';

export const  setLoggedUser = () => ({
    type: LOG_IN_USER
});
export const  logOutUser = () => ({
    type: LOG_OUT_USER
});

export const logInUser = (user, password) => dispatch => {
    return axios.post('/users/login', {username: user, password: password})
        .then(res => res.data)
        .then(user=>{
            if(user.length){
            dispatch(setLoggedUser())
            }
            else {
                window.alert('El usuario o la contraseña son incorrectos')
            }
        })
};

export const validateSession = () => dispatch => {
    return axios.get('/users/session')
    .then((session)=>{
        if(session.data)dispatch(setLoggedUser())
    })
};

export const endSession = () => dispatch => {
    return axios.get('/users/logout')
    .then(()=> dispatch(logOutUser))
}