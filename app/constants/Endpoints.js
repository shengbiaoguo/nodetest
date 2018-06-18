const versionTag = "v1";

let host = "https://api.2ccm.net"
// let host2 = "https://staging.2ccm.net"
export const HOST = host
export const BASE_URL = HOST + "/api/" + versionTag + "/";

// coupon
export const COLLECT_COUPON_WITH_PHONE_NUMBER = HOST + "/promos/award.json";

//doule-eleven
export function FETCH_DOUBLE_ELEVEN_URL(page, per_page){
	return BASE_URL + "products/campaign.json?tag=double_eleven&page=" + page + "&per_page=" + per_page
}

//new-in
export function FETCH_NEW_IN_PRODUCT_LIST_URL(page, per_page){
	return BASE_URL + "products/new-in.json?tag=double_eleven&page=" + page + "&per_page=" + per_page
}

//spring-festival
export const FETCH_RECTIVE_COUPONS_URL =  host + '/campaign/new_year/receive_coupons.json';
export const FETCH_USER_COUPONS_EXTEND_CODE_URL =  host + '/api/v1/promos/extend_code.json';
export const FETCH_USER_YEAR_LIST_URL =  host + '/campaign/new_year.json';
export const GET_INVITATION_COUPONS_URL =  host + '/campaign/new_year/invitation_receive_coupons.json';

// https://api.2ccm.net/api/v1/products/campaign.json?tag=double_eleven&page=1&per_page=50


//red-envelope
export const COLLECT_RED_ENVELOPE_WITH_PHONE_NUMBER = host + "/campaign/new_year/invitation_receive_coupons.json";
