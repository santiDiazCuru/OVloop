import { SET_MESSAGE } from '../../constants';

const initialState = {
  sent: [],
  failed: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return Object.assign({}, state, { sent: action.messages, });
    default:
      return state;
  }
}