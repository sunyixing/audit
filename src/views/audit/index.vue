<template title="供应商列表">
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <div style="float:left">
              <span>法规正文</span>
            </div>
          </div>
            <div class="btn-wrap clearfix">
              <div style="float:left" class="btn">
                <el-button type="primary" @click="EditAccounts('')">新增法规文件</el-button>
              </div>
              <div style="float:right;">
                <!-- <el-select v-model="selectIndu" placeholder="请选择行业">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select> -->
                <el-input placeholder="请输入文件名称" v-model="selectWord" class="input-with-select" style="width:360px;" @keyup.enter.native="handleCurrentChange(1)">
                  <el-select v-model="selectType" slot="prepend" placeholder="请选择" style="width:125px;" >
                    <el-option label="文件名称" :value=1></el-option>
                    <el-option label="文件编号" :value=2></el-option>
                  </el-select>
                  <el-button slot="append" type="primary"  @click="handleCurrentChange(1)">搜索</el-button>
                </el-input>                
              </div>
            </div>
            <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F1F2F9',color:'#474B64',fontSize: '14px',height:'48px',opacity: '0.7',fontFamily: 'PingFangSC-Regular, PingFang SC',fontWeight: '400'}">
              <el-table-column
                      label="序号"
                      width="70px">
                  <template slot-scope="scope">
                      {{scope.$index+1+(cuPage-1)*10}}
                  </template>
              </el-table-column>
              <el-table-column prop="name" label="法规文件名称" min-width="120" >
              </el-table-column>
              <el-table-column prop="documentNumber" label="法规文件编号" min-width="120">
              </el-table-column>
              <!-- <el-table-column prop="industry" label="行业" min-width="120">
              </el-table-column> -->
              <el-table-column prop="startTime" label="启用日期" min-width="120">
              </el-table-column>
              <el-table-column prop="nullifyTime" label="作废日期" min-width="120">
              </el-table-column>
              <el-table-column prop="source" label="来源" min-width="120">
                 <template slot-scope="scope">
                  {{scope.row.source==1?'本地上传':'网页来源'}}
                </template>
              </el-table-column>
              <!-- <el-table-column prop="updateTime" label="更新时间" min-width="160">
                <template slot-scope="scope">
                  {{changeDate(scope.row.updateTime)}}
                </template>
              </el-table-column>
              <el-table-column prop="updateUser" label="操作人" min-width="120">
              </el-table-column>
              <el-table-column prop="remarks" label="备注" min-width="120">
              </el-table-column> -->
              <el-table-column label="操作" fixed="right" min-width="120" align="center">
                <template slot-scope="scope">
                  <el-button  type="text"   @click="seeUrl(scope.row.sourceUrl)" style="color:#3546A4;">查看原文</el-button>
                  <el-button  type="text"   @click="creatCheck(scope.row.id,scope.row.sourceUrl)" style="color:#3546A4;">生成审计方法</el-button>
                  <el-button  type="text"   @click="EditAccounts(scope.row.id)" style="color:#3546A4;">编辑</el-button>
                  <el-button  type="text"   @click="delte(scope.row.id)" style="color:#3546A4;">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          <div class="pagination">
            <el-pagination background @current-change="handleCurrentChange" :page-size="10"
              layout="total,prev, pager, next" :total="tableTotal" :current-page="cuPage">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>
<style lang="scss"  scoped>
</style>
<script>
  import util from "../../utils/";
  import api from '../../utils/apiConstant';
  export default {
    beforeRouteEnter: function (to, from, next) {
      next(function (vm) {
        // util.setAuth(to.path,vm);
      });
    },
    data() {
      return {
        // options: [],
        // value: '',
        //筛选项
        selectType:1,
        selectWord:'',
        selectInduId : localStorage.getItem("selectInduId"),
        selectIndu : localStorage.getItem("selectIndu"),


        tableData:[],
        tableTotal: 0,
        cuPage: 1,
        pageSize:10,
        
      };
    },
    watch: {
      // selectIndu: function (newVal) { 
      //  this.handleCurrentChange(1);
      // },
      selectType: function (newVal) { 
        this.selectWord='';
      },
    },
    mounted() {
      // if(this.$route.meta.id!=undefined || this.$route.meta.id!=null){
      //   //获取页面权限
      //   util.postData(api.btnGet+'/'+localStorage.getItem('id')+'/'+this.$route.meta.id, {}, this).then(result => {
      //     result.data.map(item =>{
      //       this.$set(this.authBtn,item.path , true);
      //     })
      //     console.log(this.authBtn);
      //   }).catch(_ => {});
      // }
      //获取行业配置
      // this.industrySet();
      // //初始化加载首页
      this.handleCurrentChange(1);
      
    },
    created(){

    },
    methods: {
      //获取行业配置
      // industrySet(){
      //   util.getData(api.getIndustry, {}, this).then(result => {
      //     this.options=result.result;
           
      //   }).catch(_ => {

      //   });
      // },
      //获取用户列表
      getList(){
        let para={
          page:this.cuPage,
          pageSize:this.pageSize,
          columnData:{}
        };
        para.columnData.industryId=this.selectInduId;
        this.selectWord=this.selectWord.replace(/^\s+|\s+$/g,"");
        switch(this.selectType)
        {
            case 1:
                para.columnData.name=this.selectWord;
                break;
            case 2:
                para.columnData.documentNumber=this.selectWord;
                break;
            default:
                ""
        }
        util.postData(api.getRegulatory, para, this).then(result => {
          let res=result.result;
          this.tableData=res.content;
          this.tableTotal=res.totalElements;
        }).catch(_ => {

        });
      },
      //处理日期
      changeDate(date){
        return util.formatT(new Date(date),'-');
      },
      // 新建法规
      EditAccounts: function (id) {
        this.$router.push({
            name: "addlaw",
            query: {id:id}  
        });
      },
      seeUrl(url){
         if(url.indexOf("https://")!=-1 || url.indexOf("http://")!=-1){
              window.open(url);
          }else{
              window.open("https://"+url);
          }
      },
      // 生成审计方法
      creatCheck: function (id,url) {
        this.$router.push({
            name: "auditCheckAdd",
            query: {auditid:id,url:url}  
        });
      },
      delte:function(id){
         this.$confirm('是否删除法规文件？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              util.getData(api.deleteRegulatory, {id:id}, this).then(result => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                 this.handleCurrentChange(1);
              }).catch(_ => {

              });
            }).catch(() => {
              
            });
      },
      //清除数据
      clearData: function () {

      },
      // 分页导航
      handleCurrentChange(val) {
        this.cuPage=val;
        this.getList();
      },
    }
  };

</script>
