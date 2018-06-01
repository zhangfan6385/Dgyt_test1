<template>
    <div class="app-container calendar-list-container"> 
    <div class="filter-container">
       <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('userTable.userName')" v-model="listQuery.userName">
      </el-input>
      <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.flag" :placeholder="$t('userTable.flag')">
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
      <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" v-if='showUserPass'  :label="$t('userTable.userId')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.userId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('userTable.userCode')">
        <template slot-scope="scope">
          <span>{{scope.row.userCode}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('userTable.userName')">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
        <el-table-column width="110px" align="center" :label="$t('userTable.userAlias')">
        <template slot-scope="scope">
          <span>{{scope.row.userAlias}}</span>
        </template>
      </el-table-column>
     <el-table-column width="110px" align="center" v-if='showUserPass'  :label="$t('userTable.userPass')" >
        <template slot-scope="scope" >
          <span>{{scope.row.userPass}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('userTable.phoneMobile')">
        <template slot-scope="scope">
          <span>{{scope.row.phoneMobile}}</span>
        </template>
      </el-table-column>
        <el-table-column width="110px" align="center" :label="$t('userTable.phoneOffice')">
        <template slot-scope="scope">
          <span>{{scope.row.phoneOffice}}</span>
        </template>
       </el-table-column>
       <el-table-column width="110px" align="center" :label="$t('userTable.phoneOrg')">
        <template slot-scope="scope">
          <span>{{scope.row.phoneOrg}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('userTable.userEmail')">
        <template slot-scope="scope">
          <span>{{scope.row.userEmail}}</span>
        </template>
      </el-table-column>
       <el-table-column width="110px" align="center" :label="$t('userTable.emailOffice')">
        <template slot-scope="scope">
          <span>{{scope.row.emailOffice}}</span>
        </template>
       </el-table-column>
        <el-table-column width="110px" align="center" :label="$t('userTable.userIp')">
        <template slot-scope="scope">
          <span>{{scope.row.userIp}}</span>
        </template>
       </el-table-column>
          <el-table-column width="110px" align="center" :label="$t('userTable.flag')">
        <template slot-scope="scope">
          <el-tag>{{scope.row.flag | typeFilter}}</el-tag>
        </template>
       </el-table-column>
        <el-table-column width="110px" align="center" :label="$t('userTable.userDomain')">
        <template slot-scope="scope">
          <span>{{scope.row.userDomain}}</span>
        </template>
       </el-table-column>
      <el-table-column min-width="180px"  align="center" :label="$t('userTable.remark')">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
       </el-table-column>
      <el-table-column align="center" :label="$t('userTable.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('userTable.edit')}}</el-button>
          <el-button v-if="scope.row.flag==0" size="mini" type="success" @click="handleModifyStatus(scope.row,1)">{{$t('userTable.publish')}}
          </el-button>
          <el-button  v-if="scope.row.flag==1"   size="mini" @click="handleModifyStatus(scope.row,0)">{{$t('userTable.draft')}}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{$t('userTable.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
      <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="120px" style='width: 400px; margin-left:20px;'>
     <el-form-item :label="$t('userTable.userCode')" prop="userCode">
          <el-input v-model="temp.userCode"></el-input>
        </el-form-item>
       <el-form-item :label="$t('userTable.userName')" prop="userName">
          <el-input v-model="temp.userName"></el-input>
        </el-form-item>
       <el-form-item :label="$t('userTable.userAlias')" prop="userAlias">
          <el-input v-model="temp.userAlias" ></el-input>
        </el-form-item>
          <el-form-item :label="$t('userTable.userPass')" prop="userPass">
          <el-input v-model="temp.userPass"></el-input>
        </el-form-item>
          <el-form-item :label="$t('userTable.phoneMobile')" prop="phoneMobile">
          <el-input v-model="temp.phoneMobile"></el-input>
        </el-form-item>
         <el-form-item :label="$t('userTable.phoneOffice')" prop="phoneOffice">
          <el-input v-model="temp.phoneOffice"></el-input>
        </el-form-item>
         <el-form-item :label="$t('userTable.phoneOrg')" prop="phoneOrg">
          <el-input v-model="temp.phoneOrg"></el-input>
        </el-form-item>
         <el-form-item :label="$t('userTable.userEmail')" prop="userEmail">
          <el-input v-model="temp.userEmail"></el-input>
        </el-form-item>
         <el-form-item :label="$t('userTable.emailOffice')" prop="emailOffice">
          <el-input v-model="temp.emailOffice"></el-input>
        </el-form-item>
           <el-form-item :label="$t('userTable.userIp')" prop="userIp">
          <el-input v-model="temp.userIp"></el-input>
        </el-form-item>
           <el-form-item :label="$t('userTable.userDomain')" prop="userDomain">
          <el-input v-model="temp.userDomain"></el-input>
        </el-form-item>
         <el-form-item :label="$t('userTable.flag')">
          <el-select class="filter-item" v-model="temp.flag" placeholder="Please select">
        <el-option v-for="item in flagOptions" :key="item.key" :label="item.flag_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('userTable.remark')">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.remark">
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
  updateUserArticle
} from '@/frame_src/api/article'
import waves from '@/frame_src/directive/waves' // 水波纹指令
// import { parseTime } from '@/frame_src/utils'
const flagOptions = [{ key: 0, flag_name: 'no' }, { key: 1, flag_name: 'yes' }]
// arr to obj ,such as { CN : "China", US : "USA" }
const flagOptionsKeyValue = flagOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.flag_name
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
        flag: undefined,
        userId: undefined
      },
      listQuery: {
        page: 1,
        limit: 5,
        userName: undefined,
        flag: undefined,
        importance: undefined,
        sort: '+userId'
      },
      flagOptions,
      statusOptions: ['published', 'draft', 'deleted'],
      sortOptions: [
        { label: '正序', key: '+userId' },
        { label: '倒序', key: '-userId' }
      ],
      showUserPass: false,
      temp: {
        userId: undefined,
        userCode: '',
        userName: '',
        userAlias: '',
        userPass: '',
        phoneMobile: '',
        phoneOffice: '',
        phoneOrg: '',
        userEmail: '',
        emailOffice: '',
        userIp: '',
        flag: '',
        userDomain: '',
        remark: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        flag: [
          { required: true, message: 'flag is required', trigger: 'change' }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        userCode: [
          { required: true, message: 'userCode is required', trigger: 'change' }
        ],
        userName: [
          { required: true, message: 'userName is required', trigger: 'change' }
        ]
      },
      downloadLoading: false
    }
  },
  filters: {
    typeFilter(type) {
      return flagOptionsKeyValue[type]
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchUserList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        userId: undefined,
        userCode: '',
        userName: '',
        userAlias: '',
        userPass: '111111',
        phoneMobile: '',
        phoneOffice: '',
        phoneOrg: '',
        userEmail: '',
        emailOffice: '',
        userIp: '',
        flag: 1,
        userDomain: '',
        remark: ''
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreate() {
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
          updateUserData(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.listUpdate.userId = this.temp.userId
      this.listUpdate.field = 'deletaStatus'
      updateUserArticle(this.listUpdate).then(response => {
        this.message = '删除失败'
        this.title = '失败'
        if (response.data.result === true) {
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
          // this.getList();
          this.title = '成功'
        }
        this.message = response.data.message
        this.$notify({
          title: this.title,
          message: this.message,
          type: 'success',
          duration: 2000
        })
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          // this.temp.userId = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = "ppp" //当前登陆人
          createUserArticle(this.temp).then(response => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleModifyStatus(row, status) {
      this.temp = Object.assign({}, row) // copy obj
      this.listUpdate.userId = this.temp.userId
      this.listUpdate.field = 'flag'
      this.listUpdate.flag = status

      updateUserArticle(this.listUpdate).then(response => {
        this.message = '修改失败'
        this.title = '失败'
        if (response.data.result === true) {
          row.flag = status
          // this.getList();
          this.title = '成功'
        }
        this.message = response.data.message
        this.$notify({
          title: this.title,
          message: this.message,
          type: 'success',
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
    handleDownload() {
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
          '是否激活',
          '域账户',
          '备注'
        ]
        const filterVal = [
          'userCode',
          'userName',
          'userAlias',
          'phoneMobile',
          'phoneOffice',
          'phoneOrg',
          'userEmail',
          'emailOffice',
          'userIp',
          'flag',
          'userDomain',
          'remark'
        ]
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'flag') {
            return flagOptionsKeyValue[v[j]]
          } else {
            return v[j]
          }
        })
      )
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
</style>