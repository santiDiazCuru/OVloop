import axios from 'axios';
import { SET_MESSAGE, SET_CHANNELS, SET_ORIGINS } from '../../constants';

export const receiveMessages = (messages) => ({
    type: SET_MESSAGE,
    messages,
});

export const setChannels = (channels) => ({
    type: SET_CHANNELS,
    channels
})
export const setOrigins = (origins) => ({
    type: SET_ORIGINS,
    origins
})

export const fetchMessages = () => dispatch => {
    return axios.post('/stats', {})
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
    return axios.post('/stats', { from: from, to: to })
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
    return axios.post('/stats', { channel: channel })
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
}

export const fetchMessagesByOrigin = (origin) => dispatch => {
    return axios.post('/stats', { origin: origin })
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
}

export const fetchOriginList = () => dispatch => {
    return axios.get('/stats/getorigins')
        .then(origins => origins.data)
        .then(origins => {
            dispatch(setOrigins(origins))
        })
}

export const fetchChannelsList = () => dispatch => {
    return axios.get('/stats/getchannels')
        .then(channels => channels.data)
        .then(channels => {
            dispatch(setChannels(channels))
        })
}
