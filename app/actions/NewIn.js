import * as types from '../constants/ActionTypes.js';
import NewInAPI from '../services/NewInAPI.js';

export function fetchNewInProductList(page=1, per_page=100) {
  return dispatch => {
    
    NewInAPI.fetchNewInProductList(page, per_page)
    .then(function(response){
      dispatch({
        type: types.FETCH_NEW_IN_PRODUCT_LIST,
        payload:{
          productList: response.newin
        }
      });
    }).catch(function(error) {
      console.log(error)
    });
  }
}

export function countDownTime(){
  return (dispatch, getState) => {
    const productList = getState().new_in.productList;
    let newProductList = [].concat(productList);
    dispatch({
      type: types.FETCH_NEW_IN_PRODUCT_LIST,
      payload:{
        productList: newProductList
      }
    })
  }
}
