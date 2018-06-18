import * as types from '../constants/ActionTypes.js';
import SpringFestivalAPI from '../services/SpringFestivalAPI.js';

//获取红包
export function receiveCoupon(token, callback) {
  return dispatch => {

    SpringFestivalAPI.receiveCoupon(token)
    .then(function(response){
      dispatch({
        type: types.FETCH_RECTIVE_COUPONS,
        payload: {
          is_receive_coupon: true,
        }
      });
      callback && callback();
    }).catch(function(error) {
      console.log(error)
    });
  }
}

//获取用户分享码
export function getUserCouponCode(token, callback){
  return dispatch => {
    SpringFestivalAPI.getUserCouponCode(token)
    .then(function(response){
      dispatch({
        type: types.FETCH_USER_COUPONS_EXTEND_CODE,
        payload: {
          extend_code: response.extend_code,
        }
      });
      callback && callback(response.extend_code);
    }).catch(function(error) {
      console.log(error)
    });
  }
}

//记录分享码
export function signShared(is_receive_coupon, callback){
  return dispatch => {
    dispatch({
      type: types.FETCH_RECTIVE_COUPONS,
      payload: {
        is_receive_coupon: is_receive_coupon,
      }
    });
    callback && callback();
  }
}

//分享后列表
export function spreadList(token, callback) {
  return dispatch => {

    SpringFestivalAPI.spreadList(token)
    .then(function(response){
      dispatch({
        type: types.FETCH_USER_YEAR_LIST,
        payload: {
          userSpreadData: response,
        }
      });
      callback && callback(response.receive)
    }).catch(function(error) {
      console.log(error)
    });
  }
}
