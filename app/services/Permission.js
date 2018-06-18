import jwt from 'jsonwebtoken';
import {PERISSION_PRIVATEKEY} from '../constants/Settings';

class Permission {

  constructor() {
  }

  signJwt(content) {
    if (content instanceof Array) {
      content = content.join(',');
      var contentObj = {
        msg: content
      };
      var secretOrPrivateKey = PERISSION_PRIVATEKEY;
      var token = jwt.sign(contentObj, secretOrPrivateKey, {
        expiresIn: 60 * 60 * 24 * 90
      });
      return token;
    }
  }

  verifyJwt(token) {
    var secretOrPrivateKey = PERISSION_PRIVATEKEY;
    var result = null;

    jwt.verify(token, secretOrPrivateKey, function(err, decode) {
      if (err) {
        result = false;
      } else {
        let userIdStr = decode.token.match(/\d+\|/g);
        let len = userIdStr[0].length-1;
        let userId = userIdStr[0].substr(0, len);
        result = {
          userToken: decode.token.replace(/\d+\|/g, ''),
          userId,
        }
      }
    })
    return result;
  }

}

export default new Permission();
