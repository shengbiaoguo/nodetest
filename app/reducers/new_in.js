import * as types from '../constants/ActionTypes.js';
import moment from 'moment';

const initialState = {
  loading: false,
  productList: []
}

export default function new_in(state = initialState, action) {
  switch (action.type) {

      case types.FETCH_NEW_IN_PRODUCT_LIST:
        var newState = state;
        var newProductList = action.payload.productList;
        var nowSec = parseInt(new Date().getTime() /1000);
        newProductList.map(item=>{
          item.products.map(innerItem=>{
            if(innerItem.start_sale_time > nowSec){
              innerItem.countDown = innerItem.start_sale_time - nowSec;
            }else{
              innerItem.countDown = null
            }
            
          })
        }) 
        newState.productList = newProductList;
        return Object.assign({}, state, newState);

      default:
        return state
    }
}
