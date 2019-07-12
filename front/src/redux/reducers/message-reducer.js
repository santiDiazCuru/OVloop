import { SET_MESSAGE } from '../../constants';

const initialState = {
  success: [],
  failed: [],
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return Object.assign({}, state, { success: action.messages.success, failed: action.messages.failed, list: action.messages.list });
    default:
      return state;
  }
}