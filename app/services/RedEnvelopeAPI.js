import API from './api.js';
import * as URL from '../constants/Endpoints.js'
import Q from 'q'

class RedEnvelopeAPI extends API {
  constructor() {
    super()
  }

  collectCouponWithPhoneNumber(phone_number, extend_code) {
    return this.post(URL.COLLECT_RED_ENVELOPE_WITH_PHONE_NUMBER, {
      phone_number: phone_number,
      extend_code: extend_code
    });
  }

}

export default new RedEnvelopeAPI()
