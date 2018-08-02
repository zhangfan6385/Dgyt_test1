<template>
    <div class="app-container calendar-list-container"> 
    <div class="filter-container">

       <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入发送地址" v-model="listQuery.SEND_URL"></el-input>
       <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入接收地址" v-model="listQuery.RECIVE_URL"></el-input>  
      
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('configTable.search')}}</el-button>
 
    </div>
    <el-card class="box-card">
      <el-table :key='tableKey' :data="list" :header-cell-class-name="tableRowClassName"   v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">


      <el-table-column width="140px" align="center" label="发送方地址">
        <template slot-scope="scope">
          <span>{{scope.row.SEND_URL}}</span>
        </template>
      </el-table-column>

        <el-table-column width="140px" align="center" label="接收方地址">
        <template slot-scope="scope">
          <span>{{scope.row.RECEIVE_URL}}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px" align="center" label="发送内容">
        <template slot-scope="scope">
          <span>{{scope.row.SYNC_CONTENT}}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px" align="center" label="发送结果">
        <template slot-scope="scope">
          <span>{{scope.row.SYNC_RESULT}}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px" align="center" label="错误信息">
        <template slot-scope="scope">
          <span>{{scope.row.ERROR_INFO}}</span>
        </template>
      </el-table-column>

     <el-table-column width="140px" align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.REMARK}}</span>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
      <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
 
    </div>
</template>
<script>
import{
      GetConfigResult////记住修改API
} from '@/frame_src/api/configResult'
import waves from '@/frame_src/directive/waves' // 水波纹指令
// import { parseTime } from '@/frame_src/utils'

export default {
  name: 'uidpConfigManager',
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
        RESULT_ID: undefined
      },
      listQuery: {
        page: 1,
        limit: 10,
        RESULT_ID: undefined
      },
      statusOptions: ['published', 'draft', 'deleted'],

      editConfig: false,
      temp: {
        RESULT_ID: '',
        SEND_URL: '',
        RECEIVE_URL: '',
        SYNC_CONTENT:'',
        SYNC_RESULT:'',
        ERROR_INFO:'',
        REMARK:''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改配置',
        create: '创建配置'
      },
      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      GetConfigResult(this.listQuery).then(response => {
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
            RESULT_ID: '',
            SEND_URL: '',
            RECEIVE_URL: '',
            SYNC_CONTENT:'',
            SYNC_RESULT:'',
            ERROR_INFO:'',
            REMARK:''
      }
    },
    /*
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
          updateSynchroConfigData(tempData).then(response => {
            var message = response.data.message
            var title = '失败'
            var type = 'error'
            if (response.data.code === 2000) {
              this.getList()
              title = '成功'
              type = 'success'
              // for (const v of this.list) {
              //   if (v.CONF_CODE === this.temp.CONF_CODE) {
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
      this.listUpdate.SYNC_ID = this.temp.SYNC_ID
      this.listUpdate.field = 'deletaStatus'
      updateSynchroConfigArticle(this.listUpdate).then(response => {
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
    createData() { // 创建配置
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          // this.temp.userId = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = "ppp" //当前登陆人
          createSynchroConfigArticle(this.temp).then(response => {
            var message = response.data.message
            var title = '失败'
            var type = 'error'
            if (response.data.code === 2000) {
              this.getList()
              title = '成功'
              type = 'success'
              // this.list.unshift(this.temp)
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
    */
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
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
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
</style>