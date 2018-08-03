<template>
    <div class="app-container calendar-list-container"> 
    <div class="filter-container">
       <el-input @keyup.enter.native="handleFilter" style="width: 150px;"  :placeholder="$t('logInfoTable.USER_NAME')" v-model="listQuery.USER_NAME">
      </el-input>
      <el-input v-model="listQuery.USER_DOMAIN" type="text" placeholder="输入用户账号" style="width: 150px;"></el-input> 
      <!-- <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('logInfoTable.LOG_TYPE')" v-model="listQuery.LOG_TYPE">
      </el-input>  -->
      <el-date-picker v-model="listQuery.BEGIN_ACCESS_TIME" type="date" placeholder="选择开始日期" style="width: 180px;"  value-format="yyyy-MM-dd"></el-date-picker>
      <el-date-picker v-model="listQuery.END_ACCESS_TIME" type="date" placeholder="选择结束日期" style="width: 180px;"  value-format="yyyy-MM-dd"></el-date-picker>
      <el-button  type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('logInfoTable.search')}}</el-button>
      <el-button  type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('logInfoTable.export')}}</el-button>
    </div>
    <el-card class="box-card">
      <el-table :key='tableKey' :header-cell-class-name="tableRowClassName" :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
        <el-table-column width="160px"  class="filter-item"  align="center" :label="'时间'">
        <template slot-scope="scope">
          <span>{{scope.row.ACCESS_TIME}}</span>
        </template>
      </el-table-column>
       <el-table-column width="140px" class="link-type"  align="center" :label="'账号'">
        <template slot-scope="scope">
          <span>{{scope.row.USER_DOMAIN}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="'姓名'">
        <template slot-scope="scope">
          <span>{{scope.row.USER_NAME}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" :label="'组织机构'">
        <template slot-scope="scope">
          <span>{{scope.row.ORG_NAME}}</span>
        </template>
      </el-table-column>

        <el-table-column width="140px" align="center" :label="'IP'">
        <template slot-scope="scope">
          <span>{{scope.row.IP_ADDR}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="'操作类型'">
        <template slot-scope="scope">
          <span>{{scope.row.LOG_TYPE | logFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="'警告级别'">
        <template slot-scope="scope">
          <span v-if="scope.row.ALARM_LEVEL===1">正常</span>
          <span v-else-if="scope.row.ALARM_LEVEL===2">一般</span>
          <span v-else-if="scope.row.ALARM_LEVEL===3">严重</span>
          <span v-else-if="scope.row.ALARM_LEVEL===4">非常严重</span>
        </template>
      </el-table-column>
      <el-table-column width="270px" align="center" :label="'操作内容'">
        <template slot-scope="scope">
          <span>{{scope.row.LOG_CONTENT}}</span>
        </template>
      </el-table-column>
       <!--
       <el-table-column width="270px" align="center" :label="$t('logInfoTable.REMARK')">
        <template slot-scope="scope">
          <span>{{scope.row.REMARK}}</span>
        </template>
      </el-table-column>
      -->
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
const logOptions = [{ key: 0, log_name: '业务操作' }, { key: 1, log_name: '异常' }, { key: 2, log_name: '登录' }]// 0业务操作 1 异常 2 登录
const logOptionsKeyValue = logOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.log_name
  return acc
}, {})
export default {
  name: 'uidpConfigManager',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      options: [{
          value: 1,
          label: '警告等级1'
        }, {
          value: 2,
          label: '警告等级2'
        }, {
          value: 3,
          label: '警告等级3'
        }, {
          value: 4,
          label: '警告等级4'
        }],
      total: null,
      listLoading: true,
      value1:'',
      listQuery: {
        USER_DOMAIN:'',
        USER_NAME: '',
        BEGIN_ACCESS_TIME:'',
        END_ACCESS_TIME:'',
        USER_ID:'',
        page: 1,
        limit: 10
      },
      logOptions,
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
  }, filters: {
    logFilter(type) {
      return logOptionsKeyValue[type]
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchLogInfoList(this.listQuery).then(response => {
        if (response.data.code === 2000) {
          this.list = response.data.items
          //console.log(this.list)
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
          '时间',
          '账号',
          '姓名',
          '组织机构',
          'IP',
          '操作类型',
          '警告级别',
          '操作内容'
        ]
        const filterVal = [
          'ACCESS_TIME',
          'USER_ID',
          'USER_NAME',
          'ORG_NAME',
          'IP_ADDR',
          'LOG_TYPE',
          'ALARM_LEVEL',
          'LOG_CONTENT'
        ]
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '用户日志'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'LOG_TYPE') {
            return logOptionsKeyValue[v[j]]
          } else {
            return v[j]
          }
        })
      )
    },
    handleFilter() {
      /*
      if(this.listQuery.BEGIN_ACCESS_TIME==''&&this.listQuery.END_ACCESS_TIME!=''){
        const start=new Date();
        this.listQuery.BEGIN_ACCESS_TIME=start.setTime(start.getTime());
      }
      if(this.listQuery.END_ACCESS_TIME==''&&this.listQuery.BEGIN_ACCESS_TIME!=''){
        const end=new Date();
        this.listQuery.END_ACCESS_TIME=end.setTime(end.getTime()+3600 * 1000 * 24 * 7);
      }
      */
        //(this.listQuery)
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