// 此插件是为了简化页面分页加载流程

import loading from './loadingUtils';

const START_PAGE = 1;
export default {
  START_PAGE: START_PAGE,
  initPage: function(pageSize = 20){
    return {
      loadingState: 0,//页面状态
      start_page: START_PAGE,//当前页码
      count: pageSize,//页面大小
      total: 0,
      last_index: 0,//数据指针
      records: []
    }
  },
  updatePage: function(pageModel, response, appendList = false){//更新页面数据(最后一个参数，是否追加结果)
    pageModel.start_page = response.start_page || pageModel.start_page;
    pageModel.count = response.count || pageModel.count ;
    pageModel.total = response.total || pageModel.total;
    pageModel.last_index = response.last_index || pageModel.last_index;
    if(appendList){
      if(response.records.length > 0){
        pageModel.records.push.apply(pageModel.records, response.records);
      }
    }else{
      pageModel.records = response.records || [];
    }
  },
  getToPageModel: function(pageModel, pageNumber, pageSize){//页面切换
    return {
      start_page: pageNumber || pageModel.start_page,
      last_index: pageModel.last_index,
      count: pageSize || pageModel.count
    }
  },
  start(page, queryModel){//页面遮罩[page, queryModel]
    if(page.records.length > 0){
      loading.open();
    }
    if(queryModel == undefined){
      page.loadingState = 0;
    }

  },
  end(page, loadingState){
    if(page){
      page.loadingState = loadingState;
    }
    loading.close();
  }
}
