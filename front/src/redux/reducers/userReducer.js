import { LOG_IN_USER, LOG_OUT_USER } from '../../constants';

const initialState = {
    isLoggedIn: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_USER:
            return Object.assign({}, state, { isLoggedIn: true });
        case LOG_OUT_USER:
            return Object.assign({}, state, { isLoggedIn: false });
        default:
            return state;
    }
}