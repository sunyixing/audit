<template title="新建行业">
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
              <el-form-item prop="name" label="行业名称：" >
                <el-input v-model="InfoForm.name" placeholder="请输入行业名称" style="width:276px" ></el-input>
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
        id:this.$route.query.id,
        pagename:'新建行业',
        savename:"确认添加",
        baseurl:"http://home.19951106.xyz:8999/file/uploadFile",
        // editflag: false,
        // 表单字段
        InfoForm:{
          createUser:  localStorage.getItem('name'),
          id: "",
          name: "",
          remarks: "",
          updateUser: localStorage.getItem('name'),
        },
        rules: {
          //合同编号校验
          name: [{
              required: true,
              message: '请输入行业名称',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 50,
            //   message: '长度在 2 到 50个字符',
            //   trigger: 'blur'
            // }
          ],
          remarks: [{
              required: true,
              message: '请输入备注',
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
        this.pagename="新建行业";
        this.savename="确认添加";
      }else{
        this.getListById();
        this.pagename="编辑行业";
        this.savename="确认编辑";
      }      
    },
    created(){

    },
    methods: {
      //根据id获取生产单
      getListById(){
        util.getData(api.getIndustryById+"?id="+this.id, {}, this).then(result => {
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
                util.postData(api.saveIndustry, this.InfoForm, this).then(result => {
                  this.$message({type: 'success',message: '提交成功',});
                  this.$router.push("/industrylist");
                }).catch(_ => {
                });
            }
          });
      },
      //关闭
      close: function () {
       this.$router.push("/industrylist");
      },
      //清除数据
      clearData: function () {
    
      },
    }
  };

</script>
