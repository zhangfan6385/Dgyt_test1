<template>
    <div class="app-container calendar-list-container"> 
    <div class="filter-container">
       
       <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入查询IP" v-model="listQuery.SERVER_IP"></el-input>
       <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入查询端口" v-model="listQuery.SERVER_PORT"></el-input> 
       <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输入查询URL" v-model="listQuery.SERVER_URL"></el-input>  
      
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('configTable.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('configTable.add')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="pushOrgList" type="primary" icon="el-icon-circle-check" :disabled="together">同步</el-button>
 
    </div>
    <el-card class="box-card">
      <el-table :key='tableKey' :data="list" :header-cell-class-name="tableRowClassName"   v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%" @selection-change="handleSelectionChange" ref="multipleTable">

      <el-table-column type="selection" width="50"></el-table-column>
      
      <el-table-column width="140px" align="center" label="服务器IP">
        <template slot-scope="scope">
          <span>{{scope.row.SERVER_IP}}</span>
        </template>
      </el-table-column>
        <el-table-column width="140px" align="center" label="服务器端口">
        <template slot-scope="scope">
          <span>{{scope.row.SERVER_PORT}}</span>
        </template>
      </el-table-column>
      <el-table-column width="140px" align="center" label="服务器地址">
        <template slot-scope="scope">
          <span>{{scope.row.SERVER_URL}}</span>
        </template>
      </el-table-column>
      <el-table-column width="140px" align="center" label="是否推送服务">
        <template slot-scope="scope">
          <span v-if="scope.row.SYNC_FLAG=='0'">是</span>
          <span v-else-if="scope.row.SYNC_FLAG=='1'">否</span>
        </template>
      </el-table-column>

            <el-table-column width="140px" align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{scope.row.USER_CODE}}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px" align="center" label="用户密码">
        <template slot-scope="scope">
          <span>{{scope.row.USER_PASS}}</span>
        </template>
      </el-table-column>


      <el-table-column width="140px" align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.REMARK}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('configTable.edit')}}</el-button>
          <el-button type="primary" size="mini" @click="handleResult(scope.row)">同步记录</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{$t('configTable.delete')}}</el-button>
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
        
        <el-form-item  label="用户名" prop="USER_CODE">
            <el-input v-model="temp.USER_CODE"></el-input>
        </el-form-item>

        <el-form-item  label="用户密码" prop="USER_PASS">
            <el-input v-model="temp.USER_PASS"></el-input>
        </el-form-item>


        <el-form-item  label="服务器IP" prop="SERVER_IP">
            <el-input v-model="temp.SERVER_IP"></el-input>
        </el-form-item> 

        <el-form-item  label="服务器端口" prop="SERVER_PORT">
            <el-input v-model="temp.SERVER_PORT"></el-input>
        </el-form-item>
    

        <el-form-item  label="服务器地址" prop="SERVER_URL">
            <el-input v-model="temp.SERVER_URL"></el-input>
        </el-form-item> 
        <el-form-item label="是否推送服务" prop="SYNC_FLAG">
            <el-radio v-model="temp.SYNC_FLAG" label="0">开启</el-radio>
            <el-radio v-model="temp.SYNC_FLAG" label="1">关闭</el-radio>
        </el-form-item>

        <el-form-item label="备注" prop="REMARK">
            <el-input v-model="temp.REMARK" ></el-input>
        </el-form-item>
         
      </el-form> 
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('configTable.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('configTable.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('configTable.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog title="同步记录" :visible.sync="resultVisible" width="900px"> 
          <el-card class="box-card">
      <el-table :key='tableKey' :data="result" :header-cell-class-name="tableRowClassName"   v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">


      <el-table-column width="140px" align="center" label="发送方地址" prop="SEND_URL">

      </el-table-column>

      <el-table-column width="140px" align="center" label="接收方地址" prop="RECEIVE_URL">
      </el-table-column>

      <el-table-column width="140px" align="center" label="发送内容" prop="SYNC_CONTENT">
      </el-table-column>

      <el-table-column width="140px" align="center" label="发送结果" prop="SYNC_CONTENT">
      </el-table-column>

      <el-table-column width="140px" align="center" label="错误信息" prop="ERROR_INFO">
      </el-table-column>

    </el-table>
    </el-card>
    </el-dialog>
 
    </div>
</template>
<script>
import {
  fetchSynchroConfigList,
  createSynchroConfigArticle,
  updateSynchroConfigData,
  DeleteSynchroConfigArticle,
  pushOrgList
} from '@/frame_src/api/synchroConfig'

import{
      GetConfigResult
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
      together:false,
      multipleSelection: [],
      arr:[],
      tableKey: 0,
      list: [],
      total: null,
      result:[],
      listLoading: true,
      TYPE:'请选择同步类型',
      listUpdate: {
        field: undefined,
        SYNC_ID: undefined
      },
      listQuery: {
        page: 1,
        limit: 10,
        SYNC_ID: undefined
      },
      sync_obj:{
        sync_list:[]
      },
      statusOptions: ['published', 'draft', 'deleted'],
      editConfig: false,
      temp: {
        USER_CODE:'',
        USER_PASS:'',
        SYNC_TYPE:'',
        SYNC_FLAG:'',
        SERVER_IP: '',
        SERVER_PORT: '',
        SERVER_URL:'',
        REMARK:''
      },
      dialogFormVisible: false,
      resultVisible:false,
      dialogStatus: '',
      textMap: {
        update: '修改云同步配置',
        create: '创建云同步配置'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        SYNC_ID: [
          { required: true, message: '配置表主键不能为空', trigger: 'change' }
        ],
        SERVER_IP: [
          { required: true, message: '服务器IP不能为空', trigger: 'change' }
        ],
        SERVER_PORT: [
          { required: true, message: '服务器端口不能为空', trigger: 'change' }
        ],
        SERVER_URL: [
          { required: true, message: '服务器地址不能为空', trigger: 'change' }
        ]
      },
      downloadLoading: false
    }
  },
  methods: {
    getList() {
      this.listLoading = false;
      fetchSynchroConfigList(this.listQuery).then(response => {
        if (response.data.code === 2000) {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
        } else {
          this.listLoading = false
          this.$notify({   position: 'bottom-right',
            title: '失败',
            message: response.data.message,
            type: 'err  or',
            duration: 2000
          })
        }
      })
    },
    resetTemp() {
      this.temp = {
        USER_CODE:'',
        USER_PASS:'',
        SYNC_TYPE:'',
        SYNC_FLAG:'1',
        SERVER_IP: '',
        SERVER_PORT: '',
        SERVER_URL:'',
        REMARK:''
      }
    },
    /*
    handleCommand(command) {
      this.TYPE=command;
      this.temp.SYNC_TYPE=command;
      console.log(this.temp.SYNC_TYPE)
      },
    */
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
    handleResult(row){
      this.resultVisible=true;
      GetConfigResult(row.SYNC_ID).then(response=>{
        if(response.data.code===2000){
          this.result=response.data.items;  
        }
        else{
          this.$notify({   position: 'bottom-right',
            title: '失败',
            message: response.data.message,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    pushOrgList(){
      this.together=true;
      this.sync_obj.sync_list=this.arr
      pushOrgList(this.sync_obj).then(response=>{
        if(response.data.code===2000){
          this.title='成功';
          this.type='success';
        }
        else{
          this.message=response.data.message;
          this.title='失败';
          this.type='error';
        }
        this.$notify({   position: 'bottom-right',
          title: this.title,
          message: this.message,
          type: this.type,
          duration: 2000
        })
        this.together=false;
      })
    },
    handleDelete(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.listUpdate.SYNC_ID = this.temp.SYNC_ID
      this.listUpdate.field = 'deletaStatus'
      DeleteSynchroConfigArticle(this.listUpdate).then(response => {
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
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    /*
    handleDownload() { // 导出
      this.downloadLoading = true
      import('@/frame_src/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '配置项说明',
          '配置项',
          '配置值'
        ]
        const filterVal = [
          'CONF_NAME',
          'CONF_CODE',
          'CONF_VALUE'
        ]
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '平台基本配置信息表'
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
    */
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }, tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'el-button--primary is-active'// 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return ''
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    }
  },
  watch:{
     multipleSelection: function() { // 把选中的数据id放到数组里，以便后期传值用
      this.arr = []
      for (var i = this.multipleSelection.length - 1; i >= 0; i--) {
        // if (this.multipleSelection[i].roleId !== this.$refs.roleTree.getCurrentKey()) {
        this.arr.push(this.multipleSelection[i]) // this.$refs.multipleTable.toggleRowSelection(this.list[i]);
        // }
      }
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