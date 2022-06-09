<template title="生成取证单">
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <div style="float:left">
              <span>生成取证单</span>
            </div>
          </div>
          <el-select v-model="checkvalue" placeholder="请选择字段" style="width:120px">
            <el-option
              v-for="item in tablename"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-select v-model="valuecal" placeholder="请选择逻辑" style="width:120px">
            <el-option
            label="等于"
              value="=">
            </el-option>
            <el-option
            label="不等于"
              value="!=">
            </el-option>
            <el-option
            label="大于"
              value=">">
            </el-option>
            <el-option
            label="小于"
              value="<">
            </el-option>
            <el-option
            label="大于等于"
              value=">=">
            </el-option>
            <el-option
            label="小于等于"
              value="<=">
            </el-option>
            
          </el-select>
          <el-input v-model="valueres" placeholder="请输入" style="width:120px"></el-input>
          <el-button @click="findData()" type="primary">筛选</el-button>
          <el-button @click="resetDateFilter" type="primary">清除条件</el-button>
          <el-table :data="gridData" style="margin-top:20px" @selection-change="handleSelectionChange" max-height="250">
            <el-table-column
              type="selection"
              >
            </el-table-column>
            <el-table-column
                      label="序号"
                      width="70px">
                  <template slot-scope="scope">
                      {{scope.$index+1}}
                  </template>
              </el-table-column>
            <template v-for="(item,index) in tablename">
                <el-table-column :prop="item" :label="item" :key="index" width="200px"></el-table-column>
            </template>
            <!-- <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="name" label="名称" width="200"></el-table-column>
            <el-table-column property="address" label="文号"></el-table-column>-->
          </el-table> 
          <div style="font-size: 12px;font-family: PingFangSC-Medium, PingFang SC;font-weight: 400;color: #474b64;margin:20px 0px 0px 14px">
            总记录 {{gridData.length}} 条，已选中 {{multipleSelection.length}} 条
          </div>
          <div  style="text-align:center;margin:40px 0px">
              <el-button @click="close()" >取消</el-button>
                <el-button @click="generDateFilter" type="primary">生成</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
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
        
        <el-button @click="download(InfoForm.chooseDataUri)" type="primary">下载疑点</el-button>
        <el-button @click="download(InfoForm.fileUri)" type="primary">下 载</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss"  scoped>
  >>>.el-form-item__label{
    border-right: 2px solid #ddd;
  }
  >>>.el-form-item{
    margin: 0;
  }
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
        id:this.$route.query.id,
        multipleSelection:[],
        tablename:[],
        checkvalue:'',
        tempId:'',
        valuecal:'',
        valueres:'',
        gridData: [],
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
      // //初始化加载首页
      this.findData();
    },
    created(){

    },
    methods: {
      resetDateFilter(){
        this.checkvalue='';
        this.valuecal='';
        this.valueres='';
        this.findData();

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
      },
     
      //筛选
      findData(){
        let filterColumnBean={
          cacsMeth:{id:this.id}
        };
        if(this.checkvalue && this.valuecal && this.valueres){
          filterColumnBean={
            cacsMeth:{id:this.id},
            columnName:this.checkvalue,
            expressions:this.valuecal,
            term:this.valueres,
          }
        }
        util.postData(api.fiflerSQL, filterColumnBean, this).then(result => {
          let res=result.result;
          this.gridData=res;
          console.log("-----");
          console.log(this.gridData);
           console.log(this.gridData[0]);
          for(var key in  this.gridData[0]){
                this.tablename.push(key);
            }
            console.log(this.tablename);
          
        }).catch(_ => {

        });
      },
      close(){
        this.$router.push("/auditCheck");
      },
      //生成
      generDateFilter(){
        let requestBean={
          cacsMethId:this.id,
          createUser:localStorage.getItem('name'),
          jsonArray:this.multipleSelection
        }
          util.postData(api.getSheet, requestBean, this).then(result => {
            this.$message({type: 'success',message: '生成成功',});
            this.InfoForm=result.result[0];
            this.dialogFormVisible = true;
          }).catch(_ => {

          });
      },
      closed(){
        this.dialogFormVisible = false;
        this.$router.push("/auditCheck");
      },
      download(url){
        if(url.indexOf("https://")!=-1 || url.indexOf("http://")!=-1){
              window.open(url);
          }else{
              window.open("https://"+url);
          }
      },
    }
  };

</script>
