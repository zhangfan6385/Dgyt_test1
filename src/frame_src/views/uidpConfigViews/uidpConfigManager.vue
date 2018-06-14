<template>
    <div class="app-container calendar-list-container"> 
    <div class="filter-container">
       <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('configTable.confName')" v-model="listQuery.confName">
      </el-input> 
      
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('configTable.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('configTable.add')}}</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('configTable.export')}}</el-button>
 
    </div>
    <el-card class="box-card">
      <el-table :key='tableKey' :data="list" :header-cell-class-name="tableRowClassName"   v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
       <el-table-column width="140px" align="center" :label="$t('configTable.confName')">
        <template slot-scope="scope">
          <span>{{scope.row.confName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="140px" align="center" :label="$t('configTable.confCode')">
        <template slot-scope="scope">
          <span>{{scope.row.confCode}}</span>
        </template>
      </el-table-column>
        <el-table-column width="140px" align="center" :label="$t('configTable.confValue')">
        <template slot-scope="scope">
          <span>{{scope.row.confValue}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('configTable.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('configTable.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{$t('configTable.delete')}}
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
     <el-form-item  :label="$t('configTable.confName')" prop="confName">
          <el-input v-model="temp.confName"></el-input>
    </el-form-item> 
    <el-form-item v-if="dialogStatus=='create'"  :label="$t('configTable.confCode')" prop="confCode">
       <el-input v-model="temp.confCode"></el-input>
    </el-form-item>
    <el-form-item v-else  :label="$t('configTable.confCode')" prop="confCode">
     <span>{{temp.confCode}}</span>
    </el-form-item>
    <el-form-item :label="$t('configTable.confValue')" prop="confValue">
      <el-input v-model="temp.confValue" ></el-input>
    </el-form-item>
         
      </el-form> 
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('configTable.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('configTable.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('configTable.confirm')}}</el-button>
      </div>
    </el-dialog>
 
    </div>
</template>
<script>
import {
  fetchConfigList,
  createConfigArticle,
  updateConfigData,
  updateConfigArticle
} from '@/frame_src/api/config'
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
        confCode: undefined
      },
      listQuery: {
        page: 1,
        limit: 15,
        confName: undefined,
        importance: undefined
      },
      statusOptions: ['published', 'draft', 'deleted'],

      editConfig: false,
      temp: {
        confCode: '',
        confName: '',
        confValue: ''
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

        confCode: [
          { required: true, message: '配置项不能为空', trigger: 'change' }
        ],
        confValue: [
          { required: true, message: '配置值不能为空', trigger: 'change' }
        ]
      },
      downloadLoading: false
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchConfigList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        confCode: '',
        confName: '',
        confValue: ''
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
          updateConfigData(tempData).then(response => {
            var message = response.data.message
            var title = '失败'
            var type = 'error'
            if (response.data.result === true) {
              title = '成功'
              type = 'success'
              for (const v of this.list) {
                if (v.confCode === this.temp.confCode) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
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
      this.listUpdate.confCode = this.temp.confCode
      this.listUpdate.field = 'deletaStatus'
      updateConfigArticle(this.listUpdate).then(response => {
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
        this.$notify({
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
          createConfigArticle(this.temp).then(response => {
            var message = response.data.message
            var title = '失败'
            var type = 'error'
            if (response.data.result === true) {
              title = '成功'
              type = 'success'
              this.list.unshift(this.temp)
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
          '配置项说明',
          '配置项',
          '配置值'
        ]
        const filterVal = [
          'confName',
          'confCode',
          'confValue'
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