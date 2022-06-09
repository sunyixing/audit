import axios from 'axios'
import api from './apiConstant';

axios.defaults.baseURL = process.env.API_BASEURL;
// axios.defaults.withCredentials = true

// axios.interceptors.request.use(
//   config => {
//       let token =localStorage.getItem('token');;
//       if (token) {
//         config.headers.common['authorization'] =localStorage.getItem('token');
//         // config.headers.common['authorization'] ="swagger_token";
//       }
//       return config
//     },
//     err => {
//       return Promise.reject(err);
//     }
// )

export default {
  deleteData(url, params, obj) {
    let promiseFunc = (resove, reject) => {
      axios.get(url, {
        params: params
      }).then((resp) => {
        let result = resp.data;
        if (result.status == '200') {
          
          resove(result)
        } else{
          this.errMessage(obj, result.message);
          reject(result)
        }
      }).catch((err) => {
        if(err.response.status == '401') {
          this.errMessage(obj, '登录状态失效，请重新登录！');
          obj.$router.push({
              path: '/'
          });
        }
        reject()
      });
    }
    return new Promise(promiseFunc);
  },
  getData(url, params, obj) {
    let promiseFunc = (resove, reject) => {
      axios.get(url, {
        params: params
      }).then((resp) => {
        let result = resp.data;
        if (result.status == '200') {
          // if(resp.headers['authorization']!=undefined){
          //   localStorage.setItem('token',resp.headers['authorization']);
          // }
          resove(result)
        } else{
          this.errMessage(obj, result.message);
          reject(result)
        }
      }).catch((err) => {
        if(err.response.status == '401') {
          this.errMessage(obj, '登录状态失效，请重新登录！');
          obj.$router.push({
              path: '/'
          });
        }
        reject()
      });
    }
    return new Promise(promiseFunc);
  },
  postData(url, params, obj) {
    let promiseFunc = (resove, reject) => {
      axios.post(url, params).then((resp) => {
        console.log(resp);
        let result = resp.data;
        
        if (result.status == '200' || result.status == '400') {
          
         
          resove(result)
          
        } else {
          this.errMessage(obj, result.message);
          reject(result)
        }
      }).catch((err) => {
        if(err.response.status == '401') {
          this.errMessage(obj, '登录状态失效，请重新登录！');
          obj.$router.push({
              path: '/'
          });
        }else
        if(err.response.status == '500') {
          this.errMessage(obj, '系统异常');
        }
      });
    }
    return new Promise(promiseFunc);
  },
  postDataLogin(url, params, obj) {
    let promiseFunc = (resove, reject) => {
      axios.post(url, params).then((resp) => {
        let result = resp.data;
        if (result.code == '0') {
          if(resp.headers['authorization']!=undefined){
            localStorage.setItem('token',resp.headers['authorization']);
          }
          resove(result)
          
        }else if (result.code == '1001'){
          this.errMessage(obj, '登录状态失效，请重新登录！');
          if(window.location.href.indexOf("login") == -1 ){
            obj.$router.push({
              path: '/login'
            });
          }
        }  else {
          this.errMessage(obj, result.message);
          reject(result)
        }
      }).catch((err) => {
        if(err.response.status == '401') {
          this.errMessage(obj, '登录状态失效，请重新登录！');
          obj.$router.push({
              path: '/'
          });
        }else
        if(err.response.status == '500') {
          this.errMessage(obj, '系统异常');
        }
      });
    }
    return new Promise(promiseFunc);
  },
  exportExcel(url, param) {
    var paramStr = '';
    if (param != null && param != {}) {
      for (var i in param) {
        paramStr += "&" + i + "=" + encodeURI(param[i]);
      }
    }
    window.location.href = process.env.API_BASEURL + url + "?" + paramStr;
  },
  confirm(obj, message, callback) {
    obj.$confirm(message, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      callback();
    }).catch(() => {});
  },
  errMessage(obj, message, duration) {
    var param = {
      dangerouslyUseHTMLString: true,
      message: message,
      type: 'error'
    }
    if(duration != undefined) {
      param.duration = duration;
      param.showClose = true;
    }
    obj.$message(param)
  },
  sucMessage(obj, message) {
    obj.$message({
      message: message,
      type: 'success'
    })
  },
  validPhone(phone) {
    const reg = /^1\d{10}$/
    return reg.test(phone)
  },
  checkPhone(obj, value) {
    if (!value || !this.validPhone(value)) {
      this.errMessage(obj, '手机号格式错误');
      return false;
    }
    return true;
  },
  checkInteger(value) {
    if (value) {
      if (!/[^\d]/g.test(value)) {
        return true;
      }
    }
    return false;
  },
  checkPosInt(value) {
    if (value) {
      if (/^\d+$/.test(value)) {
        return true;
      }
    }
    return false;
  },
  checkPosNumber(value) {
    if (value) {
      if (/^(\d+)(\.\d+)?$/.test(value)) {
        return true;
      }
    }
    return false;
  },
  checkNumber(value) {
    if (value) {
      if (/^(-?\d+)(\.\d+)?$/.test(value)) {
        return true;
      }
    }
    return false;
  },

  isNull(value){
    if(value!='' && value!=null){
      return false;
    }
    return true;
  },
  //设置cookie,增加到vue实例方便全局调用
  setCookie (c_name, value, expiredays) {
      let exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  },
  //获取cookie、
  getCookie(name) {
      let arr; 
      let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg))
      return (arr[2]);
      else
      return null;
  },
  //处理权限
  setAuth(path,obj){
    let id=localStorage.getItem("id");
    this.postData(api.userMenuTree+'/'+id, {}, this).then(result => {
          let authArr=[];
          result.data.forEach(item => {
            if(item.checked==true){
              authArr.push(item.path);
            }
          })
          localStorage.setItem("authMenu",authArr);
          if (localStorage.getItem("authMenu").indexOf(path.replace("/",""))==-1) { // 判断当前的权限是否存在 ；
          obj.$router.push({
            path: '/index'
          });
        }
    }).catch(_ => {})
  },
  //处理日期
  format(Date,str){
    var obj = {
      Y: Date.getFullYear(),
      M: Date.getMonth() + 1,
      D: Date.getDate(),
    }
    // 拼接时间 hh:mm:ss
    // var time = ' ' +supplement(obj.H) + ':' + supplement(obj.Mi) + ':' + supplement(obj.S);
    // yyyy-mm-dd
    if(str.indexOf('-') > -1){
      return obj.Y + '-' + this.supplement(obj.M) + '-' + this.supplement(obj.D);
    }
    // yyyy/mm/dd
    if(str.indexOf('/') > -1){
      return obj.Y + '/' + this.supplement(obj.M) + '/' + this.supplement(obj.D);
    }
  },
  //处理时间
  formatT(Date,str){
    var obj = {
      Y: Date.getFullYear(),
      M: Date.getMonth() + 1,
      D: Date.getDate(),
      H:Date.getHours(),
      Mi:Date.getMinutes(),
      S:Date.getSeconds()
    }
    // 拼接时间 hh:mm:ss
    var time = ' ' +this.supplement(obj.H) + ':' + this.supplement(obj.Mi) + ':' + this.supplement(obj.S);
    // yyyy-mm-dd
    if(str.indexOf('-') > -1){
      return obj.Y + '-' + this.supplement(obj.M) + '-' + this.supplement(obj.D) +time;
    }
    // yyyy/mm/dd
    if(str.indexOf('/') > -1){
      return obj.Y + '/' + this.supplement(obj.M) + '/' + this.supplement(obj.D) +time;
    }
  },
  // 位数不足两位补全0
  supplement(nn){
    return nn = nn < 10 ? '0' + nn : nn;
  },
  //获取前一个月
  formatLastMonth(Date,str){
    Date.setMonth(Date.getMonth()-1);
    var obj = {
      Y: Date.getFullYear(),
      M: Date.getMonth() + 1,
      D: Date.getDate(),
    }
    
    if(str.indexOf('-') > -1){
      return obj.Y + '-' + this.supplement(obj.M) + '-' + this.supplement(obj.D);
    }
    // yyyy/mm/dd
    if(str.indexOf('/') > -1){
      return obj.Y + '/' + this.supplement(obj.M) + '/' + this.supplement(obj.D);
    }
  },
  //获取前n个月
  getMonthQ(date,month) {
    var time = new Date(date);
    time.setMonth(time.getMonth() - month);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return y + "-" + m + '-' + d;
  },
  getMonthH(date,month) {
    var time = new Date(date);
    time.setMonth(time.getMonth() + month);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return y + "-" + m + '-' + d;
  }

}
