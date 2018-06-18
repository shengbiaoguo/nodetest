import * as types from '../constants/ActionTypes.js';
import DoubleEleven from '../services/DoubleElevenAPI.js';

export function doubleElevenActivityList(page, per_page) {
  return dispatch => {

    DoubleEleven.doubleElevenActivityList(page, per_page)
    .then(function(response){
      dispatch({
        type: types.DOULE_ELEVEN_ACTIVITY_LIST,
        payload:{
          productList: response.products
        }
      });
    }).catch(function(error) {
      console.log(error)
    });
  }
}
