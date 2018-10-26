<template>
  <div class="app-container">  
    <imp-panel>
        
        <el-row slot="body" :gutter="24" style="margin-bottom: 20px;">
        <el-col :span="8" style="margin-bottom: 20px;">
            <el-tree v-if="roleTree"
                    :data="roleTree"
                    ref="roleTree"
                    :default-expand-all='false'
                    :expand-on-click-node='false'
                    :show-checkbox='false'
                    highlight-current
                    :render-content="renderContent"
                    @node-click="handleNodeClick" clearable node-key="id" :props="defaultProps"></el-tree>
        </el-col>
        <el-col :span="16">
            <el-card class="box-card">
                <div class="select-tree">
                    <el-tree
                        :data="resourceTree"
                        ref="resourceTree"
                        :default-expand-all='false'
                        show-checkbox
                        
                        node-key="id"
                        v-loading="dialogLoading"
                        :props="defaultMenuProps">
                    </el-tree>
                </div>
                <div style="margin-top:15px;border:1px solid #D3DCE6"></div>
                <el-button type="primary" style="margin:20px;" @click="configRoleResources">保存</el-button>
            </el-card>
        </el-col>
        </el-row>
    </imp-panel>
  </div>
</template>
<script>
  import panel from '@/frame_src/components/TreeList/panel.vue'
  import treeter from '@/frame_src/components/TreeList/treeter'
  import { fetchMenuList, setRoleMenus, fetchRoleMenuList } from '@/frame_src/api/menu'
  import { fetchRoleList } from '@/frame_src/api/role'

  export default {
    mixins: [treeter],
    components: {
      'imp-panel': panel
    },
    data() {
      return {
        dialogLoading: false,
        dialogVisible: false,
        formLabelWidth: '100px',
        defaultProps: {
          children: 'children',
          label: 'groupName',
          id: 'id'
        },
        defaultMenuProps: {
          children: 'children',
          label: 'MENU_NAME',
          id: 'id'
        },
        roleTree: [],
        resourceTree: []
      }
    },
    computed: {
      // 计算属性的 getter
      sysCode() {
        return this.$store.getters.sysCode
      }
    },
    methods: {
      // 自定义方法，重绘树结构
      renderContent(h, { node, data, store }) {
        return (
          <span>
            <span class='render-content'>
              <i class='el-icon-edit' title='配置资源' on-click={(e) => this.settingResource(e, data.id)}></i>
            </span>
            <span>
              <span>{node.label}</span>
            </span>
          </span>)
      },

      // 给角色分配权限
      configRoleResources() {
        const checkedKeys = this.$refs.resourceTree.getCheckedKeys()
        if (checkedKeys.length <= 0 || this.$refs.roleTree.getCurrentKey() == null) {
          this.$notify({   position: 'bottom-right',
            title: '提示信息',
            message: '请选择角色和菜单',
            type: 'error',
            duration: 2000
          })
          return
        }
        const roleMenuSet = { GROUP_ID: this.$refs.roleTree.getCurrentKey(), MENU_ID: checkedKeys.join(',') }
        let type = 'success'
        setRoleMenus(roleMenuSet).then(response => {
          if (response.data.code === 2000) {
            type = 'success'
          } else {
            type = 'error'
          }
          this.$notify({   position: 'bottom-right',
            title: '提示信息',
            message: response.data.message,
            type: type,
            duration: 2000
          })
        })
      },

      // 左侧角色树节点点击事件
      handleNodeClick(data) {
        this.settingResource(data.id)
      },

      // 初始化角色树及资源树数据
      load() {
        const query = { sysCode: this.sysCode }
        fetchRoleList(query).then(response => {
          this.roleTree = response.data.items
        })

        if (this.resourceTree == null || this.resourceTree.length <= 0) {
          this.dialogLoading = true
          fetchMenuList(query).then(response => {
            this.dialogLoading = false
            this.resourceTree = response.data
          })
        }
      },

      // 获取角色对应的权限
      settingResource(id) {
        const menuListQuery = { sysCode: this.sysCode, roleId: id }
        if (id === undefined) return
        fetchRoleMenuList(menuListQuery).then(response => {
          const menuIds = []
          for (const menuId of response.data) {
            menuIds.push(menuId.MENU_ID)
          }
          this.$refs.resourceTree.setCheckedKeys(menuIds)
        })
      }
    },

    // 生命周期函数
    created() {
      this.load()
    }
  }
</script>

<style>
  .render-content {
    /* float: right; */
    margin-right: 20px
  }

  .render-content i.fa {
    margin-left: 5px;
  }

  .render-content i.fa:hover{
    color: #e6000f;
  }

  .select-tree .el-scrollbar.is-empty .el-select-dropdown__list {
    padding: 0;
  }

  .select-tree .el-scrollbar {
    border: 1px solid #d1dbe5;
  }

  .select-tree .el-tree{
    border:0;
  }

</style>
