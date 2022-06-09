<template title="离任经济事项交接表">
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <div style="float:left">
              <span>离任经济事项交接表</span>
            </div>
          </div>
          <div>
            <el-tabs v-model="activeName" >
              <el-tab-pane label="基本情况" name="1">
                <div style="width: 80%;text-align:center;font-size:20px;font-weight:600;margin-top:20px">
                  基本情况
                </div>
                <div style="display:flex;font-size:14px;margin-top:20px;width: 80%;">
                  <div style="text-align:left;flex:1">填表单位（盖章）：</div>
                  <div style="text-align:right;">单位： 万元</div>
                </div>
                <div style="margin:20px 0px 10px">
                  <el-table
                  :data="tableData1"
                  style="width: 80%"
                  border
                  :span-method="arraySpanMethod"
                  >
                  <el-table-column
                    prop="index"
                    label="内容"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="任职上一年数据（20*年）"
                    >
                  </el-table-column>
                   <el-table-column
                    prop="name"
                    label="离任上一年数据（20*年）"
                    >
                  </el-table-column>
                </el-table>
                </div>
                <div style="display:flex;font-size:14px;margin-bottom:20px;width: 80%;">
                  <div style="text-align:left;flex:1">单位负责人：</div>
                  <div style="text-align:right;padding-right:100px">填报日期：</div>
                </div>
                <div  style="width: 80%;font-size:16px;font-weight:600;margin-bottom:40px;">
                  填表说明：1.本表第一至五项不含下属单位；2.内设机构填写个数和名称。
                </div>
              </el-tab-pane>
              <el-tab-pane label="资产负债情况（含下属单位）" name="2">
                <div style="width: 80%;text-align:center;font-size:20px;font-weight:600;margin-top:20px">
                  资产负债情况（含下属单位）
                </div>
                <div style="display:flex;font-size:14px;margin-top:20px;width: 80%;">
                  <div style="text-align:left;flex:1">填表单位（盖章）：</div>
                  <div style="text-align:right;">单位： 万元</div>
                </div>
                <div style="margin:20px 0px 10px">
                  <el-table
                  :data="tableData2"
                  style="width: 80%">
                  <el-table-column
                    prop="index"
                    label="序号"
                    width="60">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="账套名称"
                    >
                  </el-table-column>
                  <el-table-column label="资产总额">
                    <el-table-column
                      prop="name"
                      label="任职期初数（20*年*月）"
                      >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="任职期末数（20*年*月）"
                        >
                      </el-table-column>
                  </el-table-column>
                  <el-table-column label="负债总额">
                    <el-table-column
                      prop="name"
                      label="任职期初数（20*年*月）"
                      >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="任职期末数（20*年*月）"
                        >
                      </el-table-column>
                  </el-table-column>
                  <el-table-column label="所有者权益">
                    <el-table-column
                      prop="name"
                      label="任职期初数（20*年*月）"
                      >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="任职期末数（20*年*月）"
                        >
                      </el-table-column>
                  </el-table-column>
                   <el-table-column
                    prop="name"
                    label="备注"
                    >
                  </el-table-column>
                </el-table>
                </div>
                <div style="display:flex;font-size:14px;margin-bottom:20px;width: 80%;">
                  <div style="text-align:left;flex:1">单位负责人：</div>
                  <div style="text-align:right;padding-right:100px">填报日期：</div>
                </div>
                <div  style="width: 80%;font-size:16px;font-weight:600;margin-bottom:40px;">
                  填表说明：1.本表填列内容含下属单位，以及主管的协会、学会、基金会等； 2.任职期初数填报领导干部到任上月月底数据，任职期末数填报领导干部离任上月月底数据。
                </div>
              </el-tab-pane>
              <el-tab-pane label="重要经济事项情况（含下属单位）" name="3">
                <div style="width: 80%;text-align:center;font-size:20px;font-weight:600;margin-top:20px">
                  重要经济事项情况（含下属单位）
                </div>
                <div style="display:flex;font-size:14px;margin-top:20px;width: 80%;">
                  <div style="text-align:left;flex:1">填表单位（盖章）：</div>
                  <div style="text-align:right;">单位： 万元</div>
                </div>
                <div style="margin:20px 0px 10px">
                  <el-table
                  :data="tableData3"
                  style="width: 80%"
                  border
                  :span-method="arraySpanMethod2"
                  :show-header="false"
                  >
                  <el-table-column
                    prop="index"
                    label=""
                    >
                  </el-table-column>
                  <el-table-column
                    prop="name1"
                    label=""
                    >
                  </el-table-column>
                   <el-table-column
                    prop="name2"
                    label=""
                    >
                  </el-table-column>
                  <el-table-column
                    prop="name3"
                    label=""
                    >
                  </el-table-column>
                  <el-table-column
                    prop="name4"
                    label=""
                    >
                  </el-table-column>
                  <el-table-column
                    prop="name5"
                    label=""
                    >
                  </el-table-column>
                  <el-table-column
                    prop="name6"
                    label=""
                    >
                  </el-table-column>
                </el-table>
                </div>
                <div style="display:flex;font-size:14px;margin-bottom:20px;width: 80%;">
                  <div style="padding-left:60px;text-align:left;flex:1">单位负责人：</div>
                  <div style="text-align:right;padding-right:100px">填报日期：</div>
                </div>
                <div  style="width: 80%;font-size:16px;font-weight:600;margin-bottom:40px;">
                  填表说明：1.本表填列领导干部离任上月月底情况；2.在建工程包括由发改部门安排的基本建设支出项目和本部门（单位）安排的资本性支出项目；3.合同填报金额100万元（不含）以上，合同类别为货物采购、服务采购、资金借贷、资产租赁、对外投资、担保（含信用担保和抵押担保）、承包经营、战略合作、其他等；4.其他需要说明的重要经济事项填报尚在处理的行政复议和行政诉讼事项等内容。
                </div>
              </el-tab-pane>
              <el-tab-pane label="银行开户及余额情况（含下属单位）" name="4">
                <div style="width: 80%;text-align:center;font-size:20px;font-weight:600;margin-top:20px">
                  银行开户及余额情况（含下属单位）
                </div>
                <div style="display:flex;font-size:14px;margin-top:20px;width: 80%;">
                  <div style="text-align:left;flex:1">填表单位（盖章）：</div>
                  <div style="text-align:right;">单位： 万元</div>
                </div>
                <div style="margin:20px 0px 10px">
                  <el-table
                    :data="tableData4"
                    border
                    style="width: 80%;"
                    align="center"
                    >
                    <el-table-column
                      prop="index"
                      label="序号"
                      width="60"
                      style="text-align:center"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="开户单位名称"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="开户银行">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="账       号">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="账户余额">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="备注">
                    </el-table-column>
                  </el-table>
                </div>
                <div style="display:flex;font-size:14px;margin-bottom:20px;width: 80%;">
                  <div style="padding-left:60px;text-align:left;flex:1">单位负责人：</div>
                  <div style="text-align:right;padding-right:100px">填报日期：</div>
                </div>
                <div  style="width: 80%;font-size:16px;font-weight:600;margin-bottom:40px;">
                  填表说明：本表数据截至领导离任上月月底。
                </div>
                
              </el-tab-pane>
              <el-tab-pane label="个人使用管理的公共财物移交明细表" name="5">
                <div style="width: 80%;text-align:center;font-size:20px;font-weight:600;margin-top:20px">
                  个人使用管理的公共财物移交明细表
                </div>
                <div style="margin:20px 0px 10px">
                  <el-table
                    :data="tableData5"
                    border
                    style="width: 80%">
                    <el-table-column
                      prop="index"
                      label="序号"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="资产名称"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="财产所属单位">
                    </el-table-column>
                    <el-table-column
                      prop="price"
                      label="原值（元）">
                    </el-table-column>
                    <el-table-column
                      prop="user"
                      label="接收人（签字）">
                    </el-table-column>
                  </el-table>
                </div>
                <div style="display:flex;font-size:14px;margin-bottom:40px;width: 80%;">
                  <div style="text-align:left;flex:1">移交人（签字）：</div>
                  <div style="text-align:right;padding-right:100px">填报日期：</div>
                </div>
              </el-tab-pane>
             
            </el-tabs>
          </div>
          
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>
<style lang="scss"  scoped>
  >>>.el-table__header tr,
  .el-table__header th {
      // padding: 0;
      height: 40px;
  }
 >>> .el-table__body tr,
    .el-table__body td {
      // padding: 0;
      height: 40px;
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
          activeName: '1',
          tableData1:[
            {
              index:'一、决算收入',
              name: '',
            }, {
              index:'二、决算支出',
              name: '',
            }, {
              index:'   其中 1.“三公”经费支出',
              name: '',
            }, {
              index:'    其中：因公出国（境）费',
              name: '',
            }, {
              index:'               公务用车购置及运行维护费',
              name: '',
            }, {
              index:'               公务接待费',
              name: '',
            }, {
              index:'    2.培训费',
              name: '',
            }, {
              index:'    3.会议费',
              name: '',
            }
            , {
              index:'三、年末结转结余资金',
              name: '',
            }, {
              index:'四、核定编制人数',
              name: '',
            }, {
              index:'        其中：行政人员',
              name: '',
            },
            {
              index:'                   事业人员',
              name: '',
            },
            {
              index:'                   编外聘用人员',
              name: '',
            },
            {
              index:'五、实有人数',
              name: '',
            },

            {
              index:'        其中：行政人员',
              name: '',
            },
            {
              index:'                   事业人员',
              name: '',
            },
            {
              index:'                   编外聘用人员',
              name: '',
            },
            {
              index:'                   其他',
              name: '',
            },
            {
              index:'六、内设机构',
              name: '',
            },
            {
              index:'七、下属单位及主管协会、学会、基金会等',
              name: '',
            },
            {
              index:'   1.（单位名称）',
              name: '（法定代表人姓名）',
            },
            {
              index:'  ……',
              name: '……',
            },
          ],
          tableData2:[
            {
              index:'1',
              name: '',
            }, {
              index:'2',
              name: '',
            }, {
              index:'3',
              name: '',
            }, {
              index:'4',
              name: '',
            }, {
              index:'5',
              name: '',
            }, {
              index:'6',
              name: '',
            }, {
              index:'7',
              name: '',
            }, {
              index:'8',
              name: '',
            },
          ],
          tableData3:[
            {
              index:'一、在建工程情况',
              name1: '',
              name2: '',
              name3: '',
              name4: '',
              name5: '',
              name6: '',
            },
            {
              index:'序号',
              name1: '项目名称',
              name2: '批复文号',
              name3: '建设单位',
              name4: '计划总投资',
              name5: '',
              name6: '',
            },
            {
              index:'1',
              name1: '',
              name2: '',
              name3: '',
              name4: '',
              name5: '',
              name6: '',
            },
            {
              index:'2',
              name1: '',
              name2: '',
              name3: '',
              name4: '',
              name5: '',
              name6: '',
            },
            {
              index:'3',
              name1: '',
              name2: '',
              name3: '',
              name4: '',
              name5: '',
              name6: '',
            },
            {
              index:'',
              name1: '',
              name2: '',
              name3: '',
              name4: '',
              name5: '',
              name6: '',
            },
            {
              index:'二、主要经济合同情况',
              name1: '',
              name2: '',
              name3: '',
              name4: '',
              name5: '',
              name6: '',
            },
            {
              index:'序号',
              name1: '主要内容',
              name2: '合同类别',
              name3: '对方单位',
              name4: '起讫时间',
              name5: '合同金额',
              name6: '已收（付）金额',
            },{
              index:'1',
              name1: '',
              name2: '',
              name3: '',
              name4: '',
              name5: '',
              name6: '',
            },
            {
              index:'2',
              name1: '',
              name2: '',
              name3: '',
              name4: '',
              name5: '',
              name6: '',
            },
            {
              index:'3',
              name1: '',
              name2: '',
              name3: '',
              name4: '',
              name5: '',
              name6: '',
            },
            {
              index:'',
              name1: '',
              name2: '',
              name3: '',
              name4: '',
              name5: '',
              name6: '',
            },
            {
              index:'三、其他需要说明的重要经济事项',
              name1: '',
              name2: '',
              name3: '',
              name4: '',
              name5: '',
              name6: '',
            },
            {
              index:'序号',
              name1: '事项名称',
              name2: '涉及金额',
              name3: '备注',
              name4: '',
              name5: '',
              name6: '',
            },{
              index:'1',
              name1: '',
              name2: '',
              name3: '',
              name4: '',
              name5: '',
              name6: '',
            },
            {
              index:'2',
              name1: '',
              name2: '',
              name3: '',
              name4: '',
              name5: '',
              name6: '',
            },
            {
              index:'',
              name1: '',
              name2: '',
              name3: '',
              name4: '',
              name5: '',
              name6: '',
            },

          ],
          tableData4:[
            {
              index:'1',
              name: '',
            }, {
              index:'2',
              name: '',
            }, {
              index:'3',
              name: '',
            }, {
              index:'4',
              name: '',
            }, {
              index:'5',
              name: '',
            }, {
              index:'6',
              name: '',
            }, {
              index:'7',
              name: '',
            }, {
              index:'8',
              name: '',
            }, {
              index:'9',
              name: '',
            }, {
              index:'10',
              name: '',
            }, {
              index:'11',
              name: '',
            }, {
              index:'12',
              name: '',
            }, {
              index:'13',
              name: '',
            }, {
              index:'14',
              name: '',
            }, {
              index:'15',
              name: '',
            }, {
              index:'16',
              name: '',
            }
          ],
          tableData5:[
          {
            index:'一',
            name: '实物资产',
            address: '',
            price: '',
            user:'',
          }, {
            index:'1',
            name: '其中：住房',
            address: '',
            price: '',
            user:'',
          }, {
            index:'2',
            name: '电子设备',
            address: '',
            price: '',
            user:'',
          }, {
            index:'3',
            name: '……',
            address: '',
            price: '',
            user:'',
          }, {
            index:'',
            name: '',
            address: '',
            price: '',
            user:'',
          }, {
            index:'',
            name: '',
            address: '',
            price: '',
            user:'',
          },{
            index:'二',
            name: '其他资产',
            address: '',
            price: '',
            user:'',
          }, {
            index:'1',
            name: '',
            address: '',
            price: '',
            user:'',
          }, {
            index:'2',
            name: '',
            address: '',
            price: '',
            user:'',
          }, {
            index:'3',
            name: '',
            address: '',
            price: '',
            user:'',
          }, {
            index:'',
            name: '',
            address: '',
            price: '',
            user:'',
          }, {
            index:'',
            name: '',
            address: '',
            price: '',
            user:'',
          }, {
            index:'',
            name: '',
            address: '',
            price: '',
            user:'',
          }, {
            index:'',
            name: '',
            address: '',
            price: '',
            user:'',
          }, {
            index:'',
            name: '',
            address: '',
            price: '',
            user:'',
          }, {
            index:'',
            name: '',
            address: '',
            price: '',
            user:'',
          }, {
            index:'',
            name: '',
            address: '',
            price: '',
            user:'',
          }, {
            index:'',
            name: '',
            address: '',
            price: '',
            user:'',
          }

        ]
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
    },
    created(){

    },
    methods: {
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex >=18) {
          if (columnIndex === 1) {
            return [1, 2];
          } 
        }
      },
      arraySpanMethod2({ row, column, rowIndex, columnIndex }) {
        if (rowIndex ==0 || rowIndex ==6  || rowIndex ==12) {
          if (columnIndex === 0) {
            return [1, 7];
          } 
        }
        if (rowIndex > 12) {
          if (columnIndex === 3) {
            return [1, 6];
          } 
        }
      },
     
    }
  };

</script>
