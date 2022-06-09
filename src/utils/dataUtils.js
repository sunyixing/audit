/**
 * 数据操作工具类，目前已经实现
 *   1. 向 sessionStorage 读写数据
 *   2. 向 localStorage 读写数据
 */

export default {
  getSessionStorageItem(key){
    if(!key){
      return undefined;
    }else{
      var item = sessionStorage.getItem(key);
      if(item == undefined){
        return item;
      }else{
        return JSON.parse(item);
      }
    }
  },
  setSessionStorageItem(key, value){
    if(key){
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  },
  removeSessionStorageItem(key){
    if(key){
      sessionStorage.removeItem(key);
    }
  },
  getLocalStorageItem(key){
    if(!key){
      return undefined;
    }else{
      var item = localStorage.getItem(key);
      if(item == undefined){
        return item;
      }else{
        return JSON.parse(item);
      }
    }
  },
  setLocalStorageItem(key, value){
    if(key){
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  removeLocalStorageItem(key){
    if(key){
      localStorage.removeItem(key);
    }
  },
  isTest(){//判断当前是否是测试环境
    return ['localhost'].indexOf(window.location.hostname) != -1;
  }

}
