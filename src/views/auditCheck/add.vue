<template title="生成审计方法">
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <div style="float:left">
              <span>{{pagename}}</span>
            </div>
          </div>
          <div v-if="state==1">
            <el-form :model="InfoForm"  ref="InfoForm" :rules="rules" label-width="100px"  size="medium" >
              <el-form-item prop="cacsName" label="方法名称：" >
                <el-input v-model="InfoForm.cacsName" placeholder="请输入方法名称" style="width:276px" ></el-input>
              </el-form-item>
               <el-form-item prop="cacsDesc" label="方法描述：" >
                <el-input v-model="InfoForm.cacsDesc" placeholder="请输入方法描述" style="width:276px"></el-input>
              </el-form-item>
              <el-form-item prop="chooseTest" label="法规文本：" >
                <el-input v-model="InfoForm.chooseTest" placeholder="请输入法规文本" style="width:276px"></el-input>
                <a @click="toTest()"   style="padding-left:20px;cursor: pointer;color:blue" >查看法规正文</a>
              </el-form-item>
              <el-form-item prop="databaseInfoId" label="数据库：" >
                <el-select v-model="InfoForm.databaseInfoId" placeholder="请选择数据库">
                  <el-option
                    v-for="item in databaseInfo"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="执行sql" prop="mathSql">
                <el-input type="textarea" v-model="InfoForm.mathSql" placeholder="输入执行sql" :rows="4" style="width:350px" resize="none"  show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="">
              <el-button @click="testSql()" >测试sql</el-button> 
              <a style="padding-left:20px;color:green" v-if="sqlstate==1">测试通过</a>
              <a style="padding-left:20px;color:red" v-if="sqlstate==0">测试失败</a>
              </el-form-item>
            </el-form>
            <el-form style="padding:12px 0px 0">
              <el-form-item style="text-align:center">
                  <span style="color:#E79820">提示：请确保信息准确无误</span>
              </el-form-item>
              <el-form-item  style="text-align:center">
                <el-button @click="close()" >取消</el-button>
                <el-button  @click="next()" type="primary">下一步</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-if="state==2">
            <el-form :model="InfoFormNext"  ref="InfoFormNext" :rules="nextrules" label-width="200px"  size="medium" >
              <el-form-item prop="projectName" label="项目名称：" >
                <el-autocomplete
                  v-model="InfoFormNext.projectName"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入项目名称"
                  @select="handleSelect"
                  style="width:276px"
                ></el-autocomplete>
                <!-- <el-input v-model="InfoFormNext.projectName" placeholder="请输入项目名称" style="width:276px"></el-input> -->
              </el-form-item>
               <el-form-item prop="auditObject" label="被审查(调查)单位或个人：" >
                <el-input v-model="InfoFormNext.auditObject" placeholder="请输入被审查(调查)单位或个人" style="width:276px"></el-input>
              </el-form-item>
              <el-form-item prop="auditMatters" label="审查(调查)事项：" >
                <el-input v-model="InfoFormNext.auditMatters" placeholder="请输入审查(调查)事项" style="width:276px"></el-input>
              </el-form-item>
              <el-form-item prop="auditSummary" label="审查(调查)事项摘要：" >
                <el-input type="textarea" v-model="InfoFormNext.auditSummary" placeholder="输入审查(调查)事项摘要" :rows="4" style="width:350px" resize="none"  show-word-limit></el-input>
              </el-form-item>
            </el-form>
            <el-form style="padding:12px 0px 0">
              <el-form-item style="text-align:center">
                  <span style="color:#E79820">提示：请确保信息准确无误</span>
              </el-form-item>
              <el-form-item  style="text-align:center">
                <el-button @click="last()" >上一步</el-button>
                <el-button  @click="createfrom()" type="primary">生成</el-button>
              </el-form-item>
            </el-form>
          </div>  
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>
<style lang="scss"  scoped>
table{  text-align:center;border-collapse: collapse; padding:0; margin:0; }
	.outTable{width: 100%;height: 500px;margin-bottom: 40px;}
	.inTable{ width:100%; height:100%;}
	.outTable td{border: 1px solid rgba(31, 44, 119, 0.1)}	
	.div{ width:100%; height:500px;}
</style>
<script>
  import util from "../../utils";
  import api from '../../utils/apiConstant';
  export default {
    beforeRouteEnter: function (to, from, next) {
      next(function (vm) {
        // util.setAuth(to.path,vm);
      });
    },
    data() {
      return {
        valeSerch:'',
        tableData: [],

        databaseInfo:[],
        InfoForm:{
          databaseInfoId:'',
          mathSql:'',
          cacsDesc: '',
          cacsName: '',
          createUser: localStorage.getItem('name'),
          databaseInfo: {id:''},
          regulatoryDocuments: {
            id: "",
          },
          chooseTest:'',
          id: "",
          industryId: localStorage.getItem("selectInduId"),      
          remarks: '',
          updateTime: "",
          updateUser: localStorage.getItem('name'),
          createUser: localStorage.getItem('name'),
          projectName: "",
          auditObject: "",
          auditMatters: "",
          auditSummary: "",
        },
        InfoFormNext:{
          projectName: "",
          auditObject: "",
          auditMatters: "",
          auditSummary: "",
        },

        id:this.$route.query.id,
        auditid:this.$route.query.auditid,
        url:this.$route.query.url,
        pagename:'添加审计方法',
        savename:"确认添加",
        sqlstate:-1,
        state:1,
        rules: {
          cacsName: [{
              required: true,
              message: '请输入方法名称',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 20,
            //   message: '长度在 2 到 20个字符',
            //   trigger: 'blur'
            // }
          ],
          cacsDesc: [{
              required: true,
              message: '请输入方法描述',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 50,
            //   message: '长度在 2 到 50个字符',
            //   trigger: 'blur'
            // }
          ],
          chooseTest: [{
              required: true,
              message: '请输入法规文本',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 50,
            //   message: '长度在 2 到 50个字符',
            //   trigger: 'blur'
            // }
          ],
          databaseInfoId: [{
              required: true,
              message: '请选择数据库',
              trigger: 'change'
            }
          ],
          mathSql: [{
              required: true,
              message: '请输入执行sql',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 200,
            //   message: '长度在 2 到 100个字符',
            //   trigger: 'blur'
            // }
          ],
          
        },
        nextrules:{
          projectName: [{
              required: true,
              message: '请输入项目名称',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 20,
            //   message: '长度在 2 到 20个字符',
            //   trigger: 'blur'
            // }
          ],
          auditObject: [{
              required: true,
              message: '请输入被审查(调查)单位或个人',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 20,
            //   message: '长度在 2 到 20个字符',
            //   trigger: 'blur'
            // }
          ],
          auditMatters: [{
              required: true,
              message: '请输入审查(调查)事项',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 50,
            //   message: '长度在 2 到 50个字符',
            //   trigger: 'blur'
            // }
          ],
          auditSummary: [{
              required: true,
              message: '输入审查(调查)事项摘要',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 200,
            //   message: '长度在 2 到 100个字符',
            //   trigger: 'blur'
            // }
          ],
          
        },
      };
    },
    watch: {
    },
    mounted() {
      this.getDatabaseInfo();
      this.getFucList();
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
      if(!this.id){
        this.pagename="生成审计方法";
        this.savename="确认生成";
      }else{
        this.getListById();
        this.pagename="编辑审计方法";
        this.savename="确认编辑";
      }      
    },
    created(){

    },
    methods: {
      getListById(){
        util.getData(api.getCacsMethById+"?id="+this.id, {}, this).then(result => {
          let res=result.result;
          this.InfoForm=res;
          this.InfoFormNext.projectName=this.InfoForm.projectName;
          this.InfoFormNext.auditObject=this.InfoForm.auditObject;
          this.InfoFormNext.auditMatters=this.InfoForm.auditMatters;
          this.InfoFormNext.auditSummary=this.InfoForm.auditSummary;
          this.InfoForm.databaseInfoId=this.InfoForm.databaseInfo.id;
          this.auditid=this.InfoForm.regulatoryDocuments.id;
        }).catch(_ => {

        });
        
      },
      handleSelect(item) {
        console.log(item);
        this.InfoFormNext=item;
        this.InfoFormNext.projectName=item.value;
        
      },
      getFucList(){
        let para={
          page:1,
          pageSize:200,
          columnData:{}
        };
        para.columnData.industryId=this.selectInduId;
        util.postData(api.getCacsMeth, para, this).then(result => {
          let res=result.result;
          console.log("rweewrewvszzzcxz");
          console.log(res.content);
          this.tableData=[];
          this.tableData = this.changeTreeDate(res.content, 'value', 'projectName');
        }).catch(_ => {

        });
      },
      querySearchAsync(queryString, cb) {
        var tableData = this.tableData;
        console.log("1234567");
        console.log(this.tableData);
        var results = queryString ? tableData.filter(this.createStateFilter(queryString)) : tableData;
        console.log(results);
        cb(results);
      },
      createStateFilter(queryString) {
        return (value) => {
          return (value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      /**
      * params date <array> 需要修改的json格式的数组
      * params newKey <string> 需要修改成的key值
      * params oldKey <string> 需要被修改的key值
      */
      changeTreeDate(zf_jsonObj, newKey, oldKey) {
        let str = JSON.stringify(zf_jsonObj);
        let reg = new RegExp(oldKey, 'g');
        let newStr = str.replace(reg, newKey);
        return JSON.parse(newStr);
      },
      toTest(){
        if(this.url.indexOf("https://")!=-1 || this.url.indexOf("http://")!=-1){
              window.open(this.url);
            }else{
              window.open("https://"+this.url);
            }
      },
      //获取数据库
      getDatabaseInfo(){
        util.getData(api.getDatabaseInfo, {}, this).then(result => {
            this.databaseInfo=result.result;
        }).catch(_ => {

        });
      },
      last: function () {
       this.pagename="生成审计方法";
       this.state=1;
      },
      next: function () {
        console.log("rewrewte");
        console.log(this.tableData);
        this.$refs['InfoForm'].validate((valid) => {
          if(valid){
            if(this.sqlstate==1){
              this.pagename="配置取证模版";
              this.state=2;
            }else{
              this.$message({type: 'error',message: '请重新检查sql！',});
            }
            
          }
      });

      },
      createfrom: function () {
        this.$refs['InfoFormNext'].validate((valid) => {
            if(valid){
              this.InfoForm.projectName=this.InfoFormNext.projectName;
              this.InfoForm.auditObject=this.InfoFormNext.auditObject;
              this.InfoForm.auditMatters=this.InfoFormNext.auditMatters;
              this.InfoForm.auditSummary=this.InfoFormNext.auditSummary;
              this.InfoForm.databaseInfo.id=this.InfoForm.databaseInfoId;
              this.InfoForm.regulatoryDocuments.id=this.auditid;
              util.postData(api.saveCacsMeth, this.InfoForm, this).then(result => {
                  this.$message({type: 'success',message: '提交成功',});
                  this.$router.push("/auditCheck");
                }).catch(_ => {
                });
            }
        });
      },
      //关闭
      close: function () {
        if(this.source){
          this.$router.push("/lawList");
        }else{
          this.$router.push("/auditCheck");
        }
       
      },
      //测试sql
      testSql: function () {
        if(this.InfoForm.databaseInfoId && this.InfoForm.mathSql){
          this.InfoForm.databaseInfo.id=this.InfoForm.databaseInfoId;
          let para={
            mathSql:this.InfoForm.mathSql,
            databaseInfo:this.InfoForm.databaseInfo,
          }
          util.postData(api.testSQL,para, this).then(result => {
            if(result.status==400){
              this.$message({type: 'error',message: result.message});
              this.sqlstate=0;
            }else{
              this.sqlstate=1;
            }
          }).catch(_ => {
          });
        }else{
          this.$message({type: 'error',message: '请填写数据库信息！',});
        }
        
      },
      
    }
  };

</script>
