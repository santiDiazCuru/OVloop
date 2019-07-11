import { SET_MESSAGE } from '../../constants';

const initialState = {
  list: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_MESSAGE:
      return Object.assign({}, state, { list: action.messages });
    default:
      return state;
  }
}