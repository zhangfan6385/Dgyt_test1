<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="logo title">
        <img src="../../../frame_src/imgs/logo.png">
        <!-- <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"> -->
        <span>{{sysmessage}}</span>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="账号" />
     
  <el-dropdown  class="show-pwd"   @command="handleCommand">
  <span class="el-dropdown-link">
    {{radio}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <div v-for="item in list">
        <el-dropdown-item  :command="item.key">{{item.key}}</el-dropdown-item> 
    </div>
  </el-dropdown-menu>
</el-dropdown>


      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item> 
       <!--<div>
         <el-radio v-model="radio" label="ptrUser">ptr账号</el-radio> 
        <el-radio v-model="radio" label="user">员工账号</el-radio>
        <el-radio v-model="radio" label="localUser">本地账号</el-radio>
       </div> -->
       <br>
      <el-button type="primary" style="width:100%;margin-bottom:30px;background-color:#409EFF;border-color:#409EFF" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>
      <div class="copyright">
        ©{{copyright}}版权所有
      </div>

      <!-- <div class="tips">
        <span>{{$t('login.username')}} : admin</span>
        <span>{{$t('login.password')}} : {{$t('login.any')}}</span>
      </div> -->
       <!-- <div class="tips">
        <span style="margin-right:18px;">{{$t('login.username')}} : editor</span>
        <span>{{$t('login.password')}} : {{$t('login.any')}}</span>
      </div> -->

      <!-- <el-button class="thirdparty-button" type="primary" @click="showDialog=true">{{$t('login.thirdparty')}}</el-button>  -->
    </el-form>

    <el-dialog width="40%" :title="$t('login.loginToUserCode')" :visible.sync="showDialog" append-to-body>
      <log-in-user :updateShowDialog = 'updateShowDialog'/>
    </el-dialog>

  </div>
</template>

<script>
// import { isvalidUsername } from '@/frame_src/utils/validate'
import LangSelect from "@/frame_src/components/LangSelect";
import LogInUser from "./logInUser";
import { Message } from "element-ui";
import { GetTitle } from "@/frame_src/api/title";
const userOptions = [
  { key: "ptr账号", user_code: "ptrUser" },
  { key: "员工账号", user_code: "user" },
  { key: "本地账号", user_code: "localUser" }
];
const userOptionsKeyValue = userOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.user_code;
  return acc;
}, {});
export default {
  components: { LangSelect, LogInUser },
  name: "login",
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位！"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        userDomain: ""
      },
      loginRules: {
        // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      loading: false,
      showDialog: false,
      radio: "",
      code: "",
      list: [],
      sysmessage: "测试平台",
      copyright: "",
    }
  },
  methods: {
    handleCommand(command) {
      this.radio = command;
      for (var item of this.list) {
        if (item.key == command) {
          this.code = item.user_code;
        }
      }
    },

    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    handleLogin() {
      this.$store.state.user.token = "";
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.loginForm.userDomain = this.code;
          //console.log(this.loginForm); // this.radio // 后改需求走登陆账号 所以没有 域账号的说法了
          this.$store
            .dispatch("LoginByUsername", this.loginForm)
            .then(response => {
              this.$store.dispatch("setRoleLevel", response.data.roleLevel);
              if (response.data.roleLevel === "admin") {
                this.$store.dispatch("setUserId",null);
                this.updateShowDialog("");
              } else {
                var userList = this.$store.state.user.userList;
                if (userList.length === 1) {
                  // this.$store.dispatch('setDepartCode', orglist[0].orgId)
                  // this.$store.dispatch('setDepartName', orglist[0].orgName)
                  this.$store.dispatch("setUserId", userList[0].USER_ID);
                  this.updateShowDialog("");
                } else {
                  this.showDialog = true;
                }
                this.loading = false;
              } // this.$router.push({ path: '/' })
            })
            .catch(err => {
              this.loading = false;
              Message.error(err);
            });
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    },
    updateShowDialog(val) {
      this.showDialog = false;
      this.$router.push({ path: "/" });
    },
    GetTitle() {
      GetTitle().then(response => {
        //console.log(response.data.copyright.CONF_VALUE);
        //console.log(response.data.itemtype);
        //console.log(response.data.cloudorg.CONF_VALUE);
        console.log(response.data)
        this.copyright = response.data.copyright.CONF_VALUE;
        this.sysmessage = response.data.sysname.CONF_VALUE;
        this.$store.state.user.UseOrg = Boolean(
          response.data.cloudorg.CONF_VALUE      
        );
        this.$store.state.user.sysName = response.data.sysname.CONF_VALUE;
        this.list = response.data.itemtype;
        this.radio = this.list[0].key;
        this.code = this.list[0].user_code;

      });
    }
  },

  mounted() {
    this.GetTitle();
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
// $bg:#2d3a4b;
$bg: rgb(22, 86, 155);
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  padding: 50px 0;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 70%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    // border: 1px solid rgba(255, 255, 255, 0.1);
    border: 1px solid #ffffff;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .logo {
    text-align: center;
    line-height: 50px;
    padding-bottom: 30px;
    span {
      margin-left: 8px;
      // font-size: 18px;
      font-weight: bold;
      color: #ffffff;
    }

    img {
      vertical-align: middle;
      height: 50px;
      width: 50px;
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: rgb(22, 86, 155);
$dark_gray: #dee7e8; // #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 30px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }

  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .copyright {
    position: fixed;
    bottom: 0px;
    margin-left: 150px;
    margin-bottom: 35px;
    color: gray;
    font-family: "华文楷体";
    font-size: 13px;
  }
}
</style>
