import API from './api.js';
import * as URL from '../constants/Endpoints.js'

class SpringFestivalAPI extends API {
  constructor() {
    super()
  }

  receiveCoupon(token){
  	return this.postH( token, URL.FETCH_RECTIVE_COUPONS_URL);
  }

  getUserCouponCode(token){
    return this.getH( token, URL.FETCH_USER_COUPONS_EXTEND_CODE_URL);
  }

  spreadList(token){
    return this.getH( token, URL.FETCH_USER_YEAR_LIST_URL)
  }

  invitationReceiveCoupon(data){
    return this.post(URL.GET_INVITATION_COUPONS_URL, data)
  }

}

export default new SpringFestivalAPI();
