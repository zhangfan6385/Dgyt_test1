<template>
    <div class="app-container calendar-list-container"> 
    <div class="filter-container">
       <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('userTable.USER_NAME')" v-model="listQuery.USER_NAME">
      </el-input>
      <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.FLAG" :placeholder="$t('userTable.FLAG')">
        <el-option v-for="item in flagOptions" :key="item.key" :label="item.flag_name" :value="item.key">
        </el-option>
      </el-select>
       <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('userTable.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('userTable.add')}}</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('userTable.export')}}</el-button>
 
    </div>
      <el-table :key='tableKey' :data="list" :header-cell-class-name="tableRowClassName"  v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" width="200px"  :label="$t('userTable.USER_ID')" >
        <template slot-scope="scope">
          <span>{{scope.row.USER_ID}}</span><!--v-if='showUSER_PASS'  -->
        </template>
      </el-table-column>
       <el-table-column width="200px" align="center" :label="$t('userTable.USER_DOMAIN')">
        <template slot-scope="scope">
          <span>{{scope.row.USER_DOMAIN}}</span>
        </template>
       </el-table-column>
      <el-table-column width="200px" align="center" :label="$t('userTable.USER_CODE')">
        <template slot-scope="scope">
          <span>{{scope.row.USER_CODE}}</span>
        </template>
      </el-table-column>
       <el-table-column width="250px" align="center" :label="$t('userTable.ORG_NAME')">
        <template slot-scope="scope">
          <span>{{scope.row.ORG_NAME}}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" :label="$t('userTable.USER_NAME')">
        <template slot-scope="scope">
          <span>{{scope.row.USER_NAME}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" :label="$t('userTable.USER_ERP')">
        <template slot-scope="scope">
          <span>{{scope.row.USER_ERP}}</span>
        </template>
      </el-table-column>
        <!--<el-table-column width="110px" align="center" :label="$t('userTable.USER_ALIAS')">
        <template slot-scope="scope">
          <span>{{scope.row.USER_ALIAS}}</span>
        </template>
      </el-table-column>-->
     <el-table-column width="110px" align="center" :label="$t('userTable.USER_PASS')" >
        <template slot-scope="scope" >
          <span>{{scope.row.USER_PASS}}</span>
        </template>
      </el-table-column>
       
      <el-table-column width="110px" align="center" :label="$t('userTable.PHONE_MOBILE')">
        <template slot-scope="scope">
          <span>{{scope.row.PHONE_MOBILE}}</span>
        </template>
      </el-table-column>
       <el-table-column width="110px" align="center" :label="$t('userTable.PHONE_OFFICE')">
        <template slot-scope="scope">
          <span>{{scope.row.PHONE_OFFICE}}</span>
        </template>
       </el-table-column>
      <!-- <el-table-column width="110px" align="center" :label="$t('userTable.PHONE_ORG')">
        <template slot-scope="scope">
          <span>{{scope.row.PHONE_ORG}}</span>
        </template>
      </el-table-column>-->
      <el-table-column width="200px" align="center" :label="$t('userTable.USER_EMAIL')">
        <template slot-scope="scope">
          <span>{{scope.row.USER_EMAIL}}</span>
        </template>
      </el-table-column>
       <!--<el-table-column width="110px" align="center" :label="$t('userTable.EMAIL_OFFICE')">
        <template slot-scope="scope">
          <span>{{scope.row.EMAIL_OFFICE}}</span>
        </template>
       </el-table-column>-->
        <el-table-column width="180px" align="center" :label="$t('userTable.USER_IP')">
        <template slot-scope="scope">
          <span>{{scope.row.USER_IP}}</span>
        </template>
       </el-table-column>
           <el-table-column width="110px" align="center" :label="$t('userTable.USER_SEX')">
        <template slot-scope="scope">
          <el-tag>{{scope.row.USER_SEX | sexFilter}}</el-tag>
        </template>
       </el-table-column>
          <el-table-column width="110px" align="center" :label="$t('userTable.FLAG')">
        <template slot-scope="scope">
          <el-tag>{{scope.row.FLAG | typeFilter}}</el-tag>
        </template>
       </el-table-column>
       <el-table-column min-width="180px"  align="center" :label="$t('userTable.REMARK')">
        <template slot-scope="scope">
          <span>{{scope.row.REMARK}}</span>
        </template>
       </el-table-column>
     
      <el-table-column align="center" :label="$t('userTable.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('userTable.edit')}}</el-button>
          <el-button v-if="scope.row.FLAG==0" size="mini" type="success" @click="handleModifyStatus(scope.row,1)">{{$t('userTable.publish')}}
          </el-button>
          <el-button  v-if="scope.row.FLAG==1"   size="mini" @click="handleModifyStatus(scope.row,0)">{{$t('userTable.draft')}}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{$t('userTable.delete')}}
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
       <el-form-item :label="$t('userTable.USER_ID')" prop="USER_ID">
          <span>{{temp.USER_ID}}</span>
        </el-form-item>
        <el-form-item :label="$t('userTable.USER_DOMAIN')" prop="USER_DOMAIN">
          <el-input v-model="temp.USER_DOMAIN"></el-input>
        </el-form-item>
        <el-form-item :label="$t('userTable.USER_CODE')" prop="USER_CODE">
          <el-input v-model="temp.USER_CODE"></el-input>
        </el-form-item>
       <el-form-item :label="$t('userTable.USER_NAME')" prop="USER_NAME">
          <el-input v-model="temp.USER_NAME"></el-input>
        </el-form-item>
        <el-form-item :label="$t('userTable.USER_ERP')" prop="USER_ERP">
          <el-input v-model="temp.USER_ERP"></el-input>
        </el-form-item>
       <!--<el-form-item :label="$t('userTable.USER_ALIAS')" prop="USER_ALIAS">
          <el-input v-model="temp.USER_ALIAS" ></el-input>
        </el-form-item>-->
          <el-form-item :label="$t('userTable.USER_PASS')" prop="USER_PASS">
          <el-input v-model="temp.USER_PASS"></el-input>
        </el-form-item>
        
          <el-form-item :label="$t('userTable.PHONE_MOBILE')" prop="PHONE_MOBILE">
          <el-input v-model="temp.PHONE_MOBILE"></el-input>
        </el-form-item>
         <el-form-item :label="$t('userTable.PHONE_OFFICE')" prop="PHONE_OFFICE">
          <el-input v-model="temp.PHONE_OFFICE"></el-input>
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
           <el-form-item :label="$t('userTable.USER_IP')" prop="USER_IP">
          <el-input v-model="temp.USER_IP"></el-input>
        </el-form-item>
          <el-form-item :label="$t('userTable.USER_SEX')">
          <el-select class="filter-item" v-model="temp.USER_SEX" placeholder="Please select">
        <el-option v-for="item in sexOptions" :key="item.key" :label="item.sex_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
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
 
    </div>
</template>
<script>
import {
  fetchUserList,
  createUserArticle,
  updateUserData,
  updateUserArticle,
  updateUserFlag
} from '@/frame_src/api/user'
import waves from '@/frame_src/directive/waves' // 水波纹指令
// import { parseTime } from '@/frame_src/utils'
const flagOptions = [{ key: 0, flag_name: '否' }, { key: 1, flag_name: '是' }]
const sexOptions = [{ key: 0, sex_name: '女' }, { key: 1, sex_name: '男' }]
// arr to obj ,such as { CN : "China", US : "USA" }
const flagOptionsKeyValue = flagOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.flag_name
  return acc
}, {})
const sexOptionsKeyValue = sexOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.sex_name
  return acc
}, {})
export default {
  name: 'userManager',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listUpdate: {
        field: undefined,
        FLAG: undefined,
        USER_ID: undefined
      },
      listQuery: {
        page: 1,
        limit: 5,
        USER_NAME: undefined,
        FLAG: undefined,
        sort: '+USER_ID'
      },
      flagOptions,
      sexOptions,
      statusOptions: ['published', 'draft', 'deleted'],
      sortOptions: [
        { label: '正序', key: '+USER_ID' },
        { label: '倒序', key: '-USER_ID' }
      ],
      showUSER_PASS: false,
      temp: {
        USER_ID: undefined,
        USER_CODE: '',
        USER_NAME: '',
        ORG_NAME: '',
        USER_ALIAS: '',
        USER_PASS: '',
        PHONE_MOBILE: '',
        PHONE_OFFICE: '',
        PHONE_ORG: '',
        USER_EMAIL: '',
        EMAIL_OFFICE: '',
        USER_IP: '',
        FLAG: '',
        USER_DOMAIN: '',
        REMARK: '',
        USER_ERP: '',
        USER_SEX: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改用户',
        create: '创建用户'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        FLAG: [
          { required: true, message: 'FLAG is required', trigger: 'change' }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        USER_CODE: [
          { required: true, message: '用户编号不能为空', trigger: 'change' }
        ],
        USER_NAME: [
          { required: true, message: '用户名称不能为空', trigger: 'change' }
        ]
      },
      downloadLoading: false
    }
  },
  filters: {
    typeFilter(type) {
      return flagOptionsKeyValue[type]
    },
    sexFilter(type) {
      return sexOptionsKeyValue[type]
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchUserList(this.listQuery).then(response => {
        if (response.data.code === 2000) {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
        } else {
          this.listLoading = false
          this.$notify({
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
        USER_ID: undefined,
        USER_CODE: '',
        USER_NAME: '',
        USER_ALIAS: '',
        USER_PASS: '111111',
        PHONE_MOBILE: '',
        PHONE_OFFICE: '',
        PHONE_ORG: '',
        USER_EMAIL: '',
        EMAIL_OFFICE: '',
        USER_IP: '',
        USER_SEX: 1,
        FLAG: 1,
        USER_DOMAIN: '',
        USER_ERP: '',
        REMARK: ''

      }
    },
    handleUpdate(row) { // 打开修改表单
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
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
          updateUserData(tempData).then(response => {
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
            this.$notify({
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
      this.listUpdate.USER_ID = this.temp.USER_ID
      this.listUpdate.field = 'deletaStatus'
      updateUserArticle(this.listUpdate).then(response => {
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
        this.$notify({
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
          createUserArticle(this.temp).then(response => {
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
            this.$notify({
              title: title,
              message: message,
              type: type,
              duration: 2000
            })
          })
        }
      })
    },
    handleModifyStatus(row, status) { // 修改是否激活
      this.temp = Object.assign({}, row) // copy obj
      this.listUpdate.USER_ID = this.temp.USER_ID
      this.listUpdate.field = 'FLAG'
      this.listUpdate.FLAG = status

      updateUserFlag(this.listUpdate).then(response => {
        this.message = response.data.message
        this.title = '失败'
        this.type = 'error'
        if (response.data.code === 2000) {
          // row.FLAG = status
          this.getList()
          this.title = '成功'
          this.type = 'success'
        }

        this.$notify({
          title: this.title,
          message: this.message,
          type: this.type,
          duration: 2000
        })
      })
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
          '用户编号',
          '用户名称',
          '用户别名',
          '电话-移动',
          '电话-办公',
          '电话-分机号',
          '电子邮箱-常用',
          '电子邮箱-办公',
          'IP地址列表',
          '性别',
          '是否激活',
          '域账户',
          '备注'
        ]
        const filterVal = [
          'USER_CODE',
          'USER_NAME',
          'USER_ALIAS',
          'PHONE_MOBILE',
          'PHONE_OFFICE',
          'PHONE_ORG',
          'USER_EMAIL',
          'EMAIL_OFFICE',
          'USER_IP',
          'USER_SEX',
          'FLAG',
          'USER_DOMAIN',
          'REMARK'
        ]
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '用户信息表'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'FLAG') {
            return flagOptionsKeyValue[v[j]]
          } if (j === 'USER_SEX') {
            return sexOptionsKeyValue[v[j]]
          } else {
            return v[j]
          }
        })
      )
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
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
</style>