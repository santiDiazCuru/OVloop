import { SET_MESSAGE, SET_LISTCHANNEL } from '../../constants';

const initialState = {
  success: [],
  failed: [],
  list: [],
  listChannel: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return Object.assign({}, state, { success: action.messages.success, failed: action.messages.failed, list: action.messages.list });
    case SET_LISTCHANNEL:
      return Object.assign({}, state, { listChannel: action.channels })
    default:
      return state;
  }
}