import axios from 'axios';
import { SET_MESSAGE } from '../../constants';

export const receiveMessages = (messages) => ({
    type: SET_MESSAGE,
    messages,
});


export const fetchMessages = () => dispatch => {
    return axios.get('/stats/general')
        .then(res => res.data)
        .then(messages => {
            let messagesToReducer = { success: [], failed: [], list: messages };
            for (let i = 0; i < messages.length; i++) {
                if (messages[i].status == 'success') {
                    messagesToReducer.success.push(messages[i]);
                }
                else messagesToReducer.failed.push(messages[i]);
            }
            dispatch(receiveMessages(messagesToReducer))
        })
};

export const fetchMessagesByDate = (from, to) => dispatch => {
    return axios.post('/stats/general', { from: from, to: to })
        .then(res => res.data)
        .then(messages => {
            let messagesToReducer = { success: [], failed: [], list: messages };
            for (let i = 0; i < messages.length; i++) {
                if (messages[i].status == 'success') {
                    messagesToReducer.success.push(messages[i]);
                }
                else messagesToReducer.failed.push(messages[i]);
            }
            dispatch(receiveMessages(messagesToReducer))
        })
};