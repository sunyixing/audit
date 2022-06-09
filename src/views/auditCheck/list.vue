<template title="取证单列表">
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <div style="float:left">
              <span>取证单列表</span>
            </div>
          </div>
            <div class="btn-wrap clearfix">
              <!-- <div style="float:left" class="btn">
                <el-button type="primary" @click="EditAccounts('')">新增审计方法</el-button>
              </div> -->
              <div style="float:right;">
                <el-input :placeholder="selectType==1?'请输入项目名称':''" v-model="selectWord" class="input-with-select" style="width:360px;" @keyup.enter.native="handleCurrentChange(1)">
                  <el-select v-model="selectType" slot="prepend" placeholder="请选择" style="width:125px;" >
                    <el-option label="项目名称" :value=1></el-option>
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
              <el-table-column prop="projectName" label="项目名称" min-width="120" >
              </el-table-column>
              <el-table-column prop="auditObject" label="审计对象" min-width="120">
              </el-table-column>
              <el-table-column prop="auditMatters" label="审计事项" min-width="120">
              </el-table-column>
              <el-table-column prop="cacsMeth.cacsName" label="审计方法" min-width="140">
              </el-table-column>
              <el-table-column prop="createUser" label="制单人" min-width="100">
              </el-table-column>
              <el-table-column prop="createTime" label="生成时间" min-width="180">
                 <template slot-scope="scope">
                  {{changeDate(scope.row.createTime)}}
                </template>
              </el-table-column>

              <el-table-column label="操作" fixed="right" min-width="200" align="center">
                <template slot-scope="scope">
                   <el-button  type="text"   @click="lookcon(scope.row)"  style="color:#3546A4;">预览</el-button>
                   <el-button  type="text"   @click="gotourl(scope.row.chooseDataUri)"  style="color:#3546A4;">下载疑点</el-button>
                   <el-button  type="text"   @click="gotourl(scope.row.fileUri)"  style="color:#3546A4;">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          <div class="pagination">
            <el-pagination background @current-change="handleCurrentChange" :page-size="10"
              layout="total,prev, pager, next" :total="tableTotal" :current-page="cuPage">
            </el-pagination>
          </div>
          <el-dialog title="预览取证单" :visible.sync="dialogFormVisible">
          <div style="text-align:center;font-size:20px;font-weight:400;margin-bottom:20px">审 计 取 证 单</div>
          <el-form ref="form" :model="InfoForm" label-width="80px" style="border:1px solid #ddd">
            <el-form-item prop="projectName" label="项目名称：" style="border:1px solid #ddd;">
              <span style="padding-left: 20px;">
                {{InfoForm.projectName}}
              </span>
              
                  </el-form-item>
                  <!-- <el-form-item label="所属行业：" style="border:1px solid #ddd">
                    <span style="padding-left: 20px;">
                  {{InfoForm.industry}}
                </span>
                </el-form-item> -->
                <el-form-item prop="auditObject" label="被审查(调查)单位或个人：" style="border:1px solid #ddd">
                    <span style="padding-left: 20px;">
              {{InfoForm.auditObject}}
            </span>
                </el-form-item>
                <el-form-item prop="auditMatters" label="审查(调查)事项：" style="border:1px solid #ddd" label-width="140px">
                  <span style="padding-left: 20px;">
              {{InfoForm.auditMatters}}
            </span>
                </el-form-item>
                <el-form-item prop="auditSummary" label="审查(调查)事项摘要：" style="border:1px solid #ddd">
                  <span style="padding-left: 20px;">
              {{InfoForm.auditSummary}}
            </span>
                </el-form-item>
                <el-form-item label="审计人员(签名)：" style="border:1px solid #ddd">
                    <span style="padding-left: 20px;">
              {{InfoForm.createUser}}
            </span>
                </el-form-item>
                <el-form-item prop="auditSummary" label="证据提供单位意见：" style="border:1px solid #ddd">
                  <span style="padding-left: 20px;">
              <!-- {{InfoForm.auditSummary}} -->
              <div style="position:absolute;bottom:0px;right:20px">
                被审计单位（盖章）
              </div>
            </span>
                </el-form-item>
        </el-form>
        <div style="margin-top:14px">
          <span style="">
          审核人（签名）：
        </span>
        <span style="padding-left:100px">
        附件：
        </span>
        </div>
        
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button @click="closed()">关 闭</el-button>
        </div>
      </el-dialog>
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
        selectInduId : localStorage.getItem("selectInduId"),
        selectIndu : localStorage.getItem("selectIndu"),
        // options: [],

        //筛选项
        selectType:1,
        selectWord:'',
        //表格数据
        tableData: [
         
        ],
        tableTotal: 3,
        cuPage: 1,
        pageSize:10,
        dialogFormVisible:false,
        InfoForm:{
  
          createUser: localStorage.getItem('name'),
          industry:"",
          projectName: "",
          auditObject: "",
          auditMatters: "",
          auditSummary: "",
         }
        
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
      //获取行业配置
      // this.industrySet();
      // //初始化加载首页
      this.handleCurrentChange(1);
    },
    created(){

    },
    methods: {

      closed(){
        this.dialogFormVisible = false;
      },
      lookcon(item){
        this.InfoForm=item;
        this.dialogFormVisible=true;
      },
       gotourl(url){
        if(url.indexOf("https://")!=-1 || url.indexOf("http://")!=-1){
              window.open(url);
          }else{
              window.open("https://"+url);
          }
      },
      seesql(sql){
        this.$alert('<strong>'+sql+'</strong>', '查看sql', {
            dangerouslyUseHTMLString: true
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
                para.columnData.projectName=this.selectWord;
                break;
            default:
                ""
        }
        util.postData(api.checkAuditList, para, this).then(result => {
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
      // 分页导航
      handleCurrentChange(val) {
        this.cuPage=val;
        this.getList();
      },
    }
  };

</script>
