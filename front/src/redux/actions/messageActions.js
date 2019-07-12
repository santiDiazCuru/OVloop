import axios from 'axios';
import { SET_MESSAGE, SET_LISTCHANNEL } from '../../constants';

export const receiveMessages = (messages) => ({
    type: SET_MESSAGE,
    messages,
});

const listChannel = (channels) => ({
    type: SET_LISTCHANNEL,
    channels
})

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
    return axios.post('/stats/date', { from: from, to: to })
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


export const fetchMessagesByChannel = (channel) => dispatch => {
    return axios.post('/stats/channel', { channel: channel })
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

export const fetchListChannel = () => dispatch => {
    return axios.get('/stats/listchannel')
        .then(res => res.data)
        .then((list) => dispatch(listChannel(list)))
}