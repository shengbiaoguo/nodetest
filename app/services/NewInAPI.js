import API from './api.js';
import * as URL from '../constants/Endpoints.js'
import Q from 'q'

class NewInAPI extends API {
  constructor() {
    super()
  }

  fetchNewInProductList(page, per_page){
  	return this.get( URL.FETCH_NEW_IN_PRODUCT_LIST_URL(page, per_page));
  }

}

export default new NewInAPI();
