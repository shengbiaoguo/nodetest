import Q from 'q'
import request from 'reqwest';

class API {

  post(url, data){
    var deferred = Q.defer();
    request({
      url: url,
      method: 'POST',
      data: data,
      success: response => {
        deferred.resolve(response);
      },
      error: error => {
        deferred.reject(error);
      }
    })
    return deferred.promise
  }

  put(url, data){
    var deferred = Q.defer();
    request({
      url: url,
      method: 'PUT',
      data: data,
      success: response => {
        deferred.resolve(response);
      },
      error: error => {
        deferred.reject(error);
      }
    })
    return deferred.promise
  }

  delete(url, data){
    var deferred = Q.defer();
    request({
      url: url,
      method: 'DELETE',
      data: data,
      success: response => {
        deferred.resolve(response);
      },
      error: error => {
        deferred.reject(error);
      }
    })
    return deferred.promise
  }

  get(url){
    var deferred = Q.defer();
    request({
      url: url,
      method: 'GET',
      success: response => {
        deferred.resolve(response);
      },
      error: error => {
        deferred.reject(error);
      }
    })
    return deferred.promise
  }

  getH(token,url){
    var deferred = Q.defer();
    request({
      url: url,
      method: 'GET',
      headers: {'Authorization': 'Token token=' + token},
      success: response => {
        deferred.resolve(response);
      },
      error: error => {
        deferred.reject(error);
      }
    })
    return deferred.promise
  }

  postH(token, url, data){
    var deferred = Q.defer();
    request({
      url: url,
      method: 'POST',
      headers: {'Authorization': 'Token token=' + token},
      data: data,
      success: response => {
        deferred.resolve(response);
      },
      error: error => {
        deferred.reject(error);
      }
    })
    return deferred.promise
  }


}

export default API;
