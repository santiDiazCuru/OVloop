import { SET_MESSAGE, SET_CHANNELS, SET_ORIGINS } from '../../constants';

const initialState = {
  success: [],
  failed: [],
  list: [],
  channels: [],
  origins: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return Object.assign({}, state, { success: action.messages.success, failed: action.messages.failed, list: action.messages.list });
    case SET_CHANNELS:
      return Object.assign({}, state, { channels: action.channels });
    case SET_ORIGINS:
      return Object.assign({}, state, { origins: action.origins })
    default:
      return state;
  }
}
