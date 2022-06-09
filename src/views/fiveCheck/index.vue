<template title="五审五查">
  <div class="fiveCheck">
    <el-row>
      <el-col :span="24">
        <el-card style="min-height:600px">
          <div slot="header" class="clearfix">
            <div style="float:left">
              <span>经责审计五审五评</span>
            </div>
          </div>
            <div class="clearfix" style="padding-bottom:20px">
              <div style="float:left" class="btn">
                <el-button type="primary" @click="addTab()">新增项目</el-button>
              </div>
            </div>
            <div class="content" v-if="projectJson.length>0" >
              <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="getItemBy">
                <el-tab-pane
                  v-for="(item, index) in projectJson"
                  :key="item.id"
                  :label="item.reviewProject"
                  :name="item.id"
                >
                <div style="margin:20px 0px;padding-left:20px" >
                    <el-button type="primary"   @click="editTab(item.id)" size="mini" >编辑</el-button>
                    <el-button type="primary"   @click="addItem()" size="mini" >新增子项</el-button>
                    <el-button type="warning"   @click="selfCheck(item.id)" size="mini"  v-if="addInfoFormJson.length>0">自查</el-button>
                    <el-button type="warning"    size="mini" @click="downloadurl()" >审计底稿</el-button>
                </div>
                <el-collapse v-model="activeNames"   v-if="addInfoFormJson.length>0" style="padding:0px 20px 40px" accordion  >
                  <el-collapse-item  :name="it.id"   v-for="(it, ind) in addInfoFormJson"
                  :key="ind">
                  <template slot="title">
                    <el-col :span="2">
                      <i class="el-icon-edit" style="color:#3546A4;padding-right:8px;font-size:13px" @click.stop="eidtItem(it.id)"></i>
                      <i class="el-icon-delete" style="color:#CF502D;font-size:13px" @click.stop="deleteproItem(it.id)"></i>
                    </el-col>
                    <el-col :span="6" class="item6">
                      <span>{{it.data}}</span>
                      <!-- <el-tooltip class="item" effect="dark" :content="it.data" placement="right">
                        <span>{{it.data}}</span>
                      </el-tooltip> -->
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content bg-purple">
                        <el-checkbox v-model="it.isKey" disabled>是否重要</el-checkbox>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple">
                        <span @click.stop>
                          <el-radio v-model="it.status" :label="1" >有</el-radio>
                          <el-radio v-model="it.status" :label="0">无</el-radio>
                        </span>
                        
                      </div>
                    </el-col>
                    <el-col :span="9">
                      <el-button size="mini" type="primary" @click.stop="fileupload(it.id)">上传</el-button>
                      <el-button type="warning"    size="mini"  @click.stop="auditFunc(it.id)">审计方法</el-button>
                      <el-button type="warning"    size="mini" @click.stop="creaturl(it.id)" >生成取证单</el-button>
                    </el-col>
                  </template>
                  <template v-if="reviewsData.get(it.id)">
                    <div style="margin:20px 0px" v-for="(ik, inx) in reviewsData.get(it.id)">
                      <el-row>
                        <el-col :span="2" style="text-align:right;padding-right:10px">
                          <i class="el-icon-delete" style="color:#CF502D;font-size:13px;cursor:pointer" @click.stop="deleteFifle(ik.id,it.id)"></i>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content bg-purple">
                            文件名称:{{ik.fileName}}
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div>
                            <el-button size="mini" type="primary" @click="gotourl(ik.fileUri)">下载</el-button>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </template>
                  </el-collapse-item>
                </el-collapse>
                </el-tab-pane>
               </el-tabs>
            </div>

          <!-- 新增 -->
           <el-dialog title="新增项目" :visible.sync="newdialogFormVisible" :close-on-click-modal="false">
              <div v-if="!nextflag">
              <el-form :model="newInfoForm"  ref="newInfoForm" :rules="newrules" label-width="140px"  size="medium" >
                <el-form-item prop="reviewProject" label="审查项目：" >
                  <el-input v-model="newInfoForm.reviewProject" placeholder="请输入审查项目" style="width:276px" ></el-input>
                </el-form-item>
                <el-card shadow="never" style="margin:0px 40px">
                  <el-form :model="allfoForm"  ref="allfoForm" :rules="allrules" label-width="100px"  size="medium" >
                   <el-form-item prop="reviewRules" label="审查规则：" >
                      <el-input v-model="allfoForm.reviewRules" placeholder="请输入审查规则" style="width:276px" ></el-input>
                    </el-form-item>
                    <el-form-item  label="重点子项：" prop="keySubsets" >
                      <el-select  placeholder="请选择重点子项" v-model="allfoForm.keySubsets">
                        <el-option :value="0" label="全有"></el-option>
                        <el-option :value="1" label="全无"></el-option>
                        <el-option :value="2" label="部分有"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item  label="一般子项：" prop="normalSubsets" >
                      <el-select  placeholder="请选择一般子项" v-model="allfoForm.normalSubsets">
                        <el-option :value="0" label="全有"></el-option>
                        <el-option :value="1" label="全无"></el-option>
                        <el-option :value="2" label="部分有"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item   >
                      <el-button type="info" size="mini" @click="addRules()" >添加规则</el-button>
                    </el-form-item>
                   </el-form>      
                  </el-card>
                <el-collapse v-model="activeNames2"   v-if="newInfoForm.reviewsRulesList.length>0" style="margin:20px 60px 0px" accordion>
                  <el-collapse-item :title="'规则'+(ind+1)" :name="ind+1"   v-for="(it, ind) in newInfoForm.reviewsRulesList"
                  :key="ind">
                  <div style="font-size:13px;">审查规则：<span style="font-weight:500">{{it.reviewRules}}</span></div>
                  <div style="font-size:13px;">重点子项：<span style="font-weight:500">{{it.keySubsets==0 ? '全有' : it.keySubsets==1 ? '全无' : '部分有'}}</span></div>
                  <div style="font-size:13px;">一般子项：<span style="font-weight:500">{{it.normalSubsets==0 ? '全有' : it.normalSubsets==1 ? '全无' : '部分有'}}</span></div>
                   <div style="text-align:right;">
                      <el-button type="danger"  plain @click="deleteItem(ind)" size="mini" >删除</el-button>
                    </div>
                  </el-collapse-item>
                </el-collapse>
                <el-form-item prop="defaultSubsets" label="默认审查规则：" style="margin-top: 22px;">
                  <el-input v-model="newInfoForm.defaultSubsets" placeholder="请输入默认审查规则" style="width:276px" ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button @click="newclosed()">关 闭</el-button>
                <el-button @click="nextstep()" type="primary">下一步</el-button>
              </div>
              </div>
              <div v-else>
              <el-form :model="newInfoFormPlus"  ref="newInfoFormPlus" :rules="newrulesPlus" label-width="140px"  size="medium">
                <el-form-item prop="projectName" label="项目名称：" >
                  <el-input v-model="newInfoFormPlus.projectName" placeholder="请输入项目名称" style="width:276px" ></el-input>
                </el-form-item>
                <el-form-item prop="auditMatters" label="审查(调查)事项：" style="margin-top: 22px;">
                  <el-input v-model="newInfoFormPlus.auditMatters" placeholder="请输入审查(调查)事项" style="width:276px" ></el-input>
                </el-form-item>
                <el-form-item prop="auditProcess" label="审查过程：" style="margin-top: 22px;">
                  <el-input v-model="newInfoFormPlus.auditProcess" placeholder="请输入审查过程" style="width:276px" ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button @click="newclosed()">关 闭</el-button>
                <el-button @click="nextflag=false" type="primary">上一步</el-button>
                <el-button @click="newSubmit()" type="primary">提 交</el-button>
              </div>
              </div>
            </el-dialog>  

            <!-- 编辑 -->
           <el-dialog title="编辑项目" :visible.sync="editdialogFormVisible" :close-on-click-modal="false">
             <div v-if="!nextflagEdit">
              <el-form :model="editInfoForm"  ref="editInfoForm" :rules="editrules" label-width="140px"  size="medium" >
                <el-form-item prop="reviewProject" label="审查项目：" >
                  <el-input v-model="editInfoForm.reviewProject" placeholder="请输入审查项目" style="width:276px" ></el-input>
                </el-form-item>
                <el-card shadow="never" style="margin:0px 40px">
                  <el-form :model="alleditfoForm"  ref="alleditfoForm" :rules="alleditrules" label-width="100px"  size="medium" >
                   <el-form-item prop="reviewRules" label="审查规则：" >
                      <el-input v-model="alleditfoForm.reviewRules" placeholder="请输入审查规则" style="width:276px" ></el-input>
                    </el-form-item>
                    <el-form-item  label="重点子项：" prop="keySubsets" >
                      <el-select  placeholder="请选择重点子项" v-model="alleditfoForm.keySubsets">
                        <el-option :value="0" label="全有"></el-option>
                        <el-option :value="1" label="全无"></el-option>
                        <el-option :value="2" label="部分有"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item  label="一般子项：" prop="normalSubsets" >
                      <el-select  placeholder="请选择一般子项" v-model="alleditfoForm.normalSubsets">
                        <el-option :value="0" label="全有"></el-option>
                        <el-option :value="1" label="全无"></el-option>
                        <el-option :value="2" label="部分有"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item   >
                      <el-button type="info" size="mini" @click="editFromRules()" >添加规则</el-button>
                    </el-form-item>
                   </el-form>      
                  </el-card>
                <el-collapse v-model="activeNames3"   v-if="editInfoForm.reviewsRulesList.length>0" style="margin:20px 60px 0px" accordion>
                  <el-collapse-item :title="'规则'+(ind+1)" :name="ind+1"   v-for="(it, ind) in editInfoForm.reviewsRulesList"
                  :key="ind">
                  <div style="font-size:13px;">审查规则：<span style="font-weight:500">{{it.reviewRules}}</span></div>
                  <div style="font-size:13px;">重点子项：<span style="font-weight:500">{{it.keySubsets==0 ? '全有' : it.keySubsets==1 ? '全无' : '部分有'}}</span></div>
                  <div style="font-size:13px;">一般子项：<span style="font-weight:500">{{it.normalSubsets==0 ? '全有' : it.normalSubsets==1 ? '全无' : '部分有'}}</span></div>
                   <div style="text-align:right;">
                      <el-button type="danger"  plain @click="deleteItemedit(ind)" size="mini" >删除</el-button>
                    </div>
                  </el-collapse-item>
                </el-collapse>
                <el-form-item prop="defaultSubsets" label="默认审查规则：" style="margin-top: 22px;">
                  <el-input v-model="editInfoForm.defaultSubsets" placeholder="请输入默认审查规则" style="width:276px" ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button @click="editclosed()">关 闭</el-button>
                <el-button @click="nextstepEdit()" type="primary">下一步</el-button>
              </div>
              </div>
            <div v-else>
              <el-form :model="editInfoFormPlus"  ref="editInfoFormPlus" :rules="editrulesPlus" label-width="140px"  size="medium">
                <el-form-item prop="projectName" label="项目名称：" >
                  <el-input v-model="editInfoFormPlus.projectName" placeholder="请输入项目名称" style="width:276px" ></el-input>
                </el-form-item>
                <el-form-item prop="auditMatters" label="审查(调查)事项：" style="margin-top: 22px;">
                  <el-input v-model="editInfoFormPlus.auditMatters" placeholder="请输入审查(调查)事项" style="width:276px" ></el-input>
                </el-form-item>
                <el-form-item prop="auditProcess" label="审查过程：" style="margin-top: 22px;">
                  <el-input v-model="editInfoFormPlus.auditProcess" placeholder="请输入审查过程" style="width:276px" ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button @click="editclosed()">关 闭</el-button>
                <el-button @click="nextflagEdit=false" type="primary">上一步</el-button>
                <el-button @click="editSubmit()" type="primary">提 交</el-button>
              </div>
            </div>
            </el-dialog>  
           
          <!-- 添加子项 -->
           <el-dialog title="新增子项" :visible.sync="adddialogFormVisible" :close-on-click-modal="false">
              <div v-if="!addInfoFormnextflag">
                <el-form :model="addInfoForm"  ref="addInfoForm" :rules="itemrules" label-width="140px"  size="medium" >
                  <el-form-item prop="data" label="子项内容：" >
                    <el-input v-model="addInfoForm.data" placeholder="请输入子项内容" style="width:276px" ></el-input>
                  </el-form-item>
                  <el-form-item prop="isKey" label="isKey：" >
                    <el-checkbox v-model="addInfoForm.isKey" ></el-checkbox>
                  </el-form-item>                
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align:center">
                  <el-button @click="addclosed()">关 闭</el-button>
                  <el-button @click="nexaddItem()" type="primary">下一步</el-button>
                </div>
              </div>
                <div v-else>
                <el-form :model="addInfoFormPlus"  ref="addInfoFormPlus" :rules="addInfoFormPlusrules" label-width="200px"  size="medium">
                  <el-form-item prop="projectName" label="项目名称：" >
                    <el-input v-model="addInfoFormPlus.projectName" placeholder="请输入项目名称" style="width:276px"></el-input>
                  </el-form-item>
                  <el-form-item prop="auditObject" label="被审查(调查)单位或个人：" >
                    <el-input v-model="addInfoFormPlus.auditObject" placeholder="请输入被审查(调查)单位或个人" style="width:276px"></el-input>
                  </el-form-item>
                  <el-form-item prop="auditMatters" label="审查(调查)事项：" >
                    <el-input v-model="addInfoFormPlus.auditMatters" placeholder="请输入审查(调查)事项" style="width:276px"></el-input>
                  </el-form-item>
                  <el-form-item prop="auditSummary" label="审查(调查)事项摘要：" >
                    <el-input type="textarea" v-model="addInfoFormPlus.auditSummary" placeholder="输入审查(调查)事项摘要" :rows="4" style="width:350px" resize="none"  show-word-limit></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align:center">
                  <el-button @click="addclosed()">关 闭</el-button>
                  <el-button @click="addInfoFormnextflag=false" type="primary">上一步</el-button>
                  <el-button @click="addConfirm()" type="primary">提 交</el-button>
                </div>
              </div>
            </el-dialog>
            <!--编辑子项 -->
           <el-dialog title="编辑子项" :visible.sync="editVisible" :close-on-click-modal="false">
              <div v-if="!editInfoFormnextflag">
                <el-form :model="edititemInfoForm"  ref="edititemInfoForm" :rules="edititemrules" label-width="140px"  size="medium" >
                  <el-form-item prop="data" label="子项内容：" >
                    <el-input v-model="edititemInfoForm.data" placeholder="请输入子项内容" style="width:276px" ></el-input>
                  </el-form-item>
                  <el-form-item prop="isKey" label="isKey：" >
                    <el-checkbox v-model="edititemInfoForm.isKey" ></el-checkbox>
                  </el-form-item>                
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align:center">
                  <el-button @click="eidtItemclosed()">关 闭</el-button>
                  <el-button @click="nexeidtItem()" type="primary">下一步</el-button>
                </div>
              </div>
              <div v-else>
                <el-form :model="edititemInfoFormPlus"  ref="edititemInfoFormPlus" :rules="edititemInfoFormPlusrules" label-width="140px"  size="medium">
                  <el-form-item prop="projectName" label="项目名称：" >
                    <el-input v-model="edititemInfoFormPlus.projectName" placeholder="请输入项目名称" style="width:276px"></el-input>
                  </el-form-item>
                  <el-form-item prop="auditObject" label="被审查(调查)单位或个人：" >
                    <el-input v-model="edititemInfoFormPlus.auditObject" placeholder="请输入被审查(调查)单位或个人" style="width:276px"></el-input>
                  </el-form-item>
                  <el-form-item prop="auditMatters" label="审查(调查)事项：" >
                    <el-input v-model="edititemInfoFormPlus.auditMatters" placeholder="请输入审查(调查)事项" style="width:276px"></el-input>
                  </el-form-item>
                  <el-form-item prop="auditSummary" label="审查(调查)事项摘要：" >
                    <el-input type="textarea" v-model="edititemInfoFormPlus.auditSummary" placeholder="输入审查(调查)事项摘要" :rows="4" style="width:350px" resize="none"  show-word-limit></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align:center">
                  <el-button @click="eidtItemclosed()">关 闭</el-button>
                  <el-button @click="editInfoFormnextflag=false" type="primary">上一步</el-button>
                  <el-button @click="edititemConfirm()" type="primary">提 交</el-button>
                </div>
              </div>
              
            </el-dialog>
            <!-- 审计方法 -->
           <el-dialog title="审计方法" :visible.sync="auditdialogFormVisible" :close-on-click-modal="false" width="500px">
              <el-form  label-width="140px"  size="medium" >
                <el-form-item prop="data" label="审计方法：" >
                 <el-select v-model="value" placeholder="请选择审计方法">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.cacsName"
                    :value="item.id">
                  </el-option>
                </el-select>
                </el-form-item>               
              </el-form>
              <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button @click="auditdialogFormVisible=false">关 闭</el-button>
                <el-button @click="auditConfirm()" type="primary">提 交</el-button>
              </div>
            </el-dialog>
            <!-- 底稿预览-->
           <el-dialog title="底稿预览" :visible.sync="lookdialogFormVisible" :close-on-click-modal="false" width="500px">
             <div style="color:black;font-weight:600;font-size:20px;text-align:center;margin-bottom:20px">
               审计工作底稿
             </div>
              <div class="table1" >
                <el-row>
                <el-col :span="7" class="class0">
                  项目名称
                </el-col>
                <el-col :span="17" style="font-weight:600">
                 {{lowPaper.projectName}}
                </el-col>
                <el-col :span="7" class="class0">
                  审计（调查）事项
                </el-col>
                <el-col :span="17" style="font-weight:600">
                 {{lowPaper.auditMatters}}
                </el-col>
                <el-col :span="7" class="class0">
                  审计人员
                </el-col>
                <el-col :span="7" style="font-weight:600">
                 {{lowPaper.createUser}}
                </el-col>
                <el-col :span="5" >
                  编制日期
                </el-col>
                <el-col :span="5" style="font-weight:600">
                 {{lowPaper.auditData}}
                </el-col>
                <el-col :span="24"  class="class1 class0">
                  &nbsp;&nbsp;审计过程：<span style="font-weight:600">{{lowPaper.auditProcess}}</span>
                  
                </el-col>
                <el-col :span="24" class="class2 class0">
                  &nbsp;&nbsp;审计认定的事实摘要及审计结论：<span style="font-weight:600">{{lowPaper.auditConclusion}}</span>
                  
                </el-col>
                <el-col :span="24" class="class1 class0">
                  &nbsp;&nbsp;审核意见：<span style="font-weight:600"></span>
                  
                </el-col>
                <el-col :span="5" class="class0 class99">
                  审核人员
                  
                </el-col>
                <el-col :span="7"  class="class99">
                  
                </el-col>
                <el-col :span="5" class="class99">
                  审核日期
                  
                </el-col>
                <el-col :span="7" class="class99">
                  
                </el-col>
                </el-row>
                
               
              </div>
              <div slot="footer" class="dialog-footer" style="text-align:center;">
                <el-button @click="lookdialogFormVisible=false">关 闭</el-button>
              </div>
            </el-dialog>
            <!-- 上传 -->
            <el-dialog title="上传文件" :visible.sync="filedialogFormVisible" width="420px">
            <el-form>
              <el-upload
                          action=""
                          class="upload-demo"
                          drag
                          :limit="1"
                          :file-list="fileList"
                          :on-change="fileChange"
                          :auto-upload="false"
                          multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">点击上传</div>
              </el-upload>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center">
              <el-button @click="uploadquit()">取 消</el-button>
              <el-button type="primary" @click="submitUpload">提 交</el-button>
            </div>
          </el-dialog>

          <el-dialog title="预览取证单" :visible.sync="seedialogFormVisible" class="seeformclass">
            <div style="text-align:center;font-size:20px;margin-bottom:20px;font-weight: 600;">审 计 取 证 单</div>
            <el-form ref="form" :model="seedialogInfoForm" label-width="80px" style="border:1px solid #ddd">
              <el-form-item prop="projectName" label="项目名称：" style="border:1px solid #ddd;">
                <span>
                  <el-input
                  id="input1"
                    type="textarea"
                    v-model="seedialogInfoForm.projectName">
                  </el-input>
                </span>
                
                    </el-form-item>
                    <!-- <el-form-item label="所属行业：" style="border:1px solid #ddd">
                      <span style="padding-left: 20px;">
                  {{InfoForm.industry}}
                </span>
                    </el-form-item> -->
                    <el-form-item prop="auditObject" label="被审查(调查)单位或个人：" style="border:1px solid #ddd">
                        <span >
                  <el-input
                  id="input2"
                    type="textarea"
                    v-model="seedialogInfoForm.auditObject">
                  </el-input>
                </span>
                    </el-form-item>
                    <el-form-item prop="auditMatters" label="审查(调查)事项：" style="border:1px solid #ddd" >
                      <span>
                  <el-input
                  id="input3"
                    type="textarea"
                    v-model="seedialogInfoForm.auditMatters">
                  </el-input>
                </span>
                    </el-form-item>
                    <el-form-item prop="auditSummary" label="审查(调查)事项摘要：" style="border:1px solid #ddd">
                      <span>
                  <el-input
                  id="input4"
                    type="textarea"
                    v-model="seedialogInfoForm.auditSummary">
                  </el-input>
                </span>
                    </el-form-item>
                    <el-form-item label="审计人员(签名)：" style="border:1px solid #ddd">
                        <span >
                  <el-input
                  id="input5"
                    type="textarea"
                    v-model="seedialogInfoForm.createUser">
                  </el-input>
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
            <div style="margin-top:14px;font-weight: 600;">
              <span style="">
              审核人（签名）：
            </span>
            <span style="padding-left:100px">
            附件：
            </span>
            </div>
            
            <div slot="footer" class="dialog-footer" style="text-align:center">
              <el-button @click="seedialogclosed()">关 闭</el-button>
               <el-button type="primary" @click="saveCreat()">保 存</el-button>

            </div>
          </el-dialog>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>
<style lang="scss"  scoped>
    .fiveCheck{
      .seeformclass{
        /deep/ #input1 {
           height: 80px;
          width:100%;
          outline:none;
        }
         /deep/ #input2 {
           height: 120px;
           width:100%;
        }
         /deep/ #input3 {
           height: 80px;
           width:100%;
        }
         /deep/ #input4 {
           height: 110px;
          width:100%;
        }
         /deep/ #input5 {
           height: 80px;
           width:100%;
        }

        >>>.el-form-item__label{
          font-weight: 600;
        }
        >>>.el-form-item{
          margin: 0;
        }
      }
      .content{
          padding-bottom: 40px;
          .item6{
            white-space: nowrap;/*设置不换行*/
            overflow: hidden; /*设置隐藏*/
            text-overflow: ellipsis; /*设置隐藏部分为省略号*/
            cursor: pointer;
          }
      }
      .inline-block{
        display: inline-block;
        margin-right: 10px;
      }
      .table1{
        
        >>>.el-col{
          border-top:1px solid black;
          border-right:1px solid black;
          height:48px;
          line-height: 48px;
          text-align: center;
        }
        .class1{
          height:100px;
          text-align: left;
        }
        .class2{
          height:180px;
          text-align: left;
        }
        .class0{
         border-left:1px solid black;
        }
        .class99{
          border-bottom:1px solid black;
        }
      }
    }

</style>
<script>
  import util from "../../utils/";
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
        seedialogInfoForm:{},
        seedialogFormVisible:false,
        selectInduId : localStorage.getItem("selectInduId"),
        lowPaper:{},
        nextflagEdit:false,
        nextflag:false,
        multipartFile:undefined,
        filedialogFormVisible:false,
        uploadid:'',
        baseurl:apiBaseURL+"review/data/uploadFile",
        reviewsData:new Map(),
        lookdialogFormVisible:false,

        auditdialogid:'',

        allfoForm:{
          reviewRules:'',
          keySubsets:'',
          normalSubsets:'',
        },
        alleditfoForm:{
          reviewRules:'',
          keySubsets:'',
          normalSubsets:'',
        },

        



        activeNames: [],
        activeNames2: ['1'],
        activeNames3: ['1'],

        
        //新增项目json
        newInfoForm:{
          reviewProject:'',
          reviewsRulesList:[],
          defaultSubsets:'',
        },
        newInfoFormPlus:{
          projectName:'',
          auditMatters:'',
          auditProcess:'',
        },
        //新增项目json
        editInfoForm:{
          reviewProject:'',
          reviewsRulesList:[],
          defaultSubsets:'',
        },
        editInfoFormPlus:{
          projectName:'',
          auditMatters:'',
          auditProcess:'',
        },

        addInfoFormnextflag:false,
        //新增子项json
        addInfoForm:{
          reviews:{
            id:'',
          },
          data:'',
          subsetsFile1:'',
          subsetsFile2:'',
          subsetsFile3:'',
          subsetsFile4:'',
          subsetsFile5:'',
          isKey:false,
        },
        addInfoFormPlus:{
            projectName: "",
            auditObject: "",
            auditMatters: "",
            auditSummary: "",
        },
        addInfoFormPlusrules:{
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

        editInfoFormnextflag:false,
        edititemInfoForm:{
          id:'',
          reviews:{
            id:'',
          },
          data:'',
          subsetsFile1:'',
          subsetsFile2:'',
          subsetsFile3:'',
          subsetsFile4:'',
          subsetsFile5:'',
          isKey:false,
        },
        edititemInfoFormPlus:{
            projectName: "",
            auditObject: "",
            auditMatters: "",
            auditSummary: "",
        },
        edititemInfoFormPlusrules:{
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


        //子项集合json
        addInfoFormJson:[],
        newdialogFormVisible:false,
        editableTabsValue: '',


        //编辑
        editdialogFormVisible:false,

        
        //项目集合
        projectJson:[],


        fileList:[],
        adddialogFormVisible:false,
        editVisible:false,
        auditdialogFormVisible:false,

        options: [],
        value: '',
        //筛选项
        selectType:1,
        selectWord:'',
        selectInduId : localStorage.getItem("selectInduId"),
        selectIndu : localStorage.getItem("selectIndu"),


        tableData:[
          {}
        ],
        tableTotal: 0,
        cuPage: 1,
        pageSize:10,
        newrules: {
          reviewProject: [{
              required: true,
              message: '请输入审查项目',
              trigger: 'blur'
            }
          ],
          defaultSubsets:[{
              required: true,
              message: '请输入默认审查规则',
              trigger: 'blur'
            }
          ],
        },
        newrulesPlus: {
          projectName: [{
              required: true,
              message: '请输入项目名称',
              trigger: 'blur'
            }
          ],
           auditMatters:[{
              required: true,
              message: '请输入审查(调查)事项',
              trigger: 'blur'
            }
          ],
           auditProcess:[{
              required: true,
              message: '请输入审查过程',
              trigger: 'blur'
            }
          ],
        },
        editrules: {
          reviewProject: [{
              required: true,
              message: '请输入审查项目',
              trigger: 'blur'
            }
          ],
          defaultSubsets:[{
              required: true,
              message: '请输入默认审查规则',
              trigger: 'blur'
            }
          ],
        },
        editrulesPlus: {
          projectName: [{
              required: true,
              message: '请输入项目名称',
              trigger: 'blur'
            }
          ],
           auditMatters:[{
              required: true,
              message: '请输入审查(调查)事项',
              trigger: 'blur'
            }
          ],
           auditProcess:[{
              required: true,
              message: '请输入审查过程',
              trigger: 'blur'
            }
          ],
        },
        allrules: {
          reviewRules: [{
              required: true,
              message: '请输入审查规则',
              trigger: 'blur'
            }
          ],
          keySubsets:[{
              required: true,
              message: '请选择重点子项',
              trigger: 'blur'
            }
          ],
          normalSubsets:[{
              required: true,
              message: '请选择一般子项',
              trigger: 'blur'
            }
          ],

        },
        alleditrules: {
          reviewRules: [{
              required: true,
              message: '请输入审查规则',
              trigger: 'blur'
            }
          ],
          keySubsets:[{
              required: true,
              message: '请选择重点子项',
              trigger: 'blur'
            }
          ],
          normalSubsets:[{
              required: true,
              message: '请选择一般子项',
              trigger: 'blur'
            }
          ],

        },
        itemrules: {

          data: [{
              required: true,
              message: '请输入审查规则',
              trigger: 'blur'
            }
          ],
          // subsetsFile1: [{
          //     required: true,
          //     message: '请输入审查规则',
          //     trigger: 'blur'
          //   }
          // ],
          // subsetsFile2: [{
          //     required: true,
          //     message: '请输入审查规则',
          //     trigger: 'blur'
          //   }
          // ],
          // subsetsFile3: [{
          //     required: true,
          //     message: '请输入审查规则',
          //     trigger: 'blur'
          //   }
          // ],
          // subsetsFile4: [{
          //     required: true,
          //     message: '请输入审查规则',
          //     trigger: 'blur'
          //   }
          // ],
          // subsetsFile5: [{
          //     required: true,
          //     message: '请输入审查规则',
          //     trigger: 'blur'
          //   }
          // ],
          

        },
        edititemrules: {

          data: [{
              required: true,
              message: '请输入审查规则',
              trigger: 'blur'
            }
          ],
        }
        
      };
    },
    watch: {
      // selectIndu: function (newVal) { 
      //  this.handleCurrentChange(1);
      // },
      selectType: function (newVal) { 
        this.selectWord='';
      },
    },
    mounted() {
      // console.log(111,window.history)
      // window.history.go(-1)
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
      //初始化加载首页
      this.getList(0);
      
    },
    created(){

    },
    methods: {  
      seedialogclosed(){
        this.seedialogFormVisible=false;
      },
      saveCreat(){
           util.postData(api.saveReviewsSheet,this.seedialogInfoForm
            , this).then(res => {
              this.seedialogFormVisible=false;
              this.gotourl(res.result.fileUri);
            }).catch(_ => {
            });
          
      },
      gotourl(url){
        if(url.indexOf("https://")!=-1 || url.indexOf("http://")!=-1){
              window.open(url);
          }else{
              window.open("https://"+url);
          }
      },
      downloadurl(){
        if(this.lowPaper.fileUri){
          this.gotourl(this.lowPaper.fileUri);
        }else{
           this.$message({type: 'error',message: '请先自查项目!'});
        }
      },
      creaturl(id){
        util.getData(api.getReviewsSheet,{
              reviewsDataId:id,
              userName:localStorage.getItem('name')
            }, this).then(res => {
             this.seedialogInfoForm=res.result;
             this.seedialogFormVisible=true;
            }).catch(_ => {
            });
        
      },
      fileChange(file, fileList) {
        console.log(99,file);
        this.multipartFile=file;
      },
      fileupload(id){
        this.uploadid=id;
        this.filedialogFormVisible=true;
      },
      uploadquit(){
        this.filedialogFormVisible=false;
        this.fileList=[];
        this.multipartFile=undefined;
      },
      submitUpload(){
        // var fd = new FormData()
        // fd.append('multipartFile', this.multipartFile)
        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        let fd = new FormData()
        fd.append('multipartFile', this.multipartFile.raw)
        axios.post(this.baseurl+"/"+this.uploadid,fd, config).then(result => {
          console.log(8888888,result);
          this.refreshInfo(this.uploadid);
          this.filedialogFormVisible=false;
          this.fileList=[];
          this.multipartFile=undefined;
        }).catch(_ => {
        })
      },
      //审计方法
      auditFunc(id){
        this.auditSet();
        this.auditdialogid=id;
        this.auditdialogFormVisible=true;
      },
      //刷新上传信息
      refreshInfo(id){
        util.getData(api.getALlByReviewsDataId,{
              id:id
            }, this).then(res => {
              this.reviewsData.set(id,res.result)
              this.activeNames=[];
              this.activeNames.push(id);
            }).catch(_ => {
            });
         
      },
      auditConfirm(){
        util.getData(api.submitAudit,{
          cacsId:this.value,
          reviewsDataId:this.auditdialogid
        }, this).then(result => {
            this.refreshInfo(this.auditdialogid);
            this.$message({type: 'success',message: '提交成功',});
            this.auditdialogFormVisible=false;

        }).catch(_ => {
        });

        
      },
      //增加子项
      addConfirm(){
        this.$refs["addInfoFormPlus"].validate(valid => {
            if (valid) {
                this.addInfoForm.reviews.id=this.editableTabsValue;
                this.addInfoForm.isKey ? this.addInfoForm.isKey = 1 : this.addInfoForm.isKey=0;

                this.addInfoForm.projectName=this.addInfoFormPlus.projectName;
                this.addInfoForm.auditObject=this.addInfoFormPlus.auditObject;
                this.addInfoForm.auditMatters=this.addInfoFormPlus.auditMatters;
                this.addInfoForm.auditSummary=this.addInfoFormPlus.auditSummary;

                util.postData(api.addItem, this.addInfoForm, this).then(result => {
                  this.$message({type: 'success',message: '提交成功',});
                  this.addInfoFormnextflag=false;
                  this.adddialogFormVisible=false;
                  this.addInfoForm={
                    reviews:{
                      id:'',
                    },
                    data:'',
                    subsetsFile1:'',
                    subsetsFile2:'',
                    subsetsFile3:'',
                    subsetsFile4:'',
                    subsetsFile5:'',
                    isKey:false,
                  };
                  this.addInfoFormPlus={
                    projectName: "",
                    auditObject: "",
                    auditMatters: "",
                    auditSummary: "",
                  };
                  //查看当前项目下的子项
                  this.getItemBy();
                }).catch(_ => {
                });
            }
        })
        

        
      },
      edititemConfirm(){
         this.$refs["edititemInfoFormPlus"].validate(valid => {
            if (valid) {
                this.edititemInfoForm.reviews.id=this.editableTabsValue;
                this.edititemInfoForm.isKey ? this.edititemInfoForm.isKey = 1 : this.edititemInfoForm.isKey=0;
                this.edititemInfoForm.projectName=this.edititemInfoFormPlus.projectName;
                this.edititemInfoForm.auditObject=this.edititemInfoFormPlus.auditObject;
                this.edititemInfoForm.auditMatters=this.edititemInfoFormPlus.auditMatters;
                this.edititemInfoForm.auditSummary=this.edititemInfoFormPlus.auditSummary;
                util.postData(api.addItem, this.edititemInfoForm, this).then(result => {
                  this.$message({type: 'success',message: '提交成功',});
                  this.editInfoFormnextflag=false;
                  this.editVisible=false;
                  this.edititemInfoForm={
                    id:'',
                    reviews:{
                      id:'',
                    },
                    data:'',
                    subsetsFile1:'',
                    subsetsFile2:'',
                    subsetsFile3:'',
                    subsetsFile4:'',
                    subsetsFile5:'',
                    isKey:false,
                  };
                  this.edititemInfoFormPlus={
                    projectName: "",
                    auditObject: "",
                    auditMatters: "",
                    auditSummary: "",
                  };
                  //查看当前项目下的子项
                  this.getItemBy();
                }).catch(_ => {
                });
            }
        })
      },
      nextstep(){
         this.$refs["newInfoForm"].validate(valid => {
            if (valid) {
              if(this.newInfoForm.reviewsRulesList.length>0){
                this.nextflag=true;
              }else{
                this.$message({type: 'error',message: '至少添加1条规则!'});
              }
            }
         })
      },
      nextstepEdit(){
         this.$refs["editInfoForm"].validate(valid => {
            if (valid) {
              if(this.editInfoForm.reviewsRulesList.length>0){
                this.nextflagEdit=true;
              }else{
                this.$message({type: 'error',message: '至少添加1条规则!'});
              }
            }
         })
      },
      
      //增加项目
      newSubmit(){
         this.$refs["newInfoFormPlus"].validate(valid => {
            if (valid) {
                let projectItem=JSON.parse(JSON.stringify(this.newInfoForm));
                let projectItemPlus=JSON.parse(JSON.stringify(this.newInfoFormPlus));
                let para={
                  reviewProject:projectItem.reviewProject,
                  defaultSubsets:projectItem.defaultSubsets,
                  reviewsRulesList:projectItem.reviewsRulesList,
                  projectName:projectItemPlus.projectName,
                  auditMatters:projectItemPlus.auditMatters,
                  auditProcess:projectItemPlus.auditProcess,
                };
                util.postData(api.reviewSave, para, this).then(result => {
                    this.newInfoForm={
                      reviewProject:'',
                      reviewsRulesList:[],
                      defaultSubsets:'',
                    };
                    this.newInfoFormPlus={
                      projectName:'',
                      auditMatters:'',
                      auditProcess:'',
                    };
                    this.newdialogFormVisible=false; 
                    this.nextflag=false;
                    this.$message({type: 'success',message: '提交成功',});
                    this.getList(2);
                }).catch(_ => {
                });
            }
          });
      },
      editSubmit(){
        this.$refs["editInfoFormPlus"].validate(valid => {
            if (valid) {
                let projectItem=JSON.parse(JSON.stringify(this.editInfoForm));
                let projectItemPlus=JSON.parse(JSON.stringify(this.editInfoFormPlus));
                let para={
                  id:projectItem.id,
                  reviewProject:projectItem.reviewProject,
                  defaultSubsets:projectItem.defaultSubsets,
                  reviewsRulesList:projectItem.reviewsRulesList,
                  projectName:projectItemPlus.projectName,
                  auditMatters:projectItemPlus.auditMatters,
                  auditProcess:projectItemPlus.auditProcess,
                };
                util.postData(api.reviewSave, para, this).then(result => {
                    this.editInfoForm={
                      reviewProject:'',
                      reviewsRulesList:[],
                      defaultSubsets:'',
                    };
                    this.editInfoFormPlus={
                          projectName:'',
                          auditMatters:'',
                          auditProcess:'',
                    };
                    this.editdialogFormVisible=false; 
                    this.nextflagEdit=false;
                    this.$message({type: 'success',message: '提交成功',});
                    this.getList(1);
                }).catch(_ => {
                });
            }
          });
      },
      //增加项目规则
      addRules(){
         this.$refs["allfoForm"].validate(valid => {
            if (valid) {
              if(this.newInfoForm.reviewsRulesList.length>=9){
                this.$message({type: 'error',message: '最多不能超过9条!'});
              }else{
                let parm={
                  reviewRules:this.allfoForm.reviewRules,
                  keySubsets:this.allfoForm.keySubsets,
                  normalSubsets:this.allfoForm.normalSubsets,
                };
                this.newInfoForm.reviewsRulesList.push(parm);
                this.allfoForm={};
              }
            }
          });
      },
      //编辑项目规则
      editFromRules(){
         this.$refs["alleditfoForm"].validate(valid => {
            if (valid) {
              if(this.editInfoForm.reviewsRulesList.length>=9){
                this.$message({type: 'error',message: '最多不能超过9条!'});
              }else{
                let parm={
                  reviewRules:this.alleditfoForm.reviewRules,
                  keySubsets:this.alleditfoForm.keySubsets,
                  normalSubsets:this.alleditfoForm.normalSubsets,
                };
                this.editInfoForm.reviewsRulesList.push(parm);
                this.alleditfoForm={};
              }
            }
          });
      },
      //删除项目规则
      deleteItem(index){
         this.newInfoForm.reviewsRulesList.splice(index, 1);
      },
      deleteItemedit(index){
         this.editInfoForm.reviewsRulesList.splice(index, 1);
      },
      newclosed(){
        this.newdialogFormVisible=false;
        this.nextflag=false;
      },
      
      editclosed(){
        this.editdialogFormVisible=false;
        this.nextflagEdit=false;

      },
      addTab() {
        this.newdialogFormVisible=true;
      },
      editTab(id) {
        util.getData(api.reviewById+"?id="+id, {}, this).then(result => {
            this.editInfoForm=result.result;
            this.editInfoFormPlus={
                      projectName:result.result.projectName,
                      auditMatters:result.result.auditMatters,
                      auditProcess:result.result.auditProcess,
                    };
            this.editdialogFormVisible=true;  
          }).catch(_ => {
          });
        
      },
      removeTab(id) {
        this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          util.getData(api.reviewDeleteById+"?id="+id, {}, this).then(result => {
            this.$message({type: 'success',message: '删除成功',});
            this.getList(0);
          }).catch(_ => {
          });
        }).catch(() => {
         
        });
        
        
        
      },
      getItemBy(){
        this.lowPaper={};
        util.getData(api.reviewGetById+"?id="+this.editableTabsValue, {}, this).then(result => {
          console.log(333,result.result);
          var data = new Map();
          this.addInfoFormJson =result.result.map(function(item,index){
            if(item.isKey==1){
              item.isKey=true 
            }else{
              item.isKey=false
            }
            // item.reviews.industryId=this.selectInduId;
            util.getData(api.getALlByReviewsDataId,{
              id:item.id
            }, this).then(res => {
              data.set(item.id,res.result)
              console.log(33333,data)
            }).catch(_ => {
            });
            return  item;
          })
          this.reviewsData=data;
          console.log(111111,this.activeNames);
          this.activeNames=[];
          console.log(111111,this.activeNames);
          console.log(33333,this.reviewsData)
          console.log(444,this.addInfoFormJson);
          // this.refreshInfo(this.activeNames.length>0 ? this.activeNames[0] :  null);
        }).catch(_ => {

        });
        
      },




      //获取用户列表
      getList(type){
        // let para={
        //   page:this.cuPage,
        //   pageSize:this.pageSize,
        //   columnData:{}
        // };
        // para.columnData.industryId=this.selectInduId;
        // this.selectWord=this.selectWord.replace(/^\s+|\s+$/g,"");
        // switch(this.selectType)
        // {
        //     case 1:
        //         para.columnData.name=this.selectWord;
        //         break;
        //     case 2:
        //         para.columnData.documentNumber=this.selectWord;
        //         break;
        //     default:
        //         ""
        // }
        util.getData(api.reviewAll, {}, this).then(result => {
          let res=result.result;
          console.log(res);
          this.projectJson=res;
          if(this.projectJson.length>0){
            this.editableTabsValue =( type==0 ?  res[0].id :   type==1 ?  this.editableTabsValue: res[res.length-1].id );
            console.log(120,this.editableTabsValue);
            if(this.editableTabsValue){
              this.getItemBy();
            }
          }
        }).catch(_ => {

        });
      },
      //处理日期
      changeDate(date){
        return util.formatT(new Date(date),'-');
      },
      //自查
      selfCheck: function (id){
        let reviewsDataList =this.addInfoFormJson.map(function(item,index){
            if(item.isKey){
              item.isKey=1 
            }else{
              item.isKey=0
            }
            return  item;
          })
        let para={
          createUser: localStorage.getItem('name'),
          reviewsDataList: reviewsDataList,
          reviewsId: id
        };
        console.log(1999,para);
        //调用自查接口
        util.postData(api.checkSelf, para, this).then(result => {
          console.log(11111,result);
          this.lowPaper=result.result;
            this.$message({type: 'success',message: '提交成功',});
            this.lookdialogFormVisible=true;
                    // this.getList(true);
        }).catch(_ => {
        });
      
      },
      //删除子项
      deleteproItem(id){
        this.$confirm('此操作将永久删除该子项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          util.getData(api.deleteItem+"?id="+id, {}, this).then(result => {
            this.$message({type: 'success',message: '删除成功',});
           //查询当前子项
            this.getItemBy();
          }).catch(_ => {
          });
        }).catch(() => {
         
        });
        
      },
      //删除文件
      deleteFifle: function(id,pid){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          util.getData(api.deleteReviewSheet+"?id="+id, {}, this).then(result => {
            this.$message({type: 'success',message: '删除成功',});
           //查询当前子项
            this.refreshInfo(pid);
          }).catch(_ => {
          });
        }).catch(() => {
         
        });
      },
      // 添加子项
      addItem: function () {
         this.adddialogFormVisible=true;
      },
      eidtItem: function (id) {
        util.getData(api.getRewById+"?id="+id,{}, this).then(result => {
          this.edititemInfoForm=result.result;
          this.edititemInfoForm.isKey==1 ? this.edititemInfoForm.isKey = true : this.edititemInfoForm.isKey=false;

          this.edititemInfoFormPlus.projectName=this.edititemInfoForm.projectName;
          this.edititemInfoFormPlus.auditObject=this.edititemInfoForm.auditObject;
          this.edititemInfoFormPlus.auditMatters=this.edititemInfoForm.auditMatters;
          this.edititemInfoFormPlus.auditSummary=this.edititemInfoForm.auditSummary;

          this.editVisible=true;
        }).catch(_ => {
        });
         
      },
      addclosed(){
        this.adddialogFormVisible=false;
      },
      eidtItemclosed(){
        this.editVisible=false;
      },
      nexaddItem(){
        this.$refs["addInfoForm"].validate(valid => {
            if (valid) {
              this.addInfoFormnextflag=true;
            }
        })
      },
      nexeidtItem(){
        this.$refs["edititemInfoForm"].validate(valid => {
            if (valid) {
              this.editInfoFormnextflag=true;
            }
        })
      },
      //获取审计方法配置
      auditSet(){
        util.getData(api.getAuditList+"?id="+localStorage.getItem("id"), {}, this).then(result => {
          this.options=result.result;
          console.log(444444,this.options);
        }).catch(_ => {

        });
      },
    }
  };

</script>
