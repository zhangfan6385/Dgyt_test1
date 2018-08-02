<template>
    <div class="app-container calendar-list-container"> 
    <div class="filter-container">
       <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('userLoginTable.LOGIN_REMARK')" v-model="listQuery.LOGIN_REMARK">
      </el-input>
      
       <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('userLoginTable.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('userLoginTable.add')}}</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('userLoginTable.export')}}</el-button>
 
    </div>
      <el-table :key='tableKey' :data="list" :header-cell-class-name="tableRowClassName"  v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
   
      <el-table-column align="center" v-if='showUSER_PASS'  :label="$t('userLoginTable.LOGIN_ID')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.LOGIN_ID}}</span>
        </template>
      </el-table-column>
       <el-table-column width="150px" align="center" :label="$t('userLoginTable.LOGIN_CODE')">
        <template slot-scope="scope">
          <span>{{scope.row.LOGIN_CODE}}</span>
        </template>
       </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('userLoginTable.LOGIN_REMARK')">
        <template slot-scope="scope">
          <span>{{scope.row.LOGIN_REMARK}}</span>
        </template>
      </el-table-column>
       <el-table-column width="150px" align="center" :label="$t('userLoginTable.USER_NAME')">
        <template slot-scope="scope">
          <span>{{scope.row.USER_NAME}}</span>
        </template>
      </el-table-column>
     <el-table-column width="150px" align="center" v-if='showUSER_PASS'  :label="$t('userLoginTable.LOGIN_PASS')" >
        <template slot-scope="scope" >
          <span>{{scope.row.LOGIN_PASS}}</span>
        </template>
      </el-table-column>
     
      <el-table-column align="center" :label="$t('userLoginTable.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('userLoginTable.edit')}}</el-button>
          <el-button type="primary" size="mini" @click="handleUserLogin(scope.row)">{{$t('userLoginTable.editUser')}}</el-button>
         
         <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{$t('userLoginTable.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
      <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[5,10,20, 30]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="120px" style='width: 400px; margin-left:20px;'>
       <el-form-item :label="$t('userLoginTable.LOGIN_CODE')" prop="LOGIN_CODE">
          <el-input v-model="temp.LOGIN_CODE"></el-input>
        </el-form-item>
        <el-form-item :label="$t('userLoginTable.LOGIN_REMARK')" prop="LOGIN_REMARK">
          <el-input v-model="temp.LOGIN_REMARK"></el-input>
        </el-form-item>
      </el-form> 
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('userLoginTable.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('userLoginTable.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('userLoginTable.confirm')}}</el-button>
      </div>
    </el-dialog>
     <el-dialog  :visible.sync="userLoginVisible">
  <el-card class="box-card">
   
    <div class="filter-container">
       <el-input @keyup.enter.native="handleUserFilter" style="width: 100px;" class="filter-item" :placeholder="$t('userTable.USER_NAME')" v-model="listUserQuery.USER_NAME">
      </el-input>
     
   
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleUserFilter">{{$t('userTable.search')}}</el-button>
      <el-button class="filter-item"  @click="updateRole" type="primary" icon="el-icon-edit">{{$t('roleTable.mount')}}</el-button>
     <el-button class="filter-item"  @click="deleteRole" type="primary" icon="el-icon-edit">{{$t('roleTable.deleteRole')}}</el-button>
   
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

    </div>
</template>
<script>
import {
  fetchUserLoginList,
  createUserLoginArticle,
  updateUserLoginData,
  updateUserLoginArticle,
  updateUserForLoginArticle,
  deleteUserForLoginArticle
} from '@/frame_src/api/userlogin'
import { fetchUserForLoginList } from '@/frame_src/api/user'
import waves from '@/frame_src/directive/waves' // 水波纹指令
// import { parseTime } from '@/frame_src/utils'

export default {
  name: 'userLoginManager',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      userList: null,
      total: null,
      total2: null,
      listLoading: true,
      listUserLoading: true,
      tableUserKey: undefined,
      tableUserKey2: undefined,
      arr: [],
      listUpdate: {
        field: undefined,
        FLAG: undefined,
        LOGIN_ID: undefined
      }, userForLoginUpdate: {
        LOGIN_ID: undefined,
        arr: []
      },
      multipleSelection: [],
      listUserQuery: {
        page: 1,
        limit: 5,
        USER_NAME: undefined,
        sort: '+USER_ID',
        LOGIN_ID: undefined
      },
      listQuery: {
        page: 1,
        limit: 5,
        LOGIN_REMARK: undefined,
        sort: '+LOGIN_ID'
      },
      statusOptions: ['published', 'draft', 'deleted'],
      sortOptions: [
        { label: '正序', key: '+LOGIN_ID' },
        { label: '倒序', key: '-LOGIN_ID' }
      ],
      showUSER_PASS: false,
      temp: {
        LOGIN_ID: undefined,
        LOGIN_CODE: '',
        LOGIN_PASS: '',
        LOGIN_REMARK: ''
      },
      dialogFormVisible: false,
      userLoginVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改账号',
        create: '创建账号'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        LOGIN_CODE: [
          { required: true, message: '登陆账号不能为空', trigger: 'change' }
        ],
        LOGIN_REMARK: [
          { required: true, message: '账号名称不能为空', trigger: 'change' }
        ]
      },
      downloadLoading: false
    }
  },
  filters: {
  }, watch: { // 监听器，当multipleSelection 发生改变时
    multipleSelection: function() { // 把选中的数据id放到数组里，以便后期传值用
      this.arr = []
      for (const i in this.multipleSelection) {
        this.arr.push(this.multipleSelection[i].USER_ID)
      }
    }
  },
  methods: {
    getListUser() { // 查询组织结构对应的用户数据
      this.listUserLoading = true
      fetchUserForLoginList(this.listUserQuery).then(response => {
        if (response.data.code === 2000) {
          this.userList = response.data.items
          this.total2 = response.data.total
          this.listUserLoading = false
        } else {
          this.listUserLoading = false
          this.$notify({   position: 'bottom-right',
            title: '失败',
            message: response.data.message,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    getList() {
      this.listLoading = true
      fetchUserLoginList(this.listQuery).then(response => {
        if (response.data.code === 2000) {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
        } else {
          this.listLoading = false
          this.$notify({   position: 'bottom-right',
            title: '失败',
            message: response.data.message,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    resetTemp() {
      this.temp = {
        LOGIN_ID: undefined,
        LOGIN_CODE: '',
        LOGIN_PASS: '111111',
        LOGIN_REMARK: ''
      }
    },
    handleUserLogin(row) { // 打开修改表单
      this.temp = Object.assign({}, row) // copy obj
      this.tableUserKey = row.LOGIN_ID
      this.tableUserKey2 = row.LOGIN_ID
      this.listUserQuery.LOGIN_ID = this.tableUserKey
      this.getListUser()
      this.userLoginVisible = true
    },
    handleUpdate(row) { // 打开修改表单
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreate() { // 打开创建表单
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp) // 这样就不会共用同一个对象
          updateUserLoginData(tempData).then(response => {
            var message = response.data.message
            var title = '失败'
            var type = 'error'
            if (response.data.code === 2000) {
              title = '成功'
              type = 'success'
              this.getList()
              // for (const v of this.list) {
              //   if (v.id === this.temp.id) {
              //     const index = this.list.indexOf(v)
              //     this.list.splice(index, 1, this.temp)
              //     break
              //   }
              // }
            }
            this.dialogFormVisible = false
            this.$notify({   position: 'bottom-right',
              title: title,
              message: message,
              type: type,
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.listUpdate.LOGIN_ID = this.temp.LOGIN_ID
      this.listUpdate.field = 'deletaStatus'
      updateUserLoginArticle(this.listUpdate).then(response => {
        this.message = response.data.message
        this.title = '失败'
        this.type = 'error'
        if (response.data.code === 2000) {
          // const index = this.list.indexOf(row)
          // this.list.splice(index, 1)
          this.getList()
          this.title = '成功'
          this.type = 'success'
        }
        this.$notify({   position: 'bottom-right',
          title: this.title,
          message: this.message,
          type: this.type,
          duration: 2000
        })
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          // this.temp.USER_ID = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = "ppp" //当前登陆人
          createUserLoginArticle(this.temp).then(response => {
            var message = response.data.message
            var title = '失败'
            var type = 'error'
            if (response.data.code === 2000) {
              title = '成功'
              type = 'success'
              // this.list.unshift(this.temp)
              this.getList()
            }
            this.dialogFormVisible = false
            this.$notify({   position: 'bottom-right',
              title: title,
              message: message,
              type: type,
              duration: 2000
            })
          })
        }
      })
    }, updateRole() { // 修改组织结构权限
      if (this.multipleSelection.length <= 0 || this.tableUserKey2 == null) {
        this.$notify({   position: 'bottom-right',// 判断右边记录的勾选数据 和原窗口的登陆账号是否为0或者空
          title: '失败',
          message: '请选择登陆账号和用户',
          type: 'error',
          duration: 2000
        })
      } else {
        this.userForLoginUpdate.LOGIN_ID = this.tableUserKey2 // 原窗口的登陆账号
        this.userForLoginUpdate.arr = this.arr // 右边选中的集合
        updateUserForLoginArticle(this.userForLoginUpdate).then(response => { // 给登陆账号关联用户
          var message = response.data.message
          var title = '失败'
          var type = 'error'
          if (response.data.code === 2000) {
            title = '成功'
            type = 'success'
            this.arr = []
            this.getList()
            this.getListUser()
            this.userLoginVisible = false
          }
          this.$notify({   position: 'bottom-right',
            title: title,
            message: message,
            type: type,
            duration: 2000
          })
        })
      }
    }, deleteRole() { // 给用户分配角色权限
      if (this.multipleSelection.length <= 0) {
        this.$notify({   position: 'bottom-right',
          title: '失败',
          message: '请选择用户',
          type: 'error',
          duration: 2000
        })
      } else {
        this.$confirm('将永久删除该用户分配的登陆账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.userForLoginUpdate.arr = this.arr // 右边选中的集合
          deleteUserForLoginArticle(this.userForLoginUpdate).then(response => { // 给用户分配组织结构权限
            var message = response.data.message
            var title = '失败'
            var type = 'error'
            if (response.data.code === 2000) {
              title = '成功'
              type = 'success'
              this.arr = []
              this.getList()
              this.getListUser()
              this.userLoginVisible = false
            }
            this.$notify({   position: 'bottom-right',
              title: title,
              message: message,
              type: type,
              duration: 2000
            })
          })
        }).catch(() => {
          this.$notify({   position: 'bottom-right',
            title: '失败',
            message: '已取消清空',
            type: 'error',
            duration: 2000
          })
        })
      }
    },
    handleSizeUserChange(val) {
      this.listUserQuery.limit = val
      this.listUserQuery.LOGIN_ID = this.tableUserKey
      this.getListUser()
    },
    handleCurrentUserChange(val) {
      this.listUserQuery.page = val
      this.listUserQuery.LOGIN_ID = this.tableUserKey
      this.getListUser()
    },
    handleUserFilter() {
      this.listUserQuery.page = 1
      this.orgKey = undefined
      this.tableUserKey = undefined
      this.listUserQuery.LOGIN_ID = this.tableUserKey
      this.getListUser()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleDownload() { // 导出
      this.downloadLoading = true
      import('@/frame_src/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '账号id',
          '账号编码',
          '账号名称'
        ]
        const filterVal = [
          'LOGIN_ID',
          'LOGIN_CODE',
          'LOGIN_REMARK'
        ]
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '登陆账号表'
        })
        this.downloadLoading = false
      })
    }, formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j]
        })
      )
    }, handleSelectionChange(val) { // 勾选右边表格时记录勾选的数据
      this.multipleSelection = val
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }, tableRowClassName({ row, rowIndex }) { // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      if (rowIndex === 0) {
        return 'el-button--primary is-active'// 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return ''
    }
  },
  created() {
    // this.getListUser()
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
</style>