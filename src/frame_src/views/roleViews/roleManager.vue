<template>
 <div class="app-container calendar-list-container"> 
  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;"> 
 <el-button class="filter-item" style="margin-left: 10px;" @click="newAdd" type="primary" icon="el-icon-edit">{{$t('roleTable.add')}}</el-button>
     
    </h3>
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
          <div class="text item">
            <el-form :rules="rules"  :model="form" ref="form" >
              <el-form-item  :label="$t('roleTable.parent')" :label-width="formLabelWidth">
                <!--<el-input v-model="form.parentId" auto-complete="off"></el-input>-->
                <el-select-tree v-model="form.parentId" :treeData="roleTree" :propNames="defaultProps" clearable
                                placeholder="请选择父级">
                </el-select-tree>
              </el-form-item>
              <el-form-item :label="$t('roleTable.groupCode')" prop="groupCode" :label-width="formLabelWidth">
                <el-input v-model="form.groupCode" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('roleTable.groupName')" prop="groupName" :label-width="formLabelWidth">
                <el-input v-model="form.groupName" auto-complete="off"></el-input>
              </el-form-item>
               <el-form-item :label="$t('roleTable.remark')"  :label-width="formLabelWidth">
                <el-input v-model="form.remark" auto-complete="off"></el-input>
              </el-form-item>
             <!-- <el-form-item :label="$t('roleTable.sysCode')"  :label-width="formLabelWidth">
                <el-input v-model="form.sysCode" auto-complete="off"></el-input>
              </el-form-item> -->
              <el-form-item label="" :label-width="formLabelWidth"> 
            <el-button v-if="form.id==null" size="mini" type="primary"    @click="onOkSubmit">{{$t('roleTable.add')}}
             </el-button>
              <el-button  v-if="form.id!=null"   size="mini" type="primary"   @click="onUpdateSubmit" >{{$t('roleTable.edit')}}
             </el-button> 
              <el-button size="mini" type="danger" @click="deleteSelected" v-show="form.id && form.id!=null" >{{$t('roleTable.delete')}}
            </el-button> 
              </el-form-item>
            </el-form>
          </div>
        </el-card>
 
      </el-col>
    </el-row>
  </imp-panel>

 
    </div>
</template>
<script>
import { fetchRoleList, createRoleArticle, updateRoleArticle, updateRoleData } from '@/frame_src/api/role'
import panel from '@/frame_src/components/TreeList/panel.vue'
import selectTree from '@/frame_src/components/TreeList/selectTree.vue'
import treeter from '@/frame_src/components/TreeList/treeter'
export default {
  mixins: [treeter],
  components: {
    'imp-panel': panel,
    'el-select-tree': selectTree
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
      listUpdate: {
        field: undefined,
        id: undefined
      },
      roleTree: [],
      rules: {// 用于校验

        groupCode: [
          { required: true, message: '角色编号不能为空', trigger: 'change' }
        ],
        groupName: [
          { required: true, message: '角色名称不能为空', trigger: 'change' }
        ]
      },
      resourceTree: [],
      maxId: 700000,

      listQuery: {
        sysCode: undefined
      },
      form: {
        id: null, // id: null,
        parentId: null, // parentId  groupIdUpper
        groupCode: '', // name: '',
        groupName: '', // enName
        remark: '',
        sysCode: ''
        // sort: 0,
        // usable: '1'
      }
    }
  },
  methods: {

    handleNodeClick(data) { // 点击左侧树给右边form赋值
      this.form = data
    },
    newAdd() { // 新增
      this.form = {
        id: null,
        parentId: null,
        groupCode: '',
        groupName: '',
        remark: '',
        sysCode: ''
        // remarks
      }
    },
    onOkSubmit() { // 创建角色信息
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.form.sysCode = this.$store.state.user.sysCode
          createRoleArticle(this.form).then(response => {
            var message = response.data.message
            var title = '失败'
            var type = 'error'
            if (response.data.code === 2000) {
              title = '成功'
              type = 'success'
              this.newAdd()
              this.load()
            }
            this.$notify({   position: 'bottom-right',
              title: title,
              message: message,
              type: type,
              duration: 2000
            })
            this.$refs['form'].resetFields();
          })
        }
      })
    }, onUpdateSubmit() { // 修改角色信息
      this.$refs['form'].validate((valid) => {
        if (valid) {
          updateRoleData(this.form).then(response => {
            var message = response.data.message
            var title = '失败'
            var type = 'error'
            if (response.data.code === 2000) {
              title = '成功'
              type = 'success'
              this.newAdd()
              this.load()
            }
            this.$notify({   position: 'bottom-right',
              title: title,
              message: message,
              type: type,
              duration: 2000
            })
            this.$refs['form'].resetFields();
          })
        }
      })
    },
    deleteSelected(id) {
      this.listUpdate.id = this.form.id
      this.listUpdate.field = 'deletaStatus'
      updateRoleArticle(this.listUpdate).then(response => {
        this.message = '删除失败'
        this.title = '失败'
        if (response.data.code === 2000) {
          //   this.newAdd();
          //  this.load2();
          this.deleteFromTree(this.roleTree, this.form.id, 'id')
          this.title = '成功'
          this.newAdd()
          this.$refs['form'].resetFields();
        }
        this.message = response.data.message
        this.$notify({   position: 'bottom-right',
          title: this.title,
          message: this.message,
          type: 'success',
          duration: 2000
        })
      })
      // this.load();
    },
    load() { // 查询左边角色信息
      this.listQuery.sysCode = this.$store.state.user.sysCode
      fetchRoleList(this.listQuery).then(response => {
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
    },
    renderContent(h, { node, data, store }) { // 循环左侧树的数据
      return (
        <span>
          <span>
            <span>{node.label}</span>
          </span>
          <span class='render-content'>
            <i class='fa fa-trash' on-click={ () => this.deleteSelected(data.id) }></i>
          </span>
        </span>)
    }
  },
  created() {
    this.load()
  }
}
</script>
<style lang="scss" scoped>
  .render-content {
    float: right;
    margin-right: 20px
  }

  .render-content i.fa {
    margin-left: 10px;
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