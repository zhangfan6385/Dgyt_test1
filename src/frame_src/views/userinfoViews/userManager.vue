<template>
    <div class="app-container calendar-list-container"> 
       <imp-panel>
   
 <el-row slot="body" :gutter="24" style="margin-bottom: 20px;">
     <el-col :span="6" :xs="24" :sm="24" :md="6" :lg="6" style="margin-bottom: 20px;">
        <el-tree v-if="roleTree"
                 :data="roleTree"
                 ref="roleTree" 
                 highlight-current
                 :render-content="renderContent"
                 @node-click="handleNodeClick" clearable node-key="id" :props="defaultProps"></el-tree>
      </el-col>
<el-col :span="18" :xs="24" :sm="24" :md="18" :lg="18">
    <el-card class="box-card">
    <div class="filter-container">
       <el-input @keyup.enter.native="handleFilter" style="width: 120px;" class="filter-item" :placeholder="$t('userTable.USER_NAME')" v-model="listQuery.USER_NAME">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 120px;" class="filter-item" placeholder="请输入账号" v-model="listQuery.USER_DOMAIN">
      </el-input>
      <el-select clearable style="width: 100px" class="filter-item" v-model="listQuery.FLAG" :placeholder="$t('userTable.FLAG')">
        <el-option v-for="item in flagOptions" :key="item.key" :label="item.flag_name" :value="item.key">
        </el-option>
      </el-select>
       <!--
       <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      -->
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('userTable.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('userTable.add')}}</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('userTable.export')}}</el-button>
      <el-button  class="filter-item" type="primary" icon="el-icon-edit" @click="showUpload=true">上传</el-button>
    </div>
                                     <!--主界面table-->
      <el-table :key='tableKey' :data="list" :header-cell-class-name="tableRowClassName"  v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
       
       <el-table-column width="110px" align="center" label="账号类型">
        <template slot-scope="scope">
          <span>{{scope.row.AUTHENTICATION_TYPE | AUTHENTICATION_TYPEFilter}}</span>
        </template>
       </el-table-column>
        
        <el-table-column width="200px" align="center" label="账号">
        <template slot-scope="scope">
          <span>{{scope.row.USER_DOMAIN}}</span>
        </template>
       </el-table-column>

      <el-table-column width="200px" align="center" label="密码">
        <template slot-scope="scope">
          <span>{{scope.row.USER_PASS}}</span>
        </template>
       </el-table-column>

      <el-table-column width="110px" align="center" v-if='showUSER_PASS'    :label="$t('userTable.USER_PASS')" >
        <template slot-scope="scope" >
          <span>{{scope.row.USER_PASS}}</span>
        </template>
      </el-table-column>

        <el-table-column width="200px" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.USER_NAME}}</span>
        </template>
      </el-table-column>
         <el-table-column width="200px" align="center" label="员工编号">
        <template slot-scope="scope">
          <span>{{scope.row.USER_CODE}}</span>
        </template>
      </el-table-column>
     <!-- <el-table-column align="center" width="200px"  :label="$t('userTable.USER_ID')" >
        <template slot-scope="scope">
          <span>{{scope.row.USER_ID}}</span> v-if='showUSER_PASS'   
        </template>
      </el-table-column>-->
     
   
      <!-- <el-table-column width="300px" align="center" :label="$t('userTable.ORG_NAME')">
        <template slot-scope="scope">
          <span>{{scope.row.ORG_NAME}}</span>
        </template>
      </el-table-column>

     
      <el-table-column width="200px" align="center" :label="$t('userTable.USER_ERP')">
        <template slot-scope="scope">
          <span>{{scope.row.USER_ERP}}</span>
        </template>
      </el-table-column>-->
        <!--<el-table-column width="110px" align="center" :label="$t('userTable.USER_ALIAS')">
        <template slot-scope="scope">
          <span>{{scope.row.USER_ALIAS}}</span>
        </template>
      </el-table-column>-->

      <el-table-column width="110px" align="center" label="用户性别">
        <template slot-scope="scope">
          <span>{{scope.row.USER_SEX | sexFilter}}</span>
        </template>
       </el-table-column>

      <el-table-column width="110px" align="center" label="办公电话">
        <template slot-scope="scope">
          <span>{{scope.row.PHONE_OFFICE}}</span>
        </template>
       </el-table-column>

      <el-table-column width="110px" align="center" label="手机号码">
        <template slot-scope="scope">
          <span>{{scope.row.PHONE_MOBILE}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="110px" align="center" :label="$t('userTable.PHONE_ORG')">
        <template slot-scope="scope">
          <span>{{scope.row.PHONE_ORG}}</span>
        </template>
      </el-table-column>-->
      <el-table-column width="200px" align="center" label="电子邮箱">
        <template slot-scope="scope">
          <span>{{scope.row.USER_EMAIL}}</span>
        </template>
      </el-table-column>
       <!--<el-table-column width="110px" align="center" :label="$t('userTable.EMAIL_OFFICE')">
        <template slot-scope="scope">
          <span>{{scope.row.EMAIL_OFFICE}}</span>
        </template>
       </el-table-column>-->
      <el-table-column min-width="300px"  align="center" label="组织机构名称">
        <template slot-scope="scope">
          <span>{{scope.row.orgName}}</span>
        </template>
       </el-table-column>
        <el-table-column width="150px" align="center" label="关联账号">
        <template slot-scope="scope">
          <span>{{scope.row.ASSOCIATED_ACCOUNT}}</span>
        </template>
      </el-table-column>
   
         <!-- <el-table-column width="110px" align="center" :label="$t('userTable.FLAG')">
        <template slot-scope="scope">
          <el-tag>{{scope.row.FLAG | typeFilter}}</el-tag>
        </template>
       </el-table-column>-->
       <!--
       <el-table-column align="center" label="账号状态" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
         <el-button v-if="scope.row.FLAG==0" size="mini" type="success" @click="handleModifyStatus(scope.row,1)">{{$t('userTable.publish')}}
          </el-button>
          <el-button  v-if="scope.row.FLAG==1"   size="mini" @click="handleModifyStatus(scope.row,0)">{{$t('userTable.draft')}}
          </el-button>
          
        </template>
      </el-table-column>

       <el-table-column min-width="180px"  align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.REMARK}}</span>
        </template>
       </el-table-column>
       -->
     
      <el-table-column align="center" :label="$t('userTable.actions')" width="350" class-name="small-padding fixed-width">
        <template slot-scope="scope">
         <el-button type="primary" size="small" @click="handleUpdate(scope.row)">{{$t('userTable.edit')}}</el-button>
         <el-button type="primary" size="small" @click="handleUserLogin(scope.row)">关联账号</el-button>
         <el-button  type="danger" size="small" @click="handleDelete(scope.row)"  v-if='getRoleLevel'>删除</el-button>
        <el-button  type="danger" size="small" @click="handleToUser(scope.row)">{{$t('userTable.toUser')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
      <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[5,10,20, 30]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--表单form-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="120px" style='width: 400px; margin-left:20px;'>

        <el-form-item label="账号类型">
          <el-select class="filter-item" v-model="temp.AUTHENTICATION_TYPE" placeholder="Please select" @change="getvalue">
        <el-option v-for="item in typeOptions" :key="item.key" :label="item.type_name" :value="item.key" :val="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="账号" prop="USER_DOMAIN">
          <el-input v-model="temp.USER_DOMAIN"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="USER_TYPE">
            <el-radio v-model="temp.USER_TYPE" :label="0">管理员</el-radio>
            <el-radio v-model="temp.USER_TYPE" :label="1">普通用户</el-radio>
        </el-form-item>
        <el-form-item ref="password" :label="$t('userTable.USER_PASS')" prop="USER_PASS" >
          <el-input v-model="temp.USER_PASS"  type="password" auto-complete="off" :placeholder="passwordTips" :disabled="passwordVisible"></el-input>
        </el-form-item>

        <el-form-item ref="repassword" label="确认密码" prop="USER_PASS2">
          <el-input type="password" v-model="temp.USER_PASS2" auto-complete="off" :placeholder="passwordTips1"  :disabled="passwordVisible"></el-input>
        </el-form-item>

        <el-form-item :label="$t('userTable.USER_NAME')" prop="USER_NAME">
          <el-input v-model="temp.USER_NAME"></el-input>
        </el-form-item>

        <el-form-item :label="$t('userTable.USER_CODE')" prop="USER_CODE">
          <el-input v-model="temp.USER_CODE"></el-input>
        </el-form-item>

        <el-form-item :label="$t('userTable.USER_SEX')">
          <el-select class="filter-item" v-model="temp.USER_SEX" placeholder="Please select">
        <el-option v-for="item in sexOptions" :key="item.key" :label="item.sex_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
       <!-- <el-form-item :label="$t('userTable.USER_ERP')" prop="USER_ERP">
          <el-input v-model="temp.USER_ERP"></el-input>
        </el-form-item>-->
       <!--<el-form-item :label="$t('userTable.USER_ALIAS')" prop="USER_ALIAS">
          <el-input v-model="temp.USER_ALIAS" ></el-input>
        </el-form-item>-->
         <el-form-item :label="$t('userTable.PHONE_OFFICE')" prop="PHONE_OFFICE">
          <el-input v-model="temp.PHONE_OFFICE"></el-input>
        </el-form-item>

        <el-form-item :label="$t('userTable.PHONE_MOBILE')" prop="PHONE_MOBILE">
          <el-input v-model="temp.PHONE_MOBILE"></el-input>
        </el-form-item>
         <!--<el-form-item :label="$t('userTable.PHONE_ORG')" prop="PHONE_ORG">
          <el-input v-model="temp.PHONE_ORG"></el-input>
        </el-form-item>-->
         <el-form-item :label="$t('userTable.USER_EMAIL')" prop="USER_EMAIL">
          <el-input v-model="temp.USER_EMAIL"></el-input>
        </el-form-item>
         <!--<el-form-item :label="$t('userTable.EMAIL_OFFICE')" prop="EMAIL_OFFICE">
          <el-input v-model="temp.EMAIL_OFFICE"></el-input>
        </el-form-item>-->      
         <el-form-item :label="$t('userTable.FLAG')">
          <el-select class="filter-item" v-model="temp.FLAG" placeholder="Please select">
        <el-option v-for="item in flagOptions" :key="item.key" :label="item.flag_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('userTable.REMARK')">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="备注" v-model="temp.REMARK">
          </el-input>
        </el-form-item>
      </el-form> 
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('userTable.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('userTable.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('userTable.confirm')}}</el-button>
      </div>
    </el-dialog>
    
    <!-- 分配dialog-->
 <el-dialog  :visible.sync="userLoginVisible">
  <el-card class="box-card">
   <div class="filter-container">
       <el-input @keyup.enter.native="handleUserFilter" style="width: 100px;" class="filter-item" :placeholder="$t('userTable.USER_NAME')" v-model="listUserQuery.USER_NAME">
      </el-input>
     
   
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleUserFilter">{{$t('userTable.search')}}</el-button>
      <el-button class="filter-item"  @click="updateRole" type="primary" icon="el-icon-edit">{{$t('roleTable.mount')}}</el-button>
     <el-button class="filter-item"  @click="deleteRole" type="primary" icon="el-icon-edit">{{$t('userTable.deleteRole')}}</el-button>
   
     </div>
      <el-table :key='tableKey' :data="userList" :header-cell-class-name="tableRowClassName"   @selection-change="handleSelectionChange" v-loading="listUserLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
   
         <el-table-column 
          prop="id"
          type="selection"
          width="50"> 
        </el-table-column>

  <el-table-column width="110px" align="center" :label="$t('userTable.USER_DOMAIN')">
        <template slot-scope="scope">
          <span>{{scope.row.USER_DOMAIN}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('userTable.USER_NAME')">
        <template slot-scope="scope">
          <span>{{scope.row.USER_NAME}}</span>
        </template>
      </el-table-column>
       <el-table-column width="110px" align="center" :label="$t('userTable.USER_CODE')">
        <template slot-scope="scope">
          <span>{{scope.row.USER_CODE}}</span>
        </template>
      </el-table-column>
       <el-table-column min-width="110px"  align="center" :label="$t('userTable.LOGIN_REMARK')">
        <template slot-scope="scope">
          <span>{{scope.row.LOGIN_REMARK}}</span>
        </template>
       </el-table-column>
    </el-table>
      <div class="pagination-container">
      <el-pagination background @size-change="handleSizeUserChange" @current-change="handleCurrentUserChange" :current-page="listUserQuery.page" :page-sizes="[5,10,20, 30]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total2">
      </el-pagination>
    </div> 
    </el-card>
    </el-dialog>
     <el-dialog  :visible.sync="showUpload">
   <el-card class="box-card">
       <div class="filter-container">
       <!-- <el-upload
          class="upload-demo"
          ref="upload"
           :action="urlUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :headers="headers"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
         </el-upload> -->

          <el-upload
            class="upload-demo"
              ref="upload"
            :action="urlUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
            :before-remove="beforeRemove"
            :headers="headers"
            :file-list="fileList">
            <el-button   class="filter-item"  type="primary" icon="el-icon-edit">点击上传</el-button>
          </el-upload>
          <a :href="urldownload">模板下載</a>
     </div>
    </el-card>
  </el-dialog>
       </el-card>
      </el-col>
    </el-row>
    </imp-panel>
    </div>
 
</template>
<script>
import {
  // fetchUserList,
  createUserArticle,
  updateUserData,
  updateUserArticle,
  updateUserFlag,
  fetchUserForLoginList,
  fetchUserOrgList,
  fetchUserpParentList
} from "@/frame_src/api/user";
import { fetchOrgList } from "@/frame_src/api/org";
import {
  updateUserForLoginArticle,
  deleteUserForLoginArticle
} from "@/frame_src/api/userlogin";
import waves from "@/frame_src/directive/waves"; // 水波纹指令
import panel from "@/frame_src/components/TreeList/panel.vue";
import { getToken } from "@/frame_src/utils/auth";
// import { parseTime } from '@/frame_src/utils'
const flagOptions = [
  { key: 0, flag_name: "禁用" },
  { key: 1, flag_name: "激活" }
];
const sexOptions = [{ key: 0, sex_name: "女" }, { key: 1, sex_name: "男" }];
const typeOptions = [
  { key: 0, type_name: "本地账号" },
  { key: 1, type_name: "PTR账号" }
];
const userTypeOptions = [
  { key: 0, user_type_name: "管理员" },
  { key: 1, user_type_name: "普通用户" }
];
const userTypeKeyValue = userTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.user_type_name;
  return acc;
}, {});
// arr to obj ,such as { CN : "China", US : "USA" }
const flagOptionsKeyValue = flagOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.flag_name;
  return acc;
}, {});
const sexOptionsKeyValue = sexOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.sex_name;
  return acc;
}, {});
const AUTHENTICATION_TYPEFilterOptionsKeyValue = typeOptions.reduce(
  (acc, cur) => {
    acc[cur.key] = cur.type_name;
    return acc;
  }, {});
export default {
  name: "userManager",
  directives: {
    waves
  },
  components: {
    "imp-panel": panel
  },
  data() {
    // validateField:对部分表单字段进行校验的方法
    const validateNewpassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.temp.USER_PASS2 !== "") {
          this.$refs.dataForm.validateField("USER_PASS2");
        }
        callback();
      }
    };
    const validateSurepassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.temp.USER_PASS) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      showUpload: false,
      urlUpload: process.env.BASE_API + "user/uploadUserArticle",
      urldownload:process.env.BASE_API+"ExcelModel/用户.xlsx",
      fileList: [],
      tableKey: 0,
      list: null,
      userList: null,
      parentlist: null,
      total: null,
      total2: null,
      listLoading: true,
      userLoginVisible: false,
      listUserLoading: true,
      tableUserKey: undefined,
      tableUserKey2: undefined,
      multipleSelection: [],
      roleTree: [],
      orgKey: undefined,
      passwordvalidate: 1,
      passwordVisible: false,
      // passwordTips: "PTR账号无需输入此项",
      // passwordTips1: "PTR账号无需输入此项",
      passwordTips: "请输入密码",
      passwordTips1: "请再次输入密码",
      defaultProps: {
        children: "children",
        label: "orgShortName",
        id: "id"
      },
      treeListQuery: {},
      listUpdate: {
        field: undefined,
        FLAG: undefined,
        USER_ID: undefined
      },
      listUserQuery: {
        page: 1,
        limit: 5,
        USER_NAME: undefined,
        sort: "+USER_ID",
        LOGIN_ID: undefined
      },
      userForLoginUpdate: {
        LOGIN_ID: undefined,
        arr: []
      },
      listQuery: {
        page: 1,
        limit: 5,
        USER_NAME: undefined,
        USER_ID: "",
        USER_DOMAIN: "",
        sort: "+USER_ID",
        orgId: undefined
      },
      flagOptions,
      sexOptions,
      typeOptions,
      statusOptions: ["published", "draft", "deleted"],
      sortOptions: [
        { label: "正序", key: "+USER_ID" },
        { label: "倒序", key: "-USER_ID" }
      ],
      showUSER_PASS: false,
      temp: {
        USER_ID: undefined,
        USER_CODE: "",
        USER_TYPE:undefined,
        USER_NAME: "",
        ORG_NAME: "",
        USER_ALIAS: "",
        USER_PASS: "",
        USER_PASS2: "",
        PHONE_MOBILE: "",
        PHONE_OFFICE: "",
        PHONE_ORG: "",
        USER_EMAIL: "",
        EMAIL_OFFICE: "",
        USER_IP: "",
        FLAG: "",
        USER_DOMAIN: "",
        REMARK: "",
        USER_ERP: "",
        AUTHENTICATION_TYPE: 0,
        ASSOCIATED_ACCOUNT: "",
        USER_SEX: undefined,
        orgName: "",
        orgId: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "修改用户",
        create: "创建用户"
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        FLAG: [
          { required: true, message: "FLAG is required", trigger: "change" }
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change"
          }
        ],
        USER_DOMAIN: [
          { required: true, message: "用户账号不能为空", trigger: "change" }
        ],
        USER_NAME: [
          { required: true, message: "用户名称不能为空", trigger: "change" }
        ],
        USER_PASS: [
          { required: true, validator: validateNewpassword, trigger: "blur" }
        ],
        USER_PASS2: [
          { required: true, validator: validateSurepassword, trigger: "blur" }
        ],
        USER_TYPE: [
            { required: true, message: '请选择用户类型', trigger: 'change' }
        ],
      },
      downloadLoading: false
    };
  },
  filters: {
    typeFilter(type) {
      return flagOptionsKeyValue[type];
    },
    sexFilter(type) {
      return sexOptionsKeyValue[type];
    },
    AUTHENTICATION_TYPEFilter(type) {
      return AUTHENTICATION_TYPEFilterOptionsKeyValue[type];
    }
  },
  watch: {
    // 监听器，当multipleSelection 发生改变时
    multipleSelection: function() {
      // 把选中的数据id放到数组里，以便后期传值用
      this.arr = [];
      for (const i in this.multipleSelection) {
        this.arr.push(this.multipleSelection[i].USER_ID);
      }
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchUserOrgList(this.listQuery).then(response => {
        if (response.data.code === 2000) {
          this.list = response.data.items;
          this.total = response.data.total;
          this.listLoading = false;
        } else {
          this.listLoading = false;
          this.$notify({   position: 'bottom-right',
            title: "失败",
            message: response.data.message,
            type: "error",
            duration: 2000
          });
        }
      });
    },
    getListUser() {
      // 查询组织结构对应的用户数据
      this.listUserLoading = true;
      fetchUserForLoginList(this.listUserQuery).then(response => {
        if (response.data.code === 2000) {
          if(response.data.items.length>0){
            this.userList = response.data.items;
          this.total2 = response.data.total;
          }
          else{
            this.userList = null;
          this.total2 = 0;
          }
          this.listUserLoading = false;
        } else {
          this.listUserLoading = false;
          this.$notify({   position: 'bottom-right',
            title: "失败",
            message: response.data.message,
            type: "error",
            duration: 2000
          });
        }
      });
    },
    handleUserLogin(row) {
      // 打开修改表单
      this.temp = Object.assign({}, row); // copy obj
      this.tableUserKey = row.USER_ID;
      this.tableUserKey2 = row.USER_ID;
      
      this.listUserQuery.USER_ID = row.USER_ID;
      this.getListUser(this.listUserQuery);
      this.userLoginVisible = true;
    },
    renderContent(h, { node, data, store }) {
      // 给左边树进行遍历
      return (
        <span>
          <span>
            <span>{node.label}</span>
          </span>
        </span>
      );
    },
    handleNodeClick(data) {
      // 点击左侧树查询对应的用户信息
      this.listLoading = true;
      this.orgkey = this.$refs.roleTree.getCurrentKey();
      this.listQuery.orgId = this.orgkey;
      fetchUserOrgList(this.listQuery).then(response => {
        if (response.data.code === 2000) {
          this.list = response.data.items;
          this.total = response.data.total;
          this.listLoading = false;
        } else {
          this.listLoading = false;
          this.$notify({   position: 'bottom-right',
            title: "失败",
            message: response.data.message,
            type: "error",
            duration: 2000
          });
        }
      });
    },
    load() {
      // 查询组织结构数据this.treeListQuery
      fetchOrgList().then(response => {
        if (response.data.code === 2000) {
          this.roleTree = [];
          this.roleTree = response.data.items;
        } else {
          this.$notify({   position: 'bottom-right',
            title: "失败",
            message: response.data.message,
            type: "error",
            duration: 2000
          });
        }
      });
      // this.roleTree.push(...defaultValue.roleList);
    },
    getParentUser(data) {//搜索关联账号
      fetchUserpParentList(data).then(response => {
        if (response.data.code === 2000) {
          if(response.data.items.length>0){
             this.userList = response.data.items;
          this.total2 = response.data.total;
          }
         
          this.listUserLoading = false;
        } else {
          this.listUserLoading = false;
          this.$notify({   position: 'bottom-right',
            title: "失败",
            message: response.data.message,
            type: "error",
            duration: 2000
          });
        }
      });
    },
    resetTemp() {
      this.temp = {
        USER_ID: undefined,
        USER_CODE: "",
        USER_TYPE:undefined,
        USER_NAME: "",
        USER_ALIAS: "",
        USER_PASS: "",
        USER_PASS2: "",
        PHONE_MOBILE: "",
        PHONE_OFFICE: "",
        PHONE_ORG: "",
        USER_EMAIL: "",
        EMAIL_OFFICE: "",
        USER_IP: "",
        USER_SEX: 1,
        AUTHENTICATION_TYPE: 0,
        FLAG: 1,
        ASSOCIATED_ACCOUNT: "",
        USER_DOMAIN: "",
        USER_ERP: "",
        REMARK: "",
        orgName: "",
        orgId: ""
      };
    },
    handleUpdate(row) {
      // 打开修改表单
      this.temp = Object.assign({}, row); // copy obj
      this.temp.USER_PASS2 = row.USER_PASS;
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleCreate() {
      // 打开创建表单
      if (this.orgkey == null) {
        this.$notify({   position: 'bottom-right',
          // 判断右边记录的勾选数据 和左侧树选中的key值是否为0或者空
          title: "失败",
          message: "请选择组织结构",
          type: "error",
          duration: 2000
        });
      } else {
        this.resetTemp();
        this.dialogStatus = "create";
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs["dataForm"].clearValidate();
        });
      }
      
    },
    updateData() {
      if (this.passwordvalidate === 1) {
        const tempData = Object.assign({}, this.temp); // 这样就不会共用同一个对象
        tempData.orgId = this.orgkey;
        updateUserData(tempData).then(response => {
          var message = response.data.message;
          var title = "失败";
          var type = "error";
          if (response.data.code === 2000) {
            title = "成功";
            type = "success";
            this.getList();
            // for (const v of this.list) {
            //   if (v.id === this.temp.id) {
            //     const index = this.list.indexOf(v)
            //     this.list.splice(index, 1, this.temp)
            //     break
            //   }
            // }
          }
          this.dialogFormVisible = false;
          this.$notify({   position: 'bottom-right',
            title: title,
            message: message,
            type: type,
            duration: 2000
          });
        });
      } else if (this.passwordvalidate === 0) {
        this.$refs["dataForm"].validate(valid => {
          if (valid) {
            const tempData = Object.assign({}, this.temp); // 这样就不会共用同一个对象
            tempData.orgId = this.orgkey;
            updateUserData(tempData).then(response => {
              var message = response.data.message;
              var title = "失败";
              var type = "error";
              if (response.data.code === 2000) {
                title = "成功";
                type = "success";
                this.getList();
                // for (const v of this.list) {
                //   if (v.id === this.temp.id) {
                //     const index = this.list.indexOf(v)
                //     this.list.splice(index, 1, this.temp)
                //     break
                //   }
                // }
              }
              this.dialogFormVisible = false;
              this.$notify({   position: 'bottom-right',
                title: title,
                message: message,
                type: type,
                duration: 2000
              });
            });
          }
        });
      }
    },
    handleDelete(row) {
      this.$confirm('确认删除记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
 this.temp = Object.assign({}, row); // copy obj
      this.listUpdate.USER_ID = this.temp.USER_ID;
      this.listUpdate.field = "deletaStatus";
      updateUserArticle(this.listUpdate).then(response => {
        this.message = response.data.message;
        this.title = "失败";
        this.type = "error";
        if (response.data.code === 2000) {
          // const index = this.list.indexOf(row)
          // this.list.splice(index, 1)
          this.getList();
          this.title = "成功";
          this.type = "success";
        }
        this.$notify({   position: 'bottom-right',
          title: this.title,
          message: this.message,
          type: this.type,
          duration: 2000
        });
      });
  }).catch(() => {
        });
    },
    createData() {
      if (this.passwordvalidate === 1) {
        const tempData = Object.assign({}, this.temp); // 这样就不会共用同一个对象
        tempData.orgId = this.orgkey;
        this.temp.USER_PASS = "";
        createUserArticle(tempData).then(response => {
          var message = response.data.message;
          var title = "失败";
          var type = "error";
          if (response.data.code === 2000) {
            title = "成功";
            type = "success";
            this.getList();
            // for (const v of this.list) {
            //   if (v.id === this.temp.id) {
            //     const index = this.list.indexOf(v)
            //     this.list.splice(index, 1, this.temp)
            //     break
            //   }
            // }
          }
          this.dialogFormVisible = false;
          this.$notify({   position: 'bottom-right',
            title: title,
            message: message,
            type: type,
            duration: 2000
          });
        });
      } else if (this.passwordvalidate === 0) {
        this.$refs["dataForm"].validate(valid => {
          if (valid) {
            const tempData = Object.assign({}, this.temp); // 这样就不会共用同一个对象
            tempData.orgId = this.orgkey;
             createUserArticle(tempData).then(response => {
              var message = response.data.message;
              var title = "失败";
              var type = "error";
              if (response.data.code === 2000) {
                title = "成功";
                type = "success";
                this.getList();
                // for (const v of this.list) {
                //   if (v.id === this.temp.id) {
                //     const index = this.list.indexOf(v)
                //     this.list.splice(index, 1, this.temp)
                //     break
                //   }
                // }
              }
              this.dialogFormVisible = false;
              this.$notify({   position: 'bottom-right',
                title: title,
                message: message,
                type: type,
                duration: 2000
              });
            });
          }
        });
      }
    },
    handleModifyStatus(row, status) {
      // 修改是否激活
      this.temp = Object.assign({}, row); // copy obj
      this.listUpdate.USER_ID = this.temp.USER_ID;
      this.listUpdate.field = "FLAG";
      this.listUpdate.FLAG = status;

      updateUserFlag(this.listUpdate).then(response => {
        this.message = response.data.message;
        this.title = "失败";
        this.type = "error";
        if (response.data.code === 2000) {
          // row.FLAG = status
          this.getList();
          this.title = "成功";
          this.type = "success";
        }

        this.$notify({   position: 'bottom-right',
          title: this.title,
          message: this.message,
          type: this.type,
          duration: 2000
        });
      });
    },
    handleSelectionChange(val) {
      // 勾选右边表格时记录勾选的数据
      this.multipleSelection = val;
    },
    updateRole() {
      // 修改组织结构权限
      if (this.multipleSelection.length <= 0 || this.tableUserKey2 == null) {
        this.$notify({   position: 'bottom-right',
          // 判断右边记录的勾选数据 和原窗口的登陆账号是否为0或者空
          title: "失败",
          message: "请选择登陆账号和用户",
          type: "error",
          duration: 2000
        });
      } else {
        this.userForLoginUpdate.LOGIN_ID = this.tableUserKey2; // 原窗口的登陆账号
        this.userForLoginUpdate.arr = this.arr; // 右边选中的集合
        updateUserForLoginArticle(this.userForLoginUpdate).then(response => {
          // 给登陆账号关联用户
          var message = response.data.message;
          var title = "失败";
          var type = "error";
          if (response.data.code === 2000) {
            title = "成功";
            type = "success";
            this.arr = [];
            this.getList();
            //this.getListUser();
            this.getParentUser(this.listUserQuery);
            this.userLoginVisible = false;
          }
          this.$notify({   position: 'bottom-right',
            title: title,
            message: message,
            type: type,
            duration: 2000
          });
        });
      }
    },
    deleteRole() {
      // 给用户分配角色权限
      if (this.multipleSelection.length <= 0|| this.tableUserKey2 == null) {
        this.$notify({   position: 'bottom-right',
          title: "失败",
          message: "请选择用户",
          type: "error",
          duration: 2000
        });
      } else {
        this.$confirm("将永久删除该用户分配的登陆账号, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.userForLoginUpdate.arr = this.arr; // 右边选中的集合
            this.userForLoginUpdate.LOGIN_ID = this.tableUserKey2;
            deleteUserForLoginArticle(this.userForLoginUpdate).then(
              response => {
                // 给用户分配组织结构权限
                var message = response.data.message;
                var title = "失败";
                var type = "error";
                if (response.data.code === 2000) {
                  title = "成功";
                  type = "success";
                  this.arr = [];
                  this.getList();
                  this.getListUser();
                  //this.getParentUser(this.listUserQuery);
                  this.userLoginVisible = false;
                }
                this.$notify({   position: 'bottom-right',
                  title: title,
                  message: message,
                  type: type,
                  duration: 2000
                });
              }
            );
          })
          .catch(() => {
            this.$notify({   position: 'bottom-right',
              title: "失败",
              message: "已取消清空",
              type: "error",
              duration: 2000
            });
          });
      }
    },

    handleSizeUserChange(val) {
      this.listUserQuery.limit = val;
      this.listUserQuery.LOGIN_ID = this.tableUserKey;
     this.getParentUser(this.listUserQuery);
    },
    handleCurrentUserChange(val) {
      this.listUserQuery.page = val;
      this.listUserQuery.LOGIN_ID = this.tableUserKey;
      this.getParentUser(this.listUserQuery);
    },
    handleUserFilter() {
      this.listUserQuery.page = 1;
      this.orgKey = undefined;
      this.tableUserKey = undefined;
      this.listUserQuery.LOGIN_ID = this.tableUserKey;
      this.getParentUser(this.listUserQuery);
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.listQuery.orgId = this.orgKey;
      this.getParentUser(this.listUserQuery);
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.listQuery.orgId = this.orgKey;
     this.getParentUser(this.listUserQuery);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(res, file, fileList) {
      var message = res.message;
      var title = "失败";
      var type = "error";
      if (res.code === 2000) {
        this.getList();
        this.load();
        title = "成功";
        type = "success";
        this.showUpload = false;
      }
      this.$notify({   position: 'bottom-right',
        title: title,
        message: message,
        type: type,
        duration: 2000
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleToUser(row) {
      this.$store.dispatch("setUserId", row.USER_ID);
      this.$store.dispatch("setCode", "");
      this.$router.push({ path: "/" });
    },
    handleDownload() {
      // 导出
      this.downloadLoading = true;
      import("@/frame_src/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "用户编号",
          "用户类型",
          "用户名称",
          "用户别名",
          "电话-移动",
          "电话-办公",
          "电话-分机号",
          "电子邮箱-常用",
          "电子邮箱-办公",
          "IP地址列表",
          "性别",
          "是否激活",
          "域账户",
          "备注"
        ];
        const filterVal = [
          "USER_CODE",
          "USER_TYPE",
          "USER_NAME",
          "USER_ALIAS",
          "PHONE_MOBILE",
          "PHONE_OFFICE",
          "PHONE_ORG",
          "USER_EMAIL",
          "EMAIL_OFFICE",
          "USER_IP",
          "USER_SEX",
          "AUTHENTICATION_TYPE",
          "USER_DOMAIN",
          "REMARK"
        ];
        const data = this.formatJson(filterVal, this.list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "用户信息表"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "FLAG") {
            return flagOptionsKeyValue[v[j]];
          }
          if(j==="USER_TYPE")
          {
            return userTypeKeyValue[v[j]];
          }
          if (j === "USER_SEX") {
            return sexOptionsKeyValue[v[j]];
          } else if (j === "AUTHENTICATION_TYPE") {
            return AUTHENTICATION_TYPEFilterOptionsKeyValue[v[j]];
          } else {
            return v[j];
          }
        })
      );
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.orgKey = undefined;
      this.listQuery.orgId = this.orgKey;
      this.getList();
    },
    tableRowClassName({ row, rowIndex }) {
      // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    },
    getvalue(value) {
      if (value === 0) {
        this.$refs["dataForm"].resetFields();
        this.passwordvalidate = 0;
        this.passwordVisible = false;
        this.passwordTips = "请输入密码";
        this.passwordTips1 = "请再次输入密码";
        // this.$refs['USER_PASS'].validate()
        // this.$refs['USER_PASS2'].validate()
        this.$refs['password'].validate();
        this.$refs['repassword'].validate();

      } else {
        this.$refs["dataForm"].resetFields();
        this.passwordvalidate = 1;
        this.passwordVisible = true;
        this.passwordTips = "PTR账号无需输入此项";
        this.passwordTips1 = "PTR账号无需输入此项";
        this.$refs['password'].clearValidate();
        this.$refs['repassword'].clearValidate();
      }
    }
  },
  created() {
    this.getList();
    this.load();
  },
  computed: {
    getRoleLevel() {
      if (this.$store.state.user.roleLevel === "admin") {
        return true;
      } else {
        return true;
      }
    },
    headers() {
      return {
        "X-Token": getToken()
      };
    }
  }
};
</script>
<style lang="scss" scoped>
</style>