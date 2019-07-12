import axios from 'axios';
import { SET_MESSAGE } from '../../constants';

export const receiveMessages = (messages) => ({
    type: SET_MESSAGE,
    messages,
});


export const fetchMessages = () => dispatch => {
    return axios.get('/stats/general')
        .then(res => res.data)
        .then(messages => dispatch(receiveMessages(messages)))
};


export const fetchMessagesByDate = (from, to) => dispatch => {
    return axios.post('/stats/general', { from: from, to: to })
        .then(res => res.data)
        .then(messages => dispatch(receiveMessages(messages)))
};