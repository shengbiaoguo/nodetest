import * as types from '../constants/ActionTypes.js';
import RedEnvelopeAPI from '../services/RedEnvelopeAPI.js';

export function collectCouponWithPhoneNumber(phone_number, extend_code) {
  return dispatch => {

    RedEnvelopeAPI.collectCouponWithPhoneNumber(phone_number, extend_code)
      .then(function (response) {
        dispatch({
          type: types.RECEIVED_RED_ENVELOPE,
          // payload: {
          //   title: "恭喜你，",
          //   body: "您已经领取到『双十一 立减200』的优惠劵一张，打开app，登录该手机号码绑定注册的账户查看您的优惠劵。",
          //   button_text: "去app查看",
          //   button_link: "https://2ccm.com/redirect"
          // }
        });
      }).catch(function (error) {
        dispatch({
          type: types.ERROR_RED_ENVELOPE
        });
        // let error_code = JSON.parse(error.response).error_code;
        // let error_title = "很遗憾..."
        // let error_message = "";
        // let button_text = "去app逛逛";
        // switch (error_code) {
        //   case 9502:
        //     error_message = "您已经领取过『双十一 立减200』的优惠劵了，密切关注2ccm，下次活动再来看看吧。"
        //     break;
        //   case 9501:
        //     error_title = "未找到该用户"
        //     error_message = "下载2ccm app，使用该手机号码注册用户后再来领取『双十一 立减200』的优惠劵哦。";
        //     button_text = "去注册用户"
        //     break;
        //   case 9503:
        //     error_message = "发放的优惠劵已经被领取完毕，密切关注2ccm，下次活动再来看看吧。"
        //     break;
        //   default:
        //     error_message = "领取优惠劵失败，请稍后再试试。"
        // }

        // dispatch({
        //   type: types.DISPLAY_POPUP,
        //   payload: {
        //     title: error_title,
        //     body: error_message,
        //     button_text: button_text,
        //     button_link: "https://2ccm.com/redirect"
        //   }
        // });


      });
  }
}
