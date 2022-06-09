<template title="编辑账号">
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <div style="float:left">
              <span>{{pagename}}</span>
            </div>
          </div>
            <el-form :model="InfoForm"  ref="InfoForm" :rules="rules" label-width="100px"  size="medium" >
              <el-form-item prop="account" label="账号" >
                <el-input v-model="InfoForm.account" placeholder="请输入账号" style="width:276px" ></el-input>
                <el-button type="text" size="small" round @click="editUserInfo" style="color:#3546A4" v-if="id">修改密码</el-button>
              </el-form-item>
               <el-form-item prop="pwd" label="新密码"  v-if="id && userInfoVisible">
                <el-input v-model="InfoForm.pwd" placeholder="请输入密码" style="width:276px"></el-input>
              </el-form-item>
              <el-form-item prop="pwd" label="密码"  v-if="!id">
                <el-input v-model="InfoForm.pwd" placeholder="请输入密码" style="width:276px"></el-input>
              </el-form-item>
               <el-form-item prop="key" label="确认密码" v-if="!id || userInfoVisible">
                <el-input v-model="InfoForm.key" placeholder="请输入确认密码" style="width:276px"></el-input>
              </el-form-item>
              <el-form-item prop="name" label="姓名" >
                <el-input v-model="InfoForm.name" placeholder="请输入姓名" style="width:276px" ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="InfoForm.remarks" placeholder="关键点可以记录在这里哦(最多200字)" :rows="4" style="width:350px" resize="none" maxlength="200" show-word-limit></el-input>
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
  import util from "../../utils/";
  import api from '../../utils/apiConstant';
  export default {
    beforeRouteEnter: function (to, from, next) {
      next(function (vm) {
        // util.setAuth(to.path,vm);
      });
    },
    data() {
      var validatePass2 = (rule, value, callback) => {
          if (value === '') {
              callback(new Error('请再次输入密码'));
          } else if (value !== this.InfoForm.pwd) {
              callback(new Error('两次输入密码不一致!'));
          } else {
              callback();
          }
      };
      return {
        id:this.$route.query.id,
        pagename:'新建账号',
        savename:"确认添加",
        userInfoVisible: false,
        // editflag: false,
        // 表单字段
        // 表单字段
        InfoForm: {
          id: "",
          remarks: "",
          name:"",
          pwd:"",
          key:"",
          status:"",
          account:"",
          updateTime: "",
          updateUser: localStorage.getItem('name'),
        },
        submitFrom:[],
        menuIds:undefined,
        checkMenuList:undefined,
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 2, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' },
            // { validator: validatePass2, trigger: 'blur', required: true }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' },
            // { validator: validatePass2, trigger: 'blur', required: true }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
            // { validator: validatePass2, trigger: 'blur', required: true }
          ],
          key: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur', required: true }
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
        this.pagename="新建账号";
        this.savename="确认添加";
      }else{
        this.getListById();
        this.pagename="编辑账号";
        this.savename="确认编辑";
      }  
    },
    created(){

    },
    methods: {
      editUserInfo(){
        this.InfoForm.pwd = "";
        this.userInfoVisible=true;
      },
      //根据id
      getListById(){
        util.getData(api.getUserById+"?id="+this.id, {}, this).then(result => {
          this.InfoForm=result.result;
        }).catch(_ => {

        });
      },
      //提交保存
      onSubmit: function () {
        this.$refs['InfoForm'].validate((valid) => {
            if(valid){
               //处理数据
               this.InfoForm.updateUser=localStorage.getItem('name');
                util.postData(api.saveUser, this.InfoForm, this).then(result => {
                  this.$confirm('提交成功,是否编辑账号权限？', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      this.$router.push({
                          name: "premissionEdit",
                          query: {id:result.result.id}  
                      });
                    }).catch(() => {
                      this.$router.push("/userList");
                    });
                }).catch(_ => {
                  
                });
            }
          });
      },
      //设置权限
      setPremission: function (id) {
       this.$router.push({
            name: "premissionEdit",
            query: {id:id}  
        });
      },
      //关闭
      close: function () {
       this.$router.push("/userList");
      },
      //清除数据
      clearData: function () {
    
      },
    }
  };

</script>
