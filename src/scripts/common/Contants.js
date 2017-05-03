//var ip = require('ip').address();
import  config  from '../../../devConfig';
console.log(config.CURRENT_IP);

export default {
  DOMAIN:'https://cailine.com',
  //WEEX_BASEPATH:'http://cailine.cdn/hi-wee/0.0.1/',
  WEEX_BASEPATH:'http://'+config.CURRENT_IP+':8080/dist/'
}