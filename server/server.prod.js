import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import moment from 'moment';
import http from 'http';
import https from 'https';
import jsSHA from 'jssha';
import querystring from 'querystring';

const port = process.env.PORT || 3000;
const app = express();



app.use(express.static(__dirname + '/dist'));
app.set('views', path.join(__dirname));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.get('*', function response(req, res) {
  let title = '';
  let desc = '';
  let temp = '';

  if(req.path == '/collect-coupon'){
  	title = '2ccm APP 代金券',
  	desc = '我，厘米哥，发券。'
  }	else if(req.path == '/double-eleven'){
  	title = '2ccm双十一折扣商品列表',
  	desc = '2ccm,厘米哥,2ccm APP,双十一'
  } else if(req.path == '/new-in'){
    let today = moment().format("MM.DD");
    title = '今日上新 · 2ccm APP',
    desc = '今日上新 · ' + today;
  } else if(req.path == '/adrianne-ho'){
    title = 'Adrianne Ho x 2ccm URBAN LOOKBOOK',
    desc = '进过两个月的筹备，我们邀请到了穿搭“女神”Adrianne Ho 和我们一起完成了 2ccm URBAN LOOKBOOK。';
  } else if(req.path == '/red-envelope'){
    title = '狗富贵莫相忘',
    desc = '2ccm迎新春发放200元优惠券,分享给好友一起来参与并获得更多。';
  }

  temp += '<title>' + title + '</title>';
  temp += '<meta name="description" content="' + desc + '">';
  temp += '<meta name="keywords" content="' + desc + '">';
  temp += '<meta property="og:type" content="website" />';
  temp += '<meta property="og:title" content="' + title + '">';
  temp += '<meta property="og:description" content="' + desc + '">';
  temp += '<meta property="og:image" content="http://campaign.2ccm.net/img/logo_2ccm.jpg" />';
  temp += '<meta property="og:url" content="https://campaign.2ccm.net' + req.path + '">';

  res.render('index', { routerPath: req.path, title: title, desc: desc, temp: temp });
});


app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎   💪 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});


// 输出数字签名对象
var responseWithJson = function (res, data) {
  // 允许跨域异步获取
  res.set({
    "Access-Control-Allow-Origin": "*"
    , "Access-Control-Allow-Methods": "POST,GET"
    , "Access-Control-Allow-Credentials": "true"
  });
  res.json(data);
};

// 随机字符串产生函数
var createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

// 时间戳产生函数
var createTimeStamp = function () {
  return parseInt(new Date().getTime() / 1000) + '';
};

var errorRender = function (res, info, data) {
  if (data) {
    console.log(data);
    console.log('---------');
  }
  res.set({
    "Access-Control-Allow-Origin": "*"
    , "Access-Control-Allow-Methods": "POST,GET"
    , "Access-Control-Allow-Credentials": "true"
  });
  responseWithJson(res, { errmsg: 'error', message: info, data: data });
};

// 2小时后过期，需要重新获取数据后计算签名
var expireTime = 7200 - 100;

var appIds = [
  {
    appid: 'wx6de17ce781c2f0a5'
    , secret: 'b6bdd20cceb5eebac4ff48fb0ff8f81c'
  }
  , {
    appid: 'wxcce1b60d8a90d4dd'
    , secret: 'bf0d85f4189196fa3d4529f4599fefd4'
  }
  , {
    appid: 'wx9ac085a47e2fce3f'
    , secret: '52f770d12c614d1300a44c0274f3627f'
  }
];
/**
  缓存在服务器的每个URL对应的数字签名对象
  {
    'http://game.4gshu.com/': {
      appid: 'wxa0f06601f194xxxx'
      ,secret: '097fd14bac218d0fb016d02f525dxxxx'
      ,timestamp: '1421135250'
      ,noncestr: 'ihj9ezfxf26jq0k'
    }
  }
*/
var cachedSignatures = {};

// 计算签名
var calcSignature = function (ticket, noncestr, ts, url) {
  console.log('ticket----------->>>', ticket, noncestr, ts, url);
  var str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp=' + ts + '&url=' + url;
  let shaObj = new jsSHA(str, 'TEXT');
  return shaObj.getHash('SHA-1', 'HEX');
}

// 获取微信签名所需的ticket
var getTicket = function (url, index, res, accessData) {
  https.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + accessData.access_token + '&type=jsapi', function (_res) {
    var str = '', resp;
    _res.on('data', function (data) {
      str += data;
    });
    _res.on('end', function () {
      console.log('return ticket:  ' + str);
      try {
        resp = JSON.parse(str);
      } catch (e) {
        return errorRender(res, '解析远程JSON数据错误', str);
      }

      var appid = appIds[index].appid;
      var ts = createTimeStamp();
      var nonceStr = createNonceStr();
      var ticket = resp.ticket;
      console.log('ticket', ticket)
      var signature = calcSignature(ticket, nonceStr, ts, url);

      cachedSignatures[url] = {
        nonceStr: nonceStr
        , appid: appid
        , timestamp: ts
        , signature: signature
        , url: url
      };

      responseWithJson(res, {
        nonceStr: nonceStr
        , timestamp: ts
        , appid: appid
        , signature: signature
        , url: url
      });
    });
  });
};

// 通过请求中带的index值来判断是公司运营的哪个公众平台
app.post('/rsx/:index', function (req, res) {
  var index = req.params.index;
  var _url = req.body.url;
  console.log('->', _url);
  var signatureObj = cachedSignatures[_url];

  if (!_url) {
    return errorRender(res, '缺少url参数');
  }

  // 如果缓存中已存在签名，则直接返回签名
  if (signatureObj && signatureObj.timestamp) {
    var t = createTimeStamp() - signatureObj.timestamp;
    console.log(signatureObj.url, _url);
    // 未过期，并且访问的是同一个地址
    // 判断地址是因为微信分享出去后会额外添加一些参数，地址就变了不符合签名规则，需重新生成签名
    if (t < expireTime && signatureObj.url == _url) {
      console.log('======== result from cache ========');
      return responseWithJson(res, {
        nonceStr: signatureObj.nonceStr
        , timestamp: signatureObj.timestamp
        , appid: signatureObj.appid
        , signature: signatureObj.signature
        , url: signatureObj.url
      });
    }
    // 此处可能需要清理缓存当中已过期的数据
  }


  // 获取微信签名所需的access_token
  https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appIds[index].appid + '&secret=' + appIds[index].secret, function (_res) {
    var str = '';
    _res.on('data', function (data) {
      str += data;
    });
    _res.on('end', function () {
      console.log('return access_token:  ' + str);
      try {
        var resp = JSON.parse(str);
      } catch (e) {
        return errorRender(res, '解析access_token返回的JSON数据错误', str);
      }

      getTicket(_url, index, res, resp);
    });
  })

});
