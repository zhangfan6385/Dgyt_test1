<template>
 <div class="app-container calendar-list-container">  
   <el-card class="box-card">
     <div class="filter-container">
        <p class="title"><i class="fa fa-edit"></i>初始化配置</p>
            <el-form class="form"  :model="initForm" :rules="initRules" ref="initForm" label-width="150px">
            <el-form-item label="服务器地址">
                <el-input type="text" v-model="initForm.serverAddress" auto-complete="off" size="small"></el-input>
            </el-form-item>
            <el-form-item label="服务器端口号">
                <el-input type="text" v-model="initForm.serverPort" auto-complete="off" size="small"></el-input>
            </el-form-item>
            <el-form-item label="数据库服务器地址">
                <el-input type="text" v-model="initForm.databaseAddress" auto-complete="off" size="small"></el-input>
            </el-form-item>
            <el-form-item label="数据库服务器端口号">
                <el-input type="text" v-model="initForm.databasePort" auto-complete="off" size="small"></el-input>
            </el-form-item>
            <el-form-item label="数据库账号">
                <el-input type="text" v-model="initForm.databaseAccount" auto-complete="off" size="small"></el-input>
            </el-form-item>
            <el-form-item label="数据库口令">
                <el-input type="text" v-model="initForm.databasePwd" auto-complete="off" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('initForm')">提交</el-button>
                <el-button @click="resetForm('initForm')">重置</el-button>
            </el-form-item>
            </el-form>
     </div>
   </el-card>
  </div>
          
</template>
<script>

export default {
  data() {
    return {
      initForm: {
        serverAddress: '',
        serverPort: '',
        databaseAddress: '',
        databasePort: '',
        databaseAccount: '',
        databasePwd: ''
      },
      initRules: {
        serverAddress: [
          { required: true, message: '请输入服务器地址', trigger: 'blur' }
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
          console('success')
        }
      })
    }
  },
  created() {}
}
</script>
<style lang="scss" scoped>
</style>