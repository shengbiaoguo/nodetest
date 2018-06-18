import API from './api.js';
import * as URL from '../constants/Endpoints.js'
import moment from 'moment';

class CouponAPI extends API {
  constructor() {
    super()
  }

  collectCouponWithPhoneNumber(phone_number){
    let activity_code = moment().format('YYYY-MM-DD')
    let expiry_date = moment().add(2, 'weeks').endOf('day').format('YYYY-MM-DD HH:mm:ss')
    
    return this.post( URL.COLLECT_COUPON_WITH_PHONE_NUMBER, {
  		phone_number: phone_number,
  		activity_code: activity_code, 
  		expiry_date: expiry_date
  	});
  }

}

export default new CouponAPI()