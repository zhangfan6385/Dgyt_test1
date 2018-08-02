<template>
  <div class="app-container">
    <imp-panel>
      <h3 class="box-title" slot="header" style="width: 100%;">
        <el-button type="primary" icon="plus" @click="newAdd">新增</el-button>
        <el-button type="danger" icon="delete" @click="batchDelete">删除</el-button>
      </h3>
      <el-row slot="body" :gutter="24" style="margin-bottom: 20px;">
        <el-col :span="6" :xs="24" :sm="24" :md="6" :lg="6" style="margin-bottom: 20px;">
          <el-tree v-if="menuTree"
                  ref="menuTree"
                  :data="menuTree"
                  show-checkbox
                  highlight-current
                  :render-content="renderContent"
                  @node-click="handleNodeClick" clearable node-key="id" :props="defaultProps"></el-tree>
        </el-col>
        <el-col :span="18" :xs="24" :sm="24" :md="18" :lg="18">
          <el-card class="box-card">
            <div class="text item">
              <el-form :model="form" ref="form">
                <el-form-item label="父级" :label-width="formLabelWidth">
                  <!--<el-input v-model="form.parentId" auto-complete="off"></el-input>-->
                  <el-select-tree v-model="form.MENU_ID_UPPER" :treeData.sync="menuSelectTree" :propNames="defaultProps" clearable
                                  placeholder="请选择父级">
                  </el-select-tree>
                </el-form-item>
                <el-form-item label="名称" :label-width="formLabelWidth">
                  <el-input v-model="form.MENU_NAME" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="路由" :label-width="formLabelWidth">
                  <el-input v-model="form.MODULE_ROUTE" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="相对链接" :label-width="formLabelWidth">
                  <el-input v-model="form.MODULE_URL" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="功能对象名" :label-width="formLabelWidth">
                  <el-input v-model="form.MODULE_OBJ" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否显示" :label-width="formLabelWidth">
                  <el-radio class="radio" v-model="form.MENU_PROP" label="1">显示</el-radio>
                  <el-radio class="radio" v-model="form.MENU_PROP" label="0">不显示</el-radio>
                </el-form-item>
                <el-form-item label="图标" :label-width="formLabelWidth">
                  <svg-icon :icon-class="form.MENU_ICON"/>
                  <el-button type="text" @click="selectIconDialog=true">选择</el-button>
                </el-form-item>
                <el-form-item label="排序" :label-width="formLabelWidth">
                  <el-slider v-model="form.MENU_ORDER"></el-slider>
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth">
                  <el-button type="primary" @click="onSubmit" v-text="form.MENU_ID?'修改':'新增'"></el-button>
                  <el-button type="danger" @click="deleteSelected" icon="delete" v-show="form.MENU_ID && form.MENU_ID!=null">删除
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-dialog title="选择图标" :visible.sync="selectIconDialog" size="tiny">
              <div class="select-tree">
                <el-scrollbar
                  tag="div"
                  class='is-empty'
                  wrap-class="el-select-dropdown__wrap"
                  view-class="el-select-dropdown__list">
                  <div class="icons-wrapper"><svg-icon icon-class="404" class-name='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="bug" class-name='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="chart" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="clipboard" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="component" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="dashboard" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="documentation" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="drag" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="email" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="example" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="excel" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="eye" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="form" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="icon" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="international" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="language" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="lock" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="message" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="money" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="password" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="people" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="peoples" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="qq" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="shoppingCard" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="star" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="tab" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="table" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="theme" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="user" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="wechat" className='svg' @svg-click="selectIcon"/>
                  <svg-icon icon-class="zip" className='svg' @svg-click="selectIcon"/></div>
                </el-scrollbar>
              </div>
              <span slot="footer" class="dialog-footer">
            <el-button @click="selectIconDialog = false">取 消</el-button>
            <el-button type="primary" @click="selectIconDialog = false">确 定</el-button>
            </span>
            </el-dialog>
          </el-card>
        </el-col>
      </el-row>
    </imp-panel>
  </div>
</template>
<script type="text/babel">
  import panel from '@/frame_src/components/TreeList/panel.vue'
  import selectTree from '@/frame_src/components/TreeList/selectTree.vue'
  import treeter from '@/frame_src/components/TreeList/treeter'
  import merge from 'element-ui/src/utils/merge'

  import { fetchMenuList, createMenu, updateMenu, deleteMenu } from '@/frame_src/api/menu'

  export default {
    mixins: [treeter],
    components: {
      'imp-panel': panel,
      'el-select-tree': selectTree
    },
    data() {
      return {
        selectIconDialog: false,
        formLabelWidth: '100px',
        defaultProps: {
          children: 'children',
          label: 'MENU_NAME',
          id: 'id'
        },
        maxId: 7000000,
        menuTree: [],
        menuSelectTree: [],
        form: {
          MENU_ID: null,
          MENU_NAME: '',
          MENU_ORDER: 0,
          MENU_ICON: '',
          MODULE_ROUTE: '',
          MODULE_URL: '',
          MODULE_OBJ: '',
          MENU_PROP: '',
          MENU_ID_UPPER: null,
          SYS_CODE: ''
        }
      }
    },
    computed: {
      // 计算属性的 getter
      /* menuSelectTree: function() {
        // `this` 指向 vm 实例
        return this.menuTree
      }, */
      sysCode() {
        return this.$store.getters.sysCode
      }
    },
    methods: {
      selectIcon(svgIcon) {
        //(svgIcon)
        // this.form.MENU_ICON = event.target.className
        this.form.MENU_ICON = svgIcon
        this.selectIconDialog = false
      },
      renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span><svg-icon icon-class={data.MENU_ICON}/>&nbsp;{node.label}</span>
            </span>
          </span>)
      },
      newAdd() {
        this.form = {
          MENU_ID: null,
          MENU_NAME: '',
          MENU_ORDER: 0,
          MENU_ICON: '',
          MODULE_ROUTE: '',
          MODULE_URL: '',
          MODULE_OBJ: '',
          MENU_PROP: '',
          MENU_ID_UPPER: null,
          SYS_CODE: this.sysCode
        }
      },
      deleteSelected() {
        const deleteQuery = { MENU_ID: [] }
        deleteQuery.MENU_ID.push(this.form.MENU_ID)
        deleteMenu(deleteQuery).then(response => {
          let type
          if (response.data.code === 2000) {
            type = 'success'
            this.deleteFromTree(this.menuTree, this.form.MENU_ID, 'id')
            this.newAdd()
            this.loadSelectTree()
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
      // this.load();
      },
      batchDelete() {
        var checkKeys = this.$refs.menuTree.getCheckedKeys()
        if (checkKeys == null || checkKeys.length <= 0) {
          this.$message.warning('请选择要删除的资源')
          return
        }
        const deleteQuery = { MENU_ID: checkKeys }
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMenu(deleteQuery).then(response => {
            if (response.data.code === 2000) {
              this.batchDeleteFromTree(this.menuTree, checkKeys)
              this.newAdd()
              this.loadSelectTree()
            }
            this.$notify({   position: 'bottom-right',
              title: '提示信息',
              message: response.data.message,
              type: 'success',
              duration: 2000
            })
          })
        })
      },
      handleNodeClick(data) {
        this.form = merge({}, data)
        this.form.MENU_ID = this.form.id
        this.form.MENU_ID_UPPER = this.form.parentId
      },
      onSubmit() {
        if (this.form.MENU_ID == null) {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              createMenu(this.form).then(response => {
                let type = 'success'
                if (response.data.code === 2000) {
                  type = 'success'
                  this.form.MENU_ID = response.data.items.MENU_ID
                  var add = {
                    id: this.form.MENU_ID,
                    MENU_NAME: this.form.MENU_NAME,
                    MENU_ORDER: this.form.MENU_ORDER,
                    MENU_ICON: this.form.MENU_ICON,
                    MODULE_ROUTE: this.form.MODULE_ROUTE,
                    MODULE_URL: this.form.MODULE_URL,
                    MODULE_OBJ: this.form.MODULE_OBJ,
                    MENU_PROP: this.form.MENU_PROP,
                    parentId: this.form.MENU_ID_UPPER,
                    children: []
                  }
                  this.appendTreeNode(this.menuTree, add)
                  this.loadSelectTree()
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
            }
          })
        } else {
          updateMenu(this.form).then(response => {
            let type = 'success'
            if (response.data.code === 2000) {
              type = 'success'
              this.updateTreeNode(this.menuTree, merge({}, this.form))
              this.loadSelectTree()
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
        }
      },
      load() {
        this.form.SYS_CODE = this.sysCode
        const query = { sysCode: this.sysCode }
        fetchMenuList(query).then(response => {
          //console.log(response.data)
          this.menuTree = response.data
          this.menuSelectTree = response.data
        })
      },
      loadSelectTree() {
        this.form.SYS_CODE = this.sysCode
        const query = { sysCode: this.sysCode }
        fetchMenuList(query).then(response => {
          this.menuSelectTree = response.data
        })
      }
    },
    created() {
      this.load()
    }
  }
</script>

<style>
  .svg{
    cursor: pointer;
    width:20px;
    height:30px;
    margin:5px;
    /* fill:red; */
  }

  .select-tree .icons-wrapper {
    display: block;
  }

  .select-tree .is-empty i {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
  }

  .select-tree .is-empty i:hover {
    background-color: #0d6aad;
    color: #ffffff;
  }

</style>
