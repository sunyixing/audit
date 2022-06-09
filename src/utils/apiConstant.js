
var config = {

//登录
  login:'/user/login', //

//菜单

  //获取菜单树
  getMenuTree:'/permission/all', //
  
  

//系统设置

  //用户列表
  getUserList:'/user/all', //
  getUserListP:'/user/page_all', //
  saveUser:'/user/save', //
  deleteUser:'/user/deleteById', //
  getUserById:'/user/get', //
  getUserPermissionById:'/user_per_mapping/getbyUser', //
  changeUserPermissionById:'/user_per_mapping/change_status', //
  














  

  getRegulatory:'/regulatory/page_all', //
  saveRegulatory:'/regulatory/save', //
  // downRegulatory:'/regulatory/downloadFile',
  deleteRegulatory:'/regulatory/deleteById',
  getRegulatoryById:'/regulatory/get',
  
  
  getCacsMeth: '/cacsMeth/page_all',
  getCacsMethById: '/cacsMeth/get',
  saveCacsMeth:'/cacsMeth/generateCacsMeth',

  



  getDatabaseInfo:'/databaseInfo/all',
  saveDatabaseInfo:'/databaseInfo/save',
  getDatabaseById:'/databaseInfo/get',//
  deleteDatabaseById:'/databaseInfo/deleteById',
  testDatabaseInfo:'/databaseInfo/testDatabase',

  


  testSQL:'/cacsMeth/testSQL',
  fiflerSQL:'/cacsMeth/filterData',

  getSheet:'/cacsMeth/getSheet',
  checkAudit:'/sheet/sheetAudit',

  checkAuditList:'/sheet/page_all',

  deleteCacsMet:'/cacsMeth/deleteById',




  getIndustry: '/industry/all',
  saveIndustry:'/industry/save',
  getIndustryById:'/industry/get',
  deleteIndustry:'/industry/deleteById',




  reviewById:'/review/get',

  reviewAll:'review/all',
  reviewSave:'/review/save',
  reviewDeleteById:'/review/deleteById',
  
  allItem:'/review/data/all',
  addItem:'/review/data/save',
  deleteItem:'/review/data/deleteById',
  selfCheck:'/review/data/checkSelf',
  getRewById:'/review/data/get',
  reviewGetById:'/review/data/getByReviewsId',
  checkSelf:'/review/data/checkSelf',
  getAuditList:'/review/data/getCacsMethByUserId', 
  submitAudit:'/review/data/getFilePathByCacsId', 

  getALlByReviewsDataId:'/review/data/getALlByReviewsDataId',


  getByIndustryId:'review/getByIndustryId',


  getReviewsSheet:'/review/data/getReviewsSheet',
  deleteReviewSheet:'/review/data/deleteReviewDataFile',
  saveReviewsSheet:'/review/data/saveReviewsSheet',

  




  








  
  


  
  




};

module.exports = config;
