import dataUtils from './dataUtils';

String.prototype.count = function(char){
  if(char.length != 1){
    return -1;
  }
  var count = 0;
  for(var i=0; i< this.length; i++){
    var character = this.charAt(i);
    if(character == char){
      count++;
    }
  }

  return count;
};
function random_string(len) {
  len = len || 32;
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = chars.length;
  var pwd = '';
  for (var i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
let id = 0;
function get_suffix(filename) {
  var pos = filename.lastIndexOf('.')
  var suffix = ''
  if (pos != -1) {
    suffix = filename.substring(pos)
  }
  return suffix;
}

export default {
  getLength: function(str){
    /**
     * 获取输入的字符串长度
     * 规则:
     *  中文长度为2
     *  英文长度为1
     */
    var result = 0;
    if(!str || str.length == 0){
      /***/
    }else{
      for(var i=0; i<str.length; i++){
        if(str.charCodeAt(i) > 255){
          result += 2;
        }else{
          result +=1;
        }
      }
    }

    return result;
  },
  getRandomFileName: function(filename, extra){
    var timeStamp = new Date().getTime().toString();
    return timeStamp + random_string(10) + (extra ? extra : '') +  get_suffix(filename);
  },
  nextId: function(){
    id += 1;
    return id;
  },
  getRandomString: random_string,
  getSuffix: get_suffix,
  isInDev(){
    return dataUtils.isTest() || window.location.href.indexOf('debug') != -1;
  },
  uuid : function(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) {
          // Compact form
          for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
          var r;
          uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
          uuid[14] = '4';
          for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
              r = 0 | Math.random()*16;
              uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
          }
        }
        return uuid.join('');
    }
}
