import * as types from '../constants/ActionTypes.js';
import moment from 'moment';

const initialState = {
  is_receive_coupon: null, //是否已经领过红包
  extend_code: null,       //分享码
  user_spread_data: null,  //分享后数据列表
}

export default function spring_festival(state = initialState, action) {
  switch (action.type) {

      case types.FETCH_RECTIVE_COUPONS:
        var newState = state;
        newState.is_receive_coupon = action.payload.is_receive_coupon;
        return Object.assign({}, state, newState);

      case types.FETCH_USER_YEAR_LIST:
        var newState = state;
        newState.user_spread_data = action.payload.userSpreadData;
        return Object.assign({}, state, newState);

      case types.FETCH_USER_COUPONS_EXTEND_CODE:
        var newState = state;
        newState.extend_code = action.payload.extend_code;
        return Object.assign({}, state, newState);

      default:
        return state
    }
}


// FETCH_RECTIVE_COUPONS
// FETCH_USER_YEAR_LIST
// GET_INVITATION_COUPONS
