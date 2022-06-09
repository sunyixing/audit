<template title="新建数据库">
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <div style="float:left">
              <span>{{pagename}}</span>
            </div>
          </div>
            <el-form :model="InfoForm"  ref="InfoForm" :rules="rules" label-width="110px"  size="medium" >
              <el-form-item prop="name" label="名称：" >
                <el-input v-model="InfoForm.name" placeholder="请输入名称" style="width:276px" ></el-input>
              </el-form-item>
              <el-form-item prop="schemaName" label="schema：" >
                <el-input v-model="InfoForm.schemaName" placeholder="请输入schema" style="width:276px" ></el-input>
              </el-form-item>
              <el-form-item prop="databaseType" label="数据库类型：" >
                <el-select v-model="InfoForm.databaseType" placeholder="请选择类型">
                  <el-option
                    label="mysql"
                    value="mysql">
                    </el-option>
                     <el-option
                    label="oracle"
                    value="oracle">
                    </el-option>
                     <el-option
                    label="sqlserver"
                    value="sqlserver">
                    </el-option>
                </el-select>
              </el-form-item>
               <el-form-item prop="databaseIp" label="ip：" >
                <el-input v-model="InfoForm.databaseIp" placeholder="请输入ip" style="width:276px"></el-input>
              </el-form-item>
              <el-form-item prop="databasePort" label="端口号：" >
                  <el-input v-model="InfoForm.databasePort" placeholder="请输入端口号" style="width:276px"></el-input>
              </el-form-item>
              <el-form-item prop="databaseUser" label="用户名：" >
                  <el-input v-model="InfoForm.databaseUser" placeholder="请输入用户名" style="width:276px"></el-input>
              </el-form-item>
              <el-form-item prop="databasePassword" label="密码：" >
                  <el-input v-model="InfoForm.databasePassword" placeholder="请输入密码" style="width:276px"></el-input>
              </el-form-item>
              <el-form-item  label="测试数据库：" >
                <el-button @click="tesDB()" type="primary">测试数据库</el-button> 
                <a style="padding-left:20px;color:green" v-if="sqlstate==1">测试连接通过</a>
                <a style="padding-left:20px;color:red" v-if="sqlstate==0">测试连接失败</a>
              </el-form-item>
               <el-form-item label="备注">
                <el-input type="textarea" v-model="InfoForm.remarks" placeholder="输入备注" :rows="4" style="width:350px" resize="none" maxlength="200" show-word-limit></el-input>
              </el-form-item>
            </el-form>
            <el-form style="padding:12px 0px 0">
              <el-form-item style="text-align:left">
                  <span style="color:#E79820">提示：请确保信息准确无误</span>
              </el-form-item>
              <el-form-item  style="text-align:celeftnter">
                <el-button @click="close()" >取消</el-button>
                <el-button  @click="onSubmit()" type="primary">{{savename}}</el-button>
              </el-form-item>
            </el-form>
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
        sqlstate:'-1',
        id:this.$route.query.id,
        pagename:'新建数据库',
        savename:"确认添加",
        baseurl:"http://home.19951106.xyz:8999/file/uploadFile",
        // editflag: false,
        // 表单字段
        InfoForm:{
          name:'',
          schemaName: "",
          databaseType: "",
          databaseIp: "",
          databasePort: "",
          databaseUser: "",
          databasePassword: "",
          remarks: "",
          updateUser: localStorage.getItem('name'),
          createUser: localStorage.getItem('name'),
        },
        rules: {
          //合同编号校验
          name: [{
              required: true,
              message: '请输入数据库名称',
              trigger: 'blur'
          }],
          schemaName: [{
              required: true,
              message: '请输入schema',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 50,
            //   message: '长度在 2 到 50个字符',
            //   trigger: 'blur'
            // }
          ],

          databaseIp: [{
              required: true,
              message: '请输入数据库ip地址',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 50,
            //   message: '长度在 2 到 50个字符',
            //   trigger: 'blur'
            // }
          ],

          databasePort: [{
              required: true,
              message: '请输入数据库端口号',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 50,
            //   message: '长度在 2 到 50个字符',
            //   trigger: 'blur'
            // }
          ],

          databaseUser: [{
              required: true,
              message: '请输入数据库用户名',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 50,
            //   message: '长度在 2 到 50个字符',
            //   trigger: 'blur'
            // }
          ],

          databasePassword: [{
              required: true,
              message: '请输入数据库密码',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 50,
            //   message: '长度在 2 到 50个字符',
            //   trigger: 'blur'
            // }
          ],
          databaseType: [{
              required: true,
              message: '请选择数据库类型',
              trigger: 'change'
            }
          ],




          lawStartTime: [{
              required: true,
              message: '请输入供应商地址',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 100,
            //   message: '长度在 2 到 100个字符',
            //   trigger: 'blur'
            // }
          ],
          lawEndTime: [{
              required: true,
              message: '请输入供应商地址',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 100,
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
        this.pagename="新建数据库";
        this.savename="确认添加";
      }else{
        this.getListById();
        this.pagename="编辑数据库";
        this.savename="确认编辑";
      }      
    },
    created(){

    },
    methods: {
      //测试数据库
      tesDB(){
        util.postData(api.testDatabaseInfo,this.InfoForm, this).then(result => {
            if(result.status==400){
              this.$message({type: 'error',message: result.message});
              this.sqlstate=0;
            }else{
              this.sqlstate=1;
            }
          }).catch(_ => {
          });
      },
      //根据id获取生产单
      getListById(){
        util.getData(api.getDatabaseById+"?id="+this.id, {}, this).then(result => {
          this.InfoForm=result.result;
        }).catch(_ => {

        });
      },
      //提交保存
      onSubmit: function () {
        this.$refs['InfoForm'].validate((valid) => {
            if(valid){
              if(this.sqlstate==1){
                 //处理数据
                this.InfoForm.updateUser=localStorage.getItem('name');
                  util.postData(api.saveDatabaseInfo, this.InfoForm, this).then(result => {
                    this.$message({type: 'success',message: '提交成功',});
                    this.$router.push("/dblist");
                  }).catch(_ => {
                  });
              }else{
                this.$message({type: 'error',message: '请确保数据库测试连接成功',});
              }
              
            }
          });
      },
      //关闭
      close: function () {
       this.$router.push("/dblist");
      },
      //清除数据
      clearData: function () {
    
      },
    }
  };

</script>
