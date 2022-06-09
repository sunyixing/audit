<template title="权限编辑">
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <div style="float:left">
              <span>权限编辑</span>
            </div>
          </div>
            <div>
              <el-tree :data="menuIds" show-checkbox node-key="id" 
                     :default-checked-keys="checkMenuList" 
                     :default-expand-all="true"
                     ref="tree"
                     style="width:300px"
                     >
                   </el-tree>
            </div>
            <div style="margin:20px">
              <el-button @click="close()" >取消</el-button>
              <el-button  @click="onSubmit()" type="primary">保存</el-button>
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
        id:this.$route.query.id,
        menuIds:[],
        checkMenuList:[],
        checkMenuNameList:[],
        updateTime: "",
        updateUser: localStorage.getItem('name'),
        
      };
    },
    watch: {
      // selectType: function (newVal) { 
      //   this.selectWord='';
      // },
      // type: function (newVal) { 
      //   if(newVal==2){
      //     let now=new Date();
      //     let time=new Date();
      //     time.setFullYear(time.getFullYear()+100);
      //     this.InfoForm.settleCycleTime.push(util.format(now,'/'),util.format(time,'/'));
      //   }else{
      //     this.InfoForm.settleCycleTime=[];
      //   }
      // },
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
      this.getUserMenuTree();
    },
    created(){

    },
    methods: {
        //处理菜单（菜单转成页面显示的json格式）
    doDealMenuList2:function(menulist){
      console.log(menulist);
        //选中菜单
        var retC = [], oC = {};
        //所有菜单
        var ret = [], o = {};
        function add(arr, data){
          var obj = {
              "id": data.selfId,
              "pId": data.papaId,
              "label":data.permissionName,
              "children": []
          };
          o[data.selfId] = obj;
          arr.push(obj);
        }
        menulist.forEach(x => {
          // alert(x.permissions.status);
            if(x.status==1){
              let timer=true;;
               menulist.forEach(y => {
                 if(x.permissions.selfId==y.permissions.papaId && y.status==1){
                   timer=false;
                   let index=this.checkMenuList.indexOf(x.permissions.selfId);
                   if(index > -1){
                     this.checkMenuList.splice(index, 1);
                   }
                   this.checkMenuList.push(y.permissions.selfId);

                   let ind=this.checkMenuNameList.indexOf(x.permissions.permissionName);
                   if(ind > -1){
                     this.checkMenuNameList.splice(ind, 1);
                   }
                   this.checkMenuNameList.push(y.permissions.permissionName);
                 }
               })
               if(timer){
                 this.checkMenuList.push(x.permissions.selfId);
                 this.checkMenuNameList.push(x.permissions.permissionName);
               }
            }
            if(o[x.permissions.papaId]){
                add(o[x.permissions.papaId].children, x.permissions);
            }else{
                add(ret, x.permissions);
            }
        });
        this.menuIds=ret;
      },
      //获取用户菜单树
      getUserMenuTree(){
        util.getData(api.getUserPermissionById+"?id="+this.id, {}, this).then(result => {
          console.log(result.result);
          let res = result.result.filter((item) => {
            return item.permissions.status===0;
          });
          this.doDealMenuList2(res);
        }).catch(_ => {});
      },
      onSubmit: function () {
       util.postData(api.changeUserPermissionById, {
         userId:this.id,
         statusIdList:this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()).toString()
       }, this).then(result => {
            this.$message({type: 'success',message: '提交成功',});
            this.$router.push("/premission");
        }).catch(_ => {
        });

        
      },
       //关闭
      close: function () {
       this.$router.push("/premission");
      },
    }
  };

</script>
