<template>
  <div class="app-container">  
    <imp-panel>
        
        <el-row slot="body" :gutter="24" style="margin-bottom: 20px;">
        <el-col :span="8" style="margin-bottom: 20px;">
            <el-tree v-if="roleTree"
                    :data="roleTree"
                    ref="roleTree"
                    :default-expand-all=true
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
                        :default-expand-all=true
                        show-checkbox
                        check-strictly
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
          label: 'name',
          id: 'id'
        },
        roleTree: [],
        resourceTree: [],
        roleListQuery: {
          sysCode: undefined
        },
        menuListQuery: {
          sysCode: undefined,
          roleId: undefined
        },
        roleMenuSet: {
          roleId: undefined,
          menuIds: undefined
        }
      }
    },
    methods: {
      configRoleResources() {
        const checkedKeys = this.$refs.resourceTree.getCheckedKeys()
        /* this.$http.get(api.SYS_SET_ROLE_RESOURCE + '?roleId=' + this.form.id + '&resourceIds=' + checkedKeys.join(','))
          .then(res => {
            this.$message('修改成功')
            this.dialogVisible = false
          }) */

        if (this.checkedKeys.length <= 0 || this.$refs.roleTree.getCurrentKey() == null) {
          this.$notify({
            title: '失败',
            message: '请选择角色和菜单',
            type: 'error',
            duration: 2000
          })
          return
        }
        this.roleMenuSet.roleId = this.$refs.resourceTree.getCurrentKey()
        this.roleMenuSet.menuIds = checkedKeys.join(',')
        setRoleMenus(this.roleMenuSet).then(response => {
          this.message = '配置失败'
          this.title = '失败'
          if (response.data.result === true) {
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
      handleNodeClick(data) {
        this.settingResource(data.id)
      },

      // 初始化角色树数据
      load() {
        // sysApi.roleList().then(res => {
        //   this.roleTree = []
        //   this.roleTree.push(...res)
        // })

        this.roleListQuery.sysCode = '2'
        fetchRoleList(this.roleListQuery).then(response => {
          this.roleTree = response.data.items
        })
      },
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
      settingResource(id) {
        // event.stopPropagation()
        if (this.resourceTree == null || this.resourceTree.length <= 0) {
          this.dialogLoading = true
          /* sysApi.resourceList()
            .then(res => {
              this.dialogLoading = false
              this.resourceTree = res
            }) */
          this.roleListQuery.sysCode = '1'
          fetchMenuList(this.roleListQuery).then(response => {
            this.dialogLoading = false
            this.resourceTree = response.data.items
          })
        }
        /* this.$http.get(api.SYS_ROLE_RESOURCE + '?id=' + id)
          .then(res => {
            this.$refs.resourceTree.setCheckedKeys(res.data)
          }).catch(err => {

          }) */
        this.menuListQuery.sysCode = '1'
        this.menuListQuery.roleId = Number(id)
        if (id === undefined) return
        fetchRoleMenuList(this.menuListQuery).then(response => {
          if (response.data.items[0] === undefined) return
          this.$refs.resourceTree.setCheckedKeys(response.data.items[0].id)
        })
      }
    },
    created() {
      this.load()
      this.settingResource()
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
