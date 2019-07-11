import axios from 'axios';
import { SET_MESSAGE } from '../../constants';

export const receiveMessages = (messages) => ({
    type: SET_MESSAGE,
    messages,
});


export const fetchMessages = () => dispatch =>
    axios.get('/stats/general')
        .then(res => res.data)
        .then(messages => dispatch(receiveMessages(messages)));