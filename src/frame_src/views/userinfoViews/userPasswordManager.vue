<template>
 <div class="app-container calendar-list-container">  
   <el-card class="box-card">
     <div class="filter-container">
        <p class="title"><i class="fa fa-edit"></i>修改密码</p>
            <el-form class="form"  :model="pwdForm" :rules="pwdRules" ref="pwdForm" label-width="100px">
            <el-form-item label="原密码" prop="password">
                <el-input type="password" v-model="pwdForm.password" auto-complete="off" size="small" placeholder="请输入原密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpassword">
                <el-input type="password" v-model="pwdForm.newpassword" auto-complete="off" size="small" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="surepassword">
                <el-input type="password" v-model="pwdForm.surepassword" auto-complete="off" size="small" placeholder="请输入确认新密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('pwdForm')">提交</el-button>
                <el-button @click="resetForm('pwdForm')">重置</el-button>
            </el-form-item>
            </el-form>
     </div>
   </el-card>
  </div>
          
</template>
<script>
import { updatePasswordData } from '@/frame_src/api/user'

export default {
  data() {
    // validateField:对部分表单字段进行校验的方法
    const validateNewpassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.pwdForm.surepassword !== '') {
          this.$refs.pwdForm.validateField('surepassword')
        } else if (value === this.pwdForm.password) {
          callback(new Error('新密码不能跟老密码一致!'))
        }
        callback()
      }
    }
    const validateSurepassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.pwdForm.newpassword) {
        callback(new Error('两次输入密码不一致!'))
      } else if (value === this.pwdForm.password) {
        callback(new Error('新密码不能跟老密码一致!'))
      } else {
        callback()
      }
    }
    return {
      pwdForm: {
        password: '',
        newpassword: '',
        surepassword: ''
      },
      listUpdate: {
        password: '',
        newpassword: '',
        userid: '',
        roleLevel:''
      },
      pwdRules: {
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newpassword: [
          { required: true, validator: validateNewpassword, trigger: 'blur' }
        ],
        surepassword: [
          { required: true, validator: validateSurepassword, trigger: 'blur' }
        ]
      }
    }
  },
  filters: {},
  watch: {},
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) { // 提交修改密码
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.listUpdate.password = this.pwdForm.password
          this.listUpdate.newpassword = this.pwdForm.newpassword
          //  var userCode = this.$store.state.user.code //获取登陆信息的 俩种方式
          //   var name = this.$store.getters.name
          // this.listUpdate.userid = this.$store.state.user.userId
          this.listUpdate.userid = this.$store.state.user.code;
          this.listUpdate.roleLevel=this.$store.state.user.roleLevel;
          updatePasswordData(this.listUpdate).then(response => {
            this.message = response.data.message
            this.title = '失败'
            this.type = 'error'
            if (response.data.code === 2000) {
              this.title = '成功'
              this.type = 'success'
              this.resetForm(formName)
            }
            this.$notify({   position: 'bottom-right',
              title: this.title,
              message: this.message,
              type: this.type,
              duration: 2000
            })
          })
        }
      })
    }
  },
  created() {}
}
</script>
<style lang="scss" scoped>
</style>