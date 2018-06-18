import API from './api.js';
import * as URL from '../constants/Endpoints.js'
import Q from 'q'

class DoubleEleven extends API {
  constructor() {
    super()
  }

  doubleElevenActivityList(page, per_page){
  	return this.get( URL.FETCH_DOUBLE_ELEVEN_URL(page, per_page));
  }

}

export default new DoubleEleven()
