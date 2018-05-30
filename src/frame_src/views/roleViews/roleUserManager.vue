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
      <el-button class="filter-item"  @click="updateRole" type="primary" icon="el-icon-edit">{{$t('roleTable.mount')}}</el-button>
     </div>
      <el-table :key='tableKey' :data="list"  @selection-change="handleSelectionChange" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
   
         <el-table-column 
          prop="id"
          type="selection"
          width="50"> 
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
      <el-table-column width="110px" align="center" :label="$t('userTable.flag')">
        <template slot-scope="scope">
          <el-tag>{{scope.row.flag | typeFilter}}</el-tag>
        </template>
       </el-table-column>
      <el-table-column min-width="180px"  align="center" :label="$t('userTable.remark')">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
       </el-table-column>
       <el-table-column min-width="110px"  align="center" :label="$t('userTable.groupName')">
        <template slot-scope="scope">
          <span>{{scope.row.groupName}}</span>
        </template>
       </el-table-column>
    </el-table>
      <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div> 
   
      </el-card>
      </el-col>
    </el-row>
    </imp-panel>
  </div>
</template>
<script>
import { fetchRoleList, fetchUserRoleList, updateUserRoleArticle } from '@/frame_src/api/article'
import waves from '@/frame_src/directive/waves' // 水波纹指令
// import { parseTime } from '@/frame_src/utils'
import panel from '@/frame_src/components/TreeList/panel.vue'
import treeter from '@/frame_src/components/TreeList/treeter'
const flagOptions = [{ key: 0, flag_name: 'no' }, { key: 1, flag_name: 'yes' }]
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
      list: null,
      total: null,
      listLoading: true,
      showUserPass: false,
      listQuery: {
        page: 1,
        limit: 5,
        userName: undefined,
        flag: undefined,
        importance: undefined,
        sort: '+userId',
        roleId: undefined
      },
      flagOptions,
      sortOptions: [
        { label: '正序', key: '+userId' },
        { label: '倒序', key: '-userId' }
      ],
      multipleSelection: [],
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
        remark: '',
        groupName: '',
        roleId: ''

      }, listUpdate: {

        roleId: undefined,
        multipleSelection: []
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
  filters: {
    typeFilter(type) {
      return flagOptionsKeyValue[type]
    }
  }, watch: {
    multipleSelection: function() {
      const arr = []
      for (const i in this.multipleSelection) {
        arr.push(this.multipleSelection[i].userId)
      }
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchUserRoleList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    }, load() {
      this.treeListQuery.sysCode = '2'
      fetchRoleList(this.treeListQuery).then(response => {
        this.roleTree = response.data.items
      })
      // this.roleTree.push(...defaultValue.roleList);
    },
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
    }, renderContent(h, { node, data, store }) {
      return (
        <span>
          <span>
            <span>{node.label}</span>
          </span>
          <span class='render-content'>
            <i class='fa fa-trash' on-click={ () => this.deleteSelected(data.id) }></i>
          </span>
        </span>)
    }, handleNodeClick(data) {
      this.listLoading = true
      this.listQuery.roleId = this.$refs.roleTree.getCurrentKey()

      fetchUserRoleList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    }, updateRole() {
      if (this.multipleSelection.length <= 0 || this.$refs.roleTree.getCurrentKey() == null) {
        this.$notify({
          title: '失败',
          message: '请选择角色和用户',
          type: 'error',
          duration: 2000
        })
      } else {
        this.listUpdate.roleId = this.$refs.roleTree.getCurrentKey()
        this.listUpdate.multipleSelection = this.multipleSelection
        updateUserRoleArticle(this.listUpdate).then(response => {
          this.message = '分配成功'
          this.title = '成功'
          if (response.data.result == true) {
            this.getList()
            this.load()
          }
          this.message = response.data.message
          this.$notify({
            title: this.title,
            message: this.message,
            type: 'success',
            duration: 2000
          })
        })
      }
    }, handleSelectionChange(val) {
      this.multipleSelection = val
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