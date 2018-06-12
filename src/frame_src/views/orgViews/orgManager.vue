<template>
 <div class="app-container calendar-list-container"> 
  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;"> 
 <el-button class="filter-item" style="margin-left: 10px;" @click="newAdd" type="primary" icon="el-icon-edit">{{$t('orgTable.add')}}</el-button>
     
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
              <el-form-item  :label="$t('orgTable.parent')" :label-width="formLabelWidth">
                <!--<el-input v-model="form.parentId" auto-complete="off"></el-input>-->
                <el-select-tree v-model="form.parentId" :treeData="roleTree" :propNames="defaultProps" clearable
                                placeholder="请选择父级">
                </el-select-tree>
              </el-form-item>
              <el-col :span="12" :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
                <el-form-item :label="$t('orgTable.orgCode')" prop="orgCode" :label-width="formLabelWidth">
                <el-input v-model="form.orgCode" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
                <el-form-item :label="$t('orgTable.orgName')" prop="orgName" :label-width="formLabelWidth">
                <el-input v-model="form.orgName" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
                <el-form-item :label="$t('orgTable.orgNameFull')" prop="orgNameFull" :label-width="formLabelWidth">
                <el-input v-model="form.orgNameFull" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
                <el-form-item :label="$t('orgTable.orgAddr')" prop="orgAddr" :label-width="formLabelWidth">
                <el-input v-model="form.orgAddr" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
                <el-form-item :label="$t('orgTable.phone')" prop="phone" :label-width="formLabelWidth">
                <el-input v-model="form.phone" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
                <el-form-item :label="$t('orgTable.phoneS')" prop="phoneS" :label-width="formLabelWidth">
                <el-input v-model="form.phoneS" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
                <el-form-item :label="$t('orgTable.phoneFax')" prop="phoneFax" :label-width="formLabelWidth">
                <el-input v-model="form.phoneFax" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
                <el-form-item :label="$t('orgTable.remark')"  :label-width="formLabelWidth">
                <el-input v-model="form.remark" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="12" :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
              <el-form-item label="" :label-width="formLabelWidth"> 
              
              <el-button v-if="form.id==null" size="mini" type="primary"    @click="onOkSubmit">{{$t('orgTable.add')}}
              </el-button>
                <el-button  v-if="form.id!=null"   size="mini" type="primary"   @click="onUpdateSubmit" >{{$t('orgTable.edit')}}
              </el-button> 
                <el-button size="mini" type="danger" @click="deleteSelected" v-show="form.id && form.id!=null" >{{$t('orgTable.delete')}}
              </el-button> 
            
              </el-form-item>
                </el-col>
            </el-form>
          </div>
        </el-card>
 
      </el-col>
    </el-row>
  </imp-panel>

 
    </div>
</template>
<script>
import { fetchOrgList, createOrgArticle, updateOrgArticle, updateOrgData } from '@/frame_src/api/org'
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
      formLabelWidth: '120px',
      defaultProps: {
        children: 'children',
        label: 'orgName',
        id: 'id'
      },
      listUpdate: {
        field: undefined,
        id: undefined
      },
      roleTree: [],
      rules: {

        orgCode: [
          { required: true, message: '组织结构代码不能为空', trigger: 'change' }
        ],
        orgName: [
          { required: true, message: '组织结构名称不能为空', trigger: 'change' }
        ]
      },
      resourceTree: [],
      maxId: 700000,

      listQuery: {
        sysCode: undefined// 回头注释掉
      },
      form: {
        id: null, // id: null,
        parentId: null, // parentId  orgid
        orgCode: '', // name: '',
        orgName: '', // enName
        orgNameFull: '', // enName
        orgAddr: '', // enName
        phone: '', // enName
        phoneS: '', // enName
        phoneFax: '',
        remark: ''
      }
    }
  },
  methods: {

    handleNodeClick(data) {
      this.form = data
    },
    newAdd() {
      this.form = {
        id: null,
        parentId: null, // parentId  orgid
        orgCode: '', // name: '',
        orgName: '', // enName
        orgNameFull: '', // enName
        orgAddr: '', // enName
        phone: '', // enName
        phoneS: '', // enName
        phoneFax: '',
        remark: ''
      }
    },
    onOkSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          createOrgArticle(this.form).then(response => {
            this.newAdd()
            this.load2()

            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }, onUpdateSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          updateOrgData(this.form).then(response => {
            this.newAdd()
            this.load2()

            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    load2() {
      this.listQuery.sysCode = '2'// 回头注释掉
      fetchOrgList(this.listQuery).then(response => {
        this.roleTree = response.data.items
      })
      // this.roleTree.push(...defaultValue.roleList);
    },
    deleteSelected(id) {
      this.listUpdate.id = this.form.id
      this.listUpdate.field = 'deletaStatus'
      updateOrgArticle(this.listUpdate).then(response => {
        this.message = '删除失败'
        this.title = '失败'
        if (response.data.result === true) {
          //   this.newAdd();
          //  this.load2();
          this.deleteFromTree(this.roleTree, this.form.id, 'id')
          this.title = '成功'
          this.newAdd()
        }
        this.message = response.data.message
        this.$notify({
          title: this.title,
          message: this.message,
          type: 'success',
          duration: 2000
        })
      })
      // this.load();
    },
    load() {
      this.listQuery.sysCode = '1'// 回头注释掉
      fetchOrgList(this.listQuery).then(response => {
        this.roleTree = response.data.items
        // this.roleTree.push(...defaultValue.roleList);
      })
    },
    renderContent(h, { node, data, store }) {
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