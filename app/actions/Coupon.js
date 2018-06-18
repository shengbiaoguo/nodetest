import * as types from '../constants/ActionTypes.js';
import CouponAPI from '../services/CouponAPI.js';

export function collectCouponWithPhoneNumber(phone_number) {
  return dispatch => {

    CouponAPI.collectCouponWithPhoneNumber(phone_number)
    .then(function(response){
      dispatch({
        type: types.DISPLAY_POPUP,
        payload:{
          title: "恭喜你，",
          body: "您已经领取到『立减200』的优惠劵一张，登录该手机号码绑定注册的账户查看您的优惠劵。",
          button_text: "",
          button_link: "#"
        }
      });
    }).catch(function(error) {
      let error_code = JSON.parse(error.response).error_code;
      let error_title="很遗憾..."
      let error_message="";
      let button_text = "";
      switch(error_code){
        case 9509:
          error_message="您本周已经领取过一次优惠劵了，密切关注2ccm app，我们每周三发放优惠劵福利。"
          break;
        default:
          error_message="领取优惠劵失败，请稍后再试试。"
      }

      dispatch({
        type: types.DISPLAY_POPUP,
        payload:{
          title: error_title,
          body: error_message,
          button_text: button_text,
          button_link: "#"
        }
      });


    });
  }
}
