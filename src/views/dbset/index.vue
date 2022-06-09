<template title="数据哭列表">
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <div style="float:left">
              <span>数据库列表</span>
            </div>
          </div>
            <div class="btn-wrap clearfix">
              <div style="float:left" class="btn">
                <el-button type="primary" @click="EditAccounts('')">新增数据库</el-button>
              </div>
              <div style="float:right;">
                <el-input placeholder="请输入数据库名称" v-model="selectWord" class="input-with-select" style="width:360px;" @keyup.enter.native="handleCurrentChange(1)">
                  <el-select v-model="selectType" slot="prepend" placeholder="请选择" style="width:125px;" >
                    <el-option label="数据库名称" :value=1></el-option>
                  </el-select>
                  <el-button slot="append" type="primary"  @click="handleCurrentChange(1)">搜索</el-button>
                </el-input>                
              </div>
            </div>
            <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F1F2F9',color:'#474B64',fontSize: '14px',height:'48px',opacity: '0.7',fontFamily: 'PingFangSC-Regular, PingFang SC',fontWeight: '400'}">
              <el-table-column prop="name" label="数据库名称" min-width="120"  >
              </el-table-column>
              <el-table-column prop="schemaName" label="数据库名称" min-width="120"  >
              </el-table-column>
              <el-table-column prop="databaseType" label="数据库类型" min-width="120">
              </el-table-column>
              <el-table-column prop="databaseIp" label="ip" min-width="120">
              </el-table-column>
              <el-table-column prop="industry" label="行业" min-width="120">
              </el-table-column>
              <el-table-column prop="updateTime" label="更新时间" min-width="160">
                <template slot-scope="scope">
                  {{changeDate(scope.row.updateTime)}}
                </template>
              </el-table-column>
              <el-table-column prop="updateUser" label="操作人" min-width="120">
              </el-table-column>
              <el-table-column prop="remarks" label="备注" min-width="120">
              </el-table-column>
              <el-table-column label="操作" fixed="right" min-width="120" align="center">
                <template slot-scope="scope">
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
        //筛选项
        selectType:1,
        selectWord:'',



        tableData:[{}],
        tableTotal: 0,
        cuPage: 1,
        pageSize:10,
        
      };
    },
    watch: {
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
      // //初始化加载首页
      this.handleCurrentChange(1);
    },
    created(){

    },
    methods: {
      //获取用户列表
      getList(){
        // let para={
        //   page:this.cuPage,
        //   pageSize:this.pageSize,
        //   columnData:{}
        // };
        // this.selectWord=this.selectWord.replace(/^\s+|\s+$/g,"");
        // switch(this.selectType)
        // {
        //     case 1:
        //         para.columnData.supplierName=this.selectWord;
        //         break;
        //     case 2:
        //         para.columnData.supplierPhone=this.selectWord;
        //         break;
        //     default:
        //         ""
        // }
        util.getData(api.getDatabaseInfo, {}, this).then(result => {
          let res=result.result;
          this.tableData=res;
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
            name: "dbadd",
            query: {id:id}  
        });
      },
      // 新建法规
      EditCheck: function (id) {
        this.$router.push({
            name: "dbadd",
            query: {id:id}  
        });
      },
      // // 编辑供应商
      // EditAccounts: function (id) {
      //   this.$router.push({
      //       name: "agentListAdd",
      //       query: {id:id}  
      //   });
      // },
      delte:function(id){
        // util.getData(api.deleteDatabaseById, {id:id}, this).then(result => {
        //   if(result.result!="关联数据为空"){
            
        //   }else{
        //     this.$message({
        //           type: 'error',
        //           message: '供应商存在关联的原材料，禁止删除!'
        //     });
        //   }
        // }).catch(_ => {

        // });
        this.$confirm('是否删除数据库？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              util.getData(api.deleteDatabaseById, {id:id}, this).then(result => {
                this.handleCurrentChange(1);
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                 
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
