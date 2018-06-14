<template>
    <div class="app-container calendar-list-container"> 
    <div class="filter-container">
       <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('logInfoTable.userName')" v-model="listQuery.userName">
      </el-input> 
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('logInfoTable.logType')" v-model="listQuery.logType">
      </el-input> 
       <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('logInfoTable.accessTime')" v-model="listQuery.accessTime">
      </el-input> 
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('logInfoTable.search')}}</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('logInfoTable.export')}}</el-button>
 
    </div>
    <el-card class="box-card">
      <el-table :key='tableKey' :header-cell-class-name="tableRowClassName" :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
        <el-table-column width="160px"  class="filter-item"  align="center" :label="$t('logInfoTable.accessTime')">
        <template slot-scope="scope">
          <span>{{scope.row.accessTime}}</span>
        </template>
      </el-table-column>
       <el-table-column width="140px" class="link-type"  align="center" :label="$t('logInfoTable.userId')">
        <template slot-scope="scope">
          <span>{{scope.row.userId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="$t('logInfoTable.userName')">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
        <el-table-column width="140px" align="center" :label="$t('logInfoTable.ipAddr')">
        <template slot-scope="scope">
          <span>{{scope.row.ipAddr}}</span>
        </template>
      </el-table-column>
      <el-table-column width="140px" align="center" :label="$t('logInfoTable.logType')">
        <template slot-scope="scope">
          <span>{{scope.row.logType}}</span>
        </template>
      </el-table-column>
      <el-table-column width="270px" align="center" :label="$t('logInfoTable.logContent')">
        <template slot-scope="scope">
          <span>{{scope.row.logContent}}</span>
        </template>
      </el-table-column>
       <el-table-column width="270px" align="center" :label="$t('logInfoTable.remark')">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
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
import {
  fetchLogInfoList
} from '@/frame_src/api/logInfo'
import waves from '@/frame_src/directive/waves' // 水波纹指令

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
      listQuery: {
        userName: undefined,
        logType: undefined,
        accessTime: undefined,
        page: 1,
        limit: 15
      },
      editConfig: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchLogInfoList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
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
          '访问时间',
          '用户ID',
          '用户名称',
          'IP地址',
          '操作类型',
          '操作内容',
          '备注'
        ]
        const filterVal = [
          'accessTime',
          'userId',
          'userName',
          'ipAddr',
          'logType',
          'logContent',
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
          return v[j]
        })
      )
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }, tableRowClassName({ row, rowIndex }) {
      // 可以通过指定 Table 组件的 :header-cell-class-name 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className属性来为 Table 中的某一行添加 class，表明该行处于某种状态
      if (rowIndex === 0) {
        return 'el-button--primary is-active'// 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return ''
    }

  },
  created() { // 获取登陆信息的俩种方式
    // var token = this.$store.state.user.name;
    // var status = this.$store.getters.name;
    // alert(token+"ddd"+status);
    this.getList()
  }
}
</script>
<style lang="scss" >
 

 

</style>