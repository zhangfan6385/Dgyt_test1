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
      <el-button class="filter-item"  @click="updateRole" type="primary" icon="el-icon-edit">{{$t('roleTable.mount')}}</el-button>
    <el-button class="filter-item"  @click="deleteRole" type="primary" icon="el-icon-edit">{{$t('roleTable.deleteRole')}}</el-button>
     
     </div>
      <el-table :key='tableKey' ref="multipleTable" :data="list" :header-cell-class-name="tableRowClassName"  @selection-change="handleSelectionChange" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
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
      <el-table-column width="110px" align="center" :label="$t('userTable.FLAG')">
        <template slot-scope="scope">
          <span>{{scope.row.FLAG | typeFilter}}</span>
        </template>
       </el-table-column>
      <el-table-column min-width="180px"  align="center" :label="$t('userTable.REMARK')">
        <template slot-scope="scope">
          <span>{{scope.row.REMARK}}</span>
        </template>
       </el-table-column>
       <el-table-column min-width="110px"  align="center" :label="$t('userTable.groupName')">
        <template slot-scope="scope">
          <span>{{scope.row.groupName}}</span>
        </template>
       </el-table-column>
    </el-table>
      <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[5,10,20, 30]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div> 
   
      </el-card>
      </el-col>
    </el-row>
    </imp-panel>
  </div>
</template>
<script>
import { fetchRoleList, updateUserRoleArticle, deleteUserRoleArticle } from '@/frame_src/api/role'
import { fetchUserRoleList } from '@/frame_src/api/user'
import waves from '@/frame_src/directive/waves' // 水波纹指令
// import { parseTime } from '@/frame_src/utils'
import panel from '@/frame_src/components/TreeList/panel.vue'
import treeter from '@/frame_src/components/TreeList/treeter'
const flagOptions = [{ key: 0, flag_name: '否' }, { key: 1, flag_name: '是' }]
// arr to obj ,such as { CN : "China", US : "USA" }
const flagOptionsKeyValue = flagOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.flag_name
  return acc
}, {})

export default {
  mixins: [treeter],
  components: {
    'imp-panel': panel
  },
  name: 'userManager',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: null,
      listLoading: true,
      showUserPass: false,
      roleKey: undefined,
      arr: [],
      listQuery: {
        page: 1,
        limit: 5,
        USER_NAME: undefined,
        flag: undefined,
        importance: undefined,
        sort: '+USER_ID',
        roleId: undefined
      },
      flagOptions,
      sortOptions: [
        { label: '正序', key: '+USER_ID' },
        { label: '倒序', key: '-USER_ID' }
      ],
      multipleSelection: [],
      temp: {
        USER_ID: undefined,
        USER_CODE: '',
        USER_NAME: '',
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
        groupName: '',
        roleId: ''

      }, listUpdate: {

        GROUP_ID: undefined,
        arr: []
      },
      roleTree: [],
      defaultProps: {
        children: 'children',
        label: 'groupName',
        id: 'id'
      }, treeListQuery: {
        sysCode: undefined
      }
    }
  },
  filters: { // 本地过滤器
    typeFilter(type) { // 调用方法把下拉数据进行重新拼装，并获取到名称的值
      return flagOptionsKeyValue[type]
    }
  }, watch: { // 监听器，当multipleSelection 发生改变时
    multipleSelection: function() { // 把选中的数据id放到数组里，以便后期传值用
      this.arr = []
      for (var i = this.multipleSelection.length - 1; i >= 0; i--) {
        // if (this.multipleSelection[i].roleId !== this.$refs.roleTree.getCurrentKey()) {
        this.arr.push(this.multipleSelection[i].USER_ID) // this.$refs.multipleTable.toggleRowSelection(this.list[i]);
        // }
      }
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchUserRoleList(this.listQuery).then(response => { // 查询选中角色的用户信息
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    }, load() {
      this.treeListQuery.sysCode = this.$store.state.user.sysCode
      fetchRoleList(this.treeListQuery).then(response => {
        if (response.data.code === 2000) {
          if (response.data.items) { // 由于mockjs 不支持自定义状态码只能这样hack
            this.roleTree = response.data.items
          }
          // this.roleTree.push(...defaultValue.roleList);
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
      // this.roleTree.push(...defaultValue.roleList);
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.listQuery.roleId = this.roleKey
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.listQuery.roleId = this.roleKey
      this.getList()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.roleKey = undefined
      this.listQuery.roleId = this.roleKey
      this.getList()
    }, renderContent(h, { node, data, store }) { // 给左侧菜单遍历数据
      return (
        <span>
          <span>
            <span>{node.label}</span>
          </span>
        </span>)
    }, handleNodeClick(data) { // 为选中的角色查询出用户信息
      this.listLoading = true
      this.roleKey = this.$refs.roleTree.getCurrentKey()
      this.listQuery.roleId = this.roleKey
      fetchUserRoleList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    }, updateRole() { // 给用户分配角色权限
      if (this.multipleSelection.length <= 0 || this.$refs.roleTree.getCurrentKey() == null) {
        this.$notify({   position: 'bottom-right',
          title: '失败',
          message: '请选择角色和用户',
          type: 'error',
          duration: 2000
        })
      } else {
        this.listUpdate.GROUP_ID = this.$refs.roleTree.getCurrentKey()
        this.listUpdate.arr = this.arr
        updateUserRoleArticle(this.listUpdate).then(response => {
          var message = response.data.message
          var title = '失败'
          var type = 'error'
          if (response.data.code === 2000) {
            title = '成功'
            type = 'success'
            this.arr = []
            this.getList()
            this.load()
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
        this.$confirm('将永久删除该用户的所有分配角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listUpdate.GROUP_ID = this.$refs.roleTree.getCurrentKey()
          this.listUpdate.arr = this.arr
          deleteUserRoleArticle(this.listUpdate).then(response => {
            var message = response.data.message
            var title = '失败'
            var type = 'error'
            if (response.data.code === 2000) {
              title = '成功'
              type = 'success'
              this.arr = []
              this.getList()
              this.load()
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
    }, handleSelectionChange(val) { // 点击右边表格数据时，把数据赋值给声明的数组
      this.multipleSelection = val
    }, tableRowClassName({ row, rowIndex }) { // 给table定义class名称，然后赋值给它scss样式
      if (rowIndex === 0) {
        return 'el-button--primary is-active'// 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return ''
    }
  },
  created() {
    this.getList()
    this.load()
  }
}
</script>
<style lang="scss" scoped> 

</style>