<template>
    <div class="app-container calendar-list-container"> 
    <div class="filter-container">
       <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('sysInfoTable.sysName')" v-model="listQuery.sysName">
      </el-input> 
      
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('sysInfoTable.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('sysInfoTable.add')}}</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('sysInfoTable.export')}}</el-button>
 
    </div>
    <el-card class="box-card">
      <el-table :key='tableKey' :data="list" :header-cell-class-name="tableRowClassName"   v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
       <el-table-column width="200px" align="center" :label="$t('sysInfoTable.sysCode')">
        <template slot-scope="scope">
          <span>{{scope.row.sysCode}}</span>
        </template>
      </el-table-column>
      <el-table-column width="140px" align="center" :label="$t('sysInfoTable.sysName')">
        <template slot-scope="scope">
          <span>{{scope.row.sysName}}</span>
        </template>
      </el-table-column>
        <el-table-column width="140px" align="center" :label="$t('sysInfoTable.sysStyle')">
        <template slot-scope="scope">
          <span>{{scope.row.sysStyle}}</span>
        </template>
      </el-table-column>
      <el-table-column width="250px" align="center" :label="$t('sysInfoTable.sysLogo')">
        <template slot-scope="scope">
          <span>{{scope.row.sysLogo}}</span>
        </template>
      </el-table-column>
      <el-table-column width="250px" align="center" :label="$t('sysInfoTable.sysUrl')">
        <template slot-scope="scope">
          <span>{{scope.row.sysUrl}}</span>
        </template>
      </el-table-column>
        <el-table-column width="140px" align="center" :label="$t('sysInfoTable.sysOrder')">
        <template slot-scope="scope">
          <span>{{scope.row.sysOrder}}</span>
        </template>
      </el-table-column>
        <el-table-column width="140px" align="center" :label="$t('sysInfoTable.sysAdmin')">
        <template slot-scope="scope">
          <span>{{scope.row.sysAdmin}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('sysInfoTable.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('sysInfoTable.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{$t('sysInfoTable.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
      <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="120px" style='width: 400px; margin-left:20px;'>
     
    <el-form-item v-if="dialogStatus=='create'"  :label="$t('sysInfoTable.sysCode')" prop="sysCode">
       <el-input v-model="temp.sysCode"></el-input>
    </el-form-item>
    <el-form-item v-else  :label="$t('sysInfoTable.sysCode')" prop="sysCode">
     <span>{{temp.sysCode}}</span>
    </el-form-item>
    <el-form-item  :label="$t('sysInfoTable.sysName')" prop="sysName">
          <el-input v-model="temp.sysName"></el-input>
    </el-form-item> 
    <el-form-item :label="$t('sysInfoTable.sysStyle')" prop="sysStyle">
      <el-input v-model="temp.sysStyle" ></el-input>
    </el-form-item>
       <el-form-item :label="$t('sysInfoTable.sysLogo')" prop="sysLogo">
      <el-input v-model="temp.sysLogo" ></el-input>
    </el-form-item>
     <el-form-item :label="$t('sysInfoTable.sysUrl')" prop="sysUrl">
      <el-input v-model="temp.sysUrl" ></el-input>
    </el-form-item>
     <el-form-item :label="$t('sysInfoTable.sysOrder')" prop="sysOrder">
      <el-input v-model="temp.sysOrder" ></el-input>
    </el-form-item>
     <el-form-item :label="$t('sysInfoTable.sysAdmin')" prop="sysAdmin">
      <el-input v-model="temp.sysAdmin" ></el-input>
    </el-form-item>   
      </el-form> 
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('sysInfoTable.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('sysInfoTable.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('sysInfoTable.confirm')}}</el-button>
      </div>
    </el-dialog>
 
    </div>
</template>
<script>
import {
  fetchSysInfoList,
  createSysInfoArticle,
  updateSysInfoData,
  updateSysInfoArticle
} from '@/frame_src/api/sysinfo'
import waves from '@/frame_src/directive/waves' // 水波纹指令
// import { parseTime } from '@/frame_src/utils'

export default {
  name: 'uidpSysInfoManager',
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
        sysCode: undefined
      },
      listQuery: {
        page: 1,
        limit: 5,
        sysName: undefined,
        importance: undefined
      },
      editConfig: false,
      temp: {
        sysCode: '', // 系统代码
        sysName: '', // 系统名称
        sysStyle: '', // 系统主题风格
        sysLogo: '', // logo图标URL
        sysUrl: '', // 系统URL
        sysOrder: '', // 顺序
        sysAdmin: '' // 管理员ID
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改配置',
        create: '创建配置'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {

        sysCode: [
          { required: true, message: '系统代码不能为空', trigger: 'change' }
        ],
        sysName: [
          { required: true, message: '系统名称不能为空', trigger: 'change' }
        ]
      },
      downloadLoading: false
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchSysInfoList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        sysCode: '', // 系统代码
        sysName: '', // 系统名称
        sysStyle: '', // 系统主题风格
        sysLogo: '', // logo图标URL
        sysUrl: '', // 系统URL
        sysOrder: '', // 顺序
        sysAdmin: '' // 管理员ID
      }
    },
    handleUpdate(row) { // 修改数据弹出修改表单
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreate() { // 创建弹出表单
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
          updateSysInfoData(tempData).then(response => {
            var message = response.data.message
            var title = '失败'
            var type = 'error'
            if (response.data.result === true) {
              title = '成功'
              type = 'success'
              for (const v of this.list) {
                if (v.sysCode === this.temp.sysCode) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
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
      this.listUpdate.sysCode = this.temp.sysCode
      this.listUpdate.field = 'deletaStatus'
      updateSysInfoArticle(this.listUpdate).then(response => {
        alert(response.data.message)
        this.message = response.data.message
        this.title = '失败'
        this.type = 'error'
        if (response.data.result === true) {
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
          // this.getList();
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
    createData() { // 创建配置
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          // this.temp.userId = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = "ppp" //当前登陆人
          createSysInfoArticle(this.temp).then(response => {
            var message = response.data.message
            var title = '失败'
            var type = 'error'
            if (response.data.result === true) {
              title = '成功'
              type = 'success'
              this.list.unshift(this.temp)
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
          '系统代码',
          '系统名称',
          '系统主题风格',
          'logo图标URL',
          '系统URL',
          '顺序',
          '管理员ID'
        ]
        const filterVal = [
          'sysCode', // 系统代码
          'sysName', // 系统名称
          'sysStyle', // 系统主题风格
          'sysLogo', // logo图标URL
          'sysUrl', // 系统URL
          'sysOrder', // 顺序
          'sysAdmin' // 管理员ID
        ]
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '平台在建系统信息记录'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j]
        })
      )
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }, tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'el-button--primary is-active'// 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return ''
    }
  },
  created() {
    // var token = this.$store.state.user.name; 获取登陆信息的 俩种方式
    // var status = this.$store.getters.name;
    // alert(token+"ddd"+status);
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
</style>