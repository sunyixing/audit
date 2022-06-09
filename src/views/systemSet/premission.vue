<template title="权限列表">
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <div style="float:left">
              <span>权限列表</span>
            </div>
          </div>
            <div class="btn-wrap clearfix">
              <div style="float:right;">
                <el-input placeholder="请输入账号" v-model="selectWord" class="input-with-select" style="width:360px;" @keyup.enter.native="handleCurrentChange(1)">
                  <el-select v-model="selectType" slot="prepend" placeholder="请选择" style="width:125px;" >
                    <el-option label="账号" :value=1></el-option>
                  </el-select>
                  <el-button slot="append" type="primary"  @click="handleCurrentChange(1)">搜索</el-button>
                </el-input>                    
              </div>
            </div>
            <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F1F2F9',color:'#474B64',fontSize: '14px',height:'48px',opacity: '0.7',fontFamily: 'PingFangSC-Regular, PingFang SC',fontWeight: '400'}">
              <el-table-column prop="account" label="账号" min-width="120" >
              </el-table-column>
              <!-- <el-table-column  prop="permissions" label="权限" min-width="120">
                <template slot-scope="scope">
                  {{scope.row.permissions}}
                </template>
              </el-table-column> -->
              <!-- <el-table-column prop="name" label="姓名" min-width="120" >
              </el-table-column> -->
              <el-table-column prop="updateTime" label="更新时间" min-width="160">
                <template slot-scope="scope">
                  {{changeDate(scope.row.updateTime)}}
                </template>
              </el-table-column>
              <el-table-column prop="updateUser" label="操作人" min-width="120">
              </el-table-column>
              <!-- <el-table-column prop="remarks" label="备注" min-width="120">
              </el-table-column> -->
              <el-table-column label="操作" fixed="right" min-width="120" align="center">
                <template slot-scope="scope">
                  <el-button  type="text"   @click="EditAccounts(scope.row.id)" style="color:#3546A4;">编辑权限</el-button>
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
        //表格数据
        tableData: [],
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
        checkMenuNameList:[],
        
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
      //获取用户菜单树
      // async  getUserMenuTree(id){
      //   await util.getData(api.getUserPermissionById+"?id="+id, {}, this).then(result => {
      //     return this.doDealMenuList(result.result).toString();
      //   }).catch(_ => {});
      // },
        //处理菜单（菜单转成页面显示的json格式）
    doDealMenuList:function(menulist){
      // console.log(menulist);
      let checklist=[];
        menulist.forEach(x => {
            if(x.status==1){
              let timer=true;;
               menulist.forEach(y => {
                 if(x.permissions.selfId==y.permissions.papaId && y.status==1){
                   timer=false;
                   let ind=checklist.indexOf(x.permissions.permissionName);
                   if(ind > -1){
                     checklist.splice(ind, 1);
                   }
                   checklist.push(y.permissions.permissionName);
                 }
               })
               if(timer){
                 checklist.push(x.permissions.permissionName);
               }
            }
        });
        return checklist;
      },
      //获取用户列表
      getList(){
        let para={
          page:this.cuPage,
          pageSize:this.pageSize,
          columnData:{}
        };
        this.selectWord=this.selectWord.replace(/^\s+|\s+$/g,"");
        switch(this.selectType)
        {
            case 1:
                para.columnData.account=this.selectWord;
                break;
            default:
                ""
        }
        util.postData(api.getUserListP, para, this).then(result => {
          let res=result.result;
          this.tableData=res.content;
          this.tableTotal=res.totalElements;
          // let data=res.content.map((item)=>{
          //   item.permissions=this.getUserMenuTree(item.id);
          //   return item;
          // });
          // this.tableData=data;
          // console.log(999,this.tableData);
        }).catch(_ => {

        });
      },
      //处理日期
      changeDate(date){
        return util.formatT(new Date(date),'-');
      },
      // 编辑权限
      EditAccounts: function (id) {
        this.$router.push({
            name: "premissionEdit",
            query: {id:id}  
        });
      },
      // 分页导航
      handleCurrentChange(val) {
        this.cuPage=val;
        this.getList();
      },
    }
  };

</script>
