<template title="审计方法列表">
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <div style="float:left">
              <span>审计方法</span>
            </div>
          </div>
            <div class="btn-wrap clearfix">
              <!-- <div style="float:left" class="btn">
                <el-button type="primary" @click="EditAccounts('')">新增审计方法</el-button>
              </div> -->
              <div style="float:right;">

                
                <el-select v-model="selectState"  placeholder="审计事项" style="width:160px;" >
                    <el-option label="方法名称" :value=1></el-option>
                </el-select>
                <el-input :placeholder="selectType==1?'请输入方法名称':''" v-model="selectWord" class="input-with-select" style="width:360px;" @keyup.enter.native="handleCurrentChange(1)">
                  <el-select v-model="selectType" slot="prepend" placeholder="请选择" style="width:125px;" >
                    <el-option label="方法名称" :value=1></el-option>
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
              <el-table-column prop="cacsName" label="方法名称" min-width="120" >
              </el-table-column>
              <el-table-column prop="auditMatters" label="审计事项" min-width="120">
              </el-table-column>
              <el-table-column prop="cacsDesc" label="方法描述" min-width="140">
              </el-table-column>
              <!-- <el-table-column prop="databaseInfo.schemaName" label="数据库" min-width="120">
              </el-table-column> -->
              <el-table-column prop="chooseTest" label="法规条款" min-width="120">
              </el-table-column>
              <el-table-column prop="mathSql" label="执行sql" min-width="120">
                 <template slot-scope="scope">
                   <el-button type="text" @click="seesql(scope.row.mathSql)" style="color:#3546A4">查看sql</el-button>
                   <el-button type="text" @click="runsql(scope.row.mathSql,scope.row.databaseInfo)" style="color:#3546A4">执行sql</el-button>
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
                   <!-- <el-button  type="text"   @click="lookForm(scope.row.id)"  style="color:#3546A4;">预览取证单</el-button> -->
                   <el-button  type="text"   @click="creatForm(scope.row.id)" style="color:#3546A4;">生成取证单</el-button>
                  <el-button  type="text"   @click="check(scope.row.id)" style="color:#3546A4;">审核取证单</el-button>
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
    <el-dialog title="sql结果" :visible.sync="dialogFormVisible">
      <div>
        <el-table :data="gridData" style="margin-top:20px" max-height="250">
            <!-- <el-table-column
              type="selection"
              >
            </el-table-column> -->
            <template v-for="(item,index) in tablename">
                <el-table-column :prop="item" :label="item" :key="index" width="200px"></el-table-column>
            </template>
          </el-table> 
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="closed()">关 闭</el-button>
      </div>
    </el-dialog>
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

        dialogFormVisible:false,
         gridData: [],

        tablename:[],
        selectInduId : localStorage.getItem("selectInduId"),
        selectIndu : localStorage.getItem("selectIndu"),
        // options: [],

        //筛选项
        selectState:'',
        selectType:1,
        selectWord:'',
        //表格数据
        tableData: [
         
        ],
        tableTotal: 3,
        cuPage: 1,
        pageSize:10,
        // 表单字段
        InfoForm: {
          id: "",
          remarks: "",
          supplierName: "",
          supplierPhone: "",
          supplierAddress: "",
          updateTime: "",
          updateUser: localStorage.getItem('name'),
        },
        
      };
    },
    watch: {
      selectState: function (newVal) { 
        this.handleCurrentChange(1);
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
      //     this.selectIndu = this.options[0].id
      //   }).catch(_ => {

      //   });
      // },
      //
      seeAudit(url){
        windows.location.href=url;
      },
      seesql(sql){
        this.$alert('<strong>'+sql+'</strong>', '查看sql', {
            dangerouslyUseHTMLString: true
        });
      },
      runsql(mathSql,databaseInfo){
        //测试sql
          let para={
            mathSql:mathSql,
            databaseInfo:databaseInfo,
          }
          util.postData(api.testSQL,para, this).then(result => {
            if(result.status==400){
              this.$message({type: 'error',message: result.message});
            }else{
              this.gridData=result.result;
              for(var key in  this.gridData[0]){
                    this.tablename.push(key);
              }
              this.dialogFormVisible = true;
            }
          }).catch(_ => {
          });        
      },
      //取证单生成框
      creatForm(id){
        this.$router.push({
            name: "auditCheckCreated",
            query: {id:id}  
        })
      },
      //审核取证单
      check(id){
        this.$confirm('是否审核取证单？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              util.postData(api.checkAudit, {id:id}, this).then(result => {
                this.$message({
                  type: 'success',
                  message: '审核成功!'
                });
                 this.handleCurrentChange(1);
              }).catch(_ => {

              });
            }).catch(() => {
              
            });
      },
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
                para.columnData.cacsName=this.selectWord;
                break;
            default:
                ""
        }
        util.postData(api.getCacsMeth, para, this).then(result => {
          let res=result.result;
          this.tableData=res.content;
          this.tableTotal=res.totalElements;
        }).catch(_ => {

        });
      },
      closed(){
        this.dialogFormVisible = false;
      },
      //处理日期
      changeDate(date){
        return util.formatT(new Date(date),'-');
      },
      // 编辑审计方法
      EditAccounts: function (id,source,url) {
        this.$router.push({
            name: "auditCheckAdd",
            query: {id:id}  
        });
      },
      delte:function(id){
        this.$confirm('是否删除审计方法？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              util.getData(api.deleteCacsMet, {id:id}, this).then(result => {
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
