<template title="新建法规">
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
              <el-form-item prop="name" label="法规名称：" >
                <el-input v-model="InfoForm.name" placeholder="请输入法规名称" style="width:276px" ></el-input>
              </el-form-item>
               <el-form-item prop="documentNumber" label="文号：" >
                <el-input v-model="InfoForm.documentNumber" placeholder="请输入文号" style="width:276px"></el-input>
              </el-form-item>
              <el-form-item  label="行业：" >
                 <el-input v-model="selectIndu"  style="width:276px" readonly="true" disabled></el-input>
              </el-form-item>
              <el-form-item prop="startTime" label="启用日期：" >
                  <el-date-picker
                  v-model="InfoForm.startTime"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择启用日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="nullifyTime" label="作废日期：" >
                <el-date-picker
                  v-model="InfoForm.nullifyTime"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择作废日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="source" label="来源：" >
                <el-radio v-model="InfoForm.source" label="1">本地上传</el-radio>
                <el-radio v-model="InfoForm.source" label="2">网页来源</el-radio>
                <div v-if="InfoForm.source==1" style="margin-top:20px">
                    <el-upload
                      action=""
                      class="upload-demo"
                      multiple
                      :limit="1"
                      :file-list="fileList"
                      :on-change="handleChange"
                      v-if="InfoForm.source==1"
                      :auto-upload="false"
                      >
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传word/pdf文件，且不超过5M</div>
                    </el-upload>
                </div>
                <!-- <div v-if="this.id && InfoForm.source==1" style="color:green">
                  已上传：{{InfoForm.sourceUrl}}
                </div> -->

                <div v-if="InfoForm.source==2" style="margin-top:20px">
                    <el-input v-model="InfoForm.sourceUrl" placeholder="请输入来源地址" style="width:276px" ></el-input>
                </div>


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
  import axios from "axios";
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
        // options:[],
        fileList:[],
        id:this.$route.query.id,
        pagename:'新建法规',
        savename:"确认添加",
        
        baseurl:apiBaseURL+"/file/uploadFile",
        // editflag: false,
        // 表单字段
        InfoForm:{
          name:'',
          documentNumber:'',
          id: "",
          source: "1",
          sourceUrl: 'https://',
          startTime:'',
          nullifyTime:'',
          industryId:'',
          
          updateTime: "",
          updateUser: localStorage.getItem('name'),
          createUser: localStorage.getItem('name'),
        },
        rules: {
          //合同编号校验
          name: [{
              required: true,
              message: '请输入法规名称',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 50,
            //   message: '长度在 2 到 50个字符',
            //   trigger: 'blur'
            // }
          ],
          documentNumber: [{
              required: true,
              message: '请输入文号',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 100,
            //   message: '长度在 2 到 100个字符',
            //   trigger: 'blur'
            // }
          ],
          sourceUrl: [{
              required: true,
              message: '请输入来源地址',
              trigger: 'blur'
            },
            // {
            //   min: 2,
            //   max: 100,
            //   message: '长度在 2 到 100个字符',
            //   trigger: 'blur'
            // }
          ],
          startTime: [{
              required: true,
              message: '请选择启用时间',
              trigger: 'change'
            },
          ],
          nullifyTime: [{
              required: true,
              message: '请选择作废时间',
              trigger: 'change'
            },
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
        this.pagename="新建法规正文";
        this.savename="确认添加";
      }else{
        this.getListById();
        this.pagename="编辑法规正文";
        this.savename="确认编辑";
      }  
      // this.industrySet();    
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
      handleChange(file, fileList) {
        this.fileList=[];
        this.fileList = fileList;
      },
      submit() {
        if(this.InfoForm.source==1){
          if(this.fileList.length==0){
            this.$message({type: 'error',message: '请上传文件',});
          }else{
            console.log(this.fileList);
            for (let i = 0; i < this.fileList.length; i++) {
                console.log(1);
                console.log(this.fileList[i].raw);
                console.log(2);
                let fd = new FormData()
                fd.append('multipartFile', this.fileList[i].raw)
                this.upDataFile(fd);
                }
          }
        }else{
           //处理数据
               this.InfoForm.updateUser=localStorage.getItem('name');
                this.InfoForm.industryId=this.selectInduId,
                util.postData(api.saveRegulatory, this.InfoForm, this).then(result => {
                  this.$message({type: 'success',message: '提交成功',});
                  this.$router.push("/lawList");
                }).catch(_ => {
                });
        }
      },
      // 上传文件
      upDataFile(multipartFile) {
        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        axios.post(this.baseurl,multipartFile, config).then(result => {
           this.InfoForm.sourceUrl=result.data.result;
               //处理数据
               this.InfoForm.updateUser=localStorage.getItem('name');
               this.InfoForm.industryId=this.selectInduId,
                util.postData(api.saveRegulatory, this.InfoForm, this).then(result => {
                  this.$message({type: 'success',message: '提交成功',});
                  this.$router.push("/lawList");
                }).catch(_ => {
                });
            }).catch(_ => {
            });
      },
      //根据id获取生产单
      getListById(){
        util.getData(api.getRegulatoryById+"?id="+this.id, {}, this).then(result => {
          this.InfoForm=result.result;
          console.log(232423);
          console.log(apiBaseURL+"/regulatory/downloadFile?id="+this.id);
          this.fileList.push({name: this.InfoForm.sourceUrl.replace("regulatory_document/",""), url: apiBaseURL+"/regulatory/downloadFile?id="+this.id});
          console.log(this.fileList);
        }).catch(_ => {

        });
      },
      //提交保存
      onSubmit: function () {
        this.$refs['InfoForm'].validate((valid) => {
            if(valid){
              this.submit();
            }
          });
      },
      //关闭
      close: function () {
       this.$router.push("/lawList");
      },
      //清除数据
      clearData: function () {
    
      },

    }
  };

</script>
