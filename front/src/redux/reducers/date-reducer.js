import { SET_DATE_FROM, SET_DATE_TO } from '../../constants';

const initialState = {
  from: '',
  to: '',
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_DATE_FROM:
      return Object.assign({}, state, { from: action.from });
    case SET_DATE_TO:
      return Object.assign({}, state, { to: action.to });
    default:
      return state;
  }
}