import axios from 'axios';
import { SET_DATE_FROM, SET_DATE_TO } from '../../constants';

export const setDateFrom = (from) => ({
  type: SET_DATE_FROM,
  from,
});

export const setDateTo = (to) => ({
    type: SET_DATE_TO,
    to,
  });

// export const setDate = () => dispatch =>
//   axios.get('/api/albums')
//     .then(res => res.data)
//     .then(albums => dispatch(receiveAlbums(albums)));