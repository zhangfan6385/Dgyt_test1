<template>
    <div id="login-container" class="login-container">
        <el-container>
            <el-header>
                <el-row type="flex">
                    <el-col :span="2"></el-col>
                    <el-col :span="10">
                        <div class="title">
                            <img src="../../../frame_src/imgs/logo.png">
                            {{sysmessage}}
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="info">
                            {{currentTime}}
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <div  style="width:100%;height:100%;" class="back">
                <el-row type="flex" >
                    <!-- <el-col :span="2"></el-col> -->
                    <el-col  :span="24">
            <el-main>
                <el-row type="flex">
                    <el-col :span="24">
                        <div class="loginform">
                            <div class="header">
                                <div class="logo">
                                    用户登录
                                </div>
                            </div>
                            <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
                                <el-form-item prop="username">
                                    <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入账号">
                                        <template slot="prepend">
                                            <svg-icon icon-class="user" />
                                        </template>
                                        <el-dropdown class="show-pwd" @command="handleCommand" slot="append">
                                            <span class="el-dropdown-link">
                                                {{radio}}<i class="el-icon-arrow-down el-icon--right"></i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <div v-for="(item,index) in list" :key="index">
                                                    <el-dropdown-item :command="item.key">{{item.key}}</el-dropdown-item>
                                                </div>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </el-input>
                                </el-form-item>

                                <el-form-item prop="password">
                                    <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码">
                                        <template slot="prepend">
                                            <svg-icon icon-class="password" />
                                        </template>
                                        <template slot="append">
                                            <el-button icon="el-icon-view" @click="showPwd" />
                                        </template>
                                    </el-input>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary" class="button" :loading="loading" @click.native.prevent="handleLogin">用户登录</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
            </el-main></el-col>
             <!-- <el-col :span="2"></el-col> -->
            </el-row></div>

            <el-footer>
                <div class="copyright">
                    ©{{copyright}}
                </div>
            </el-footer>
        </el-container>
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
                    {
                        required: true,
                        trigger: "blur",
                        validator: validatePassword
                    }
                ]
            },
            passwordType: "password",
            loading: false,
            showDialog: false,
            radio: "",
            code: "",
            list: [],
            sysmessage: "测试平台",
            copyright: "测试版权",
            currentTime: ""
        };
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
                    this.$store
                        .dispatch("LoginByUsername", this.loginForm)
                        .then(response => {
                            this.$store.dispatch(
                                "setRoleLevel",
                                response.data.roleLevel
                            );
                            if (response.data.roleLevel === "admin") {
                                this.$store.dispatch("setUserId", null);
                                this.updateShowDialog("");
                            } else {
                                var userList = this.$store.state.user.userList;
                                if (userList.length === 1) {
                                    // this.$store.dispatch('setDepartCode', orglist[0].orgId)
                                    // this.$store.dispatch('setDepartName', orglist[0].orgName)
                                    this.$store.dispatch(
                                        "setUserId",
                                        userList[0].USER_ID
                                    );
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
                this.copyright = response.data.copyright.CONF_VALUE;
                this.sysmessage = response.data.sysname.CONF_VALUE;
                this.$store.state.user.UseOrg = Boolean(
                    response.data.cloudorg.CONF_VALUE
                );
                this.$store.state.user.sysName =
                    response.data.sysname.CONF_VALUE;
                this.list = response.data.itemtype;
                this.radio = this.list[0].key;
                this.code = this.list[0].user_code;
                document.title = this.sysmessage;
            });
        },
        getTime() {
            let date = new Date();
            let year = date.getFullYear();

            //由于js的月份是从0开始的,所以月份加上1
            let month = date.getMonth() + 1;

            //返回的是一个月中的某一天1-31
            let myDate = date.getDate();

            //返回的是一个星期中的某一天0-6,0是一个星期的第一天星期天
            let myDay = date.getDay();

            //获取24小时格式的小时
            let hours = date.getHours();
            this.currentTime =
                year +
                "年" +
                month +
                "月" +
                myDate +
                "日,星期" +
                myDay +
                "," +
                hours +
                "点";
        }
    },

    mounted() {
        this.GetTitle();
        this.getTime();
    },
    created() {
        // window.addEventListener('hashchange', this.afterQRScan)
    },
    destroyed() {
        // window.removeEventListener('hashchange', this.afterQRScan)
    }
};
</script>


<style lang="scss">
.login-container {
    .el-header {
        background-color: white;
        height: 150px;
        .title {
            margin-top: 3px;
            font-weight: bold;
            font-size: 18px;
            letter-spacing: 3px;
            font-family: "雅黑";
            img {
                vertical-align: middle;
                height: 50px;
                width: 50px;
            }
        }
        .info {
            float: right;
            margin-right: 20px;
            margin-top: 20px;
            font-size: 13px;
            font-family: "微软雅黑";
            color: gray;
        }
    }
//     .back {
//     overflow: hidden;
//     background:rgb(35, 48, 148);
//     box-shadow:0 0 150px 300px rgba(12, 25, 141, 0.7) inset;
// }
    .el-main {
//         :after{
//   position:absolute;
//   content:'';
//   width:100%;
//   height:100%;
//   top:0;
//   left:0;
//   border-radius:2%;
//   box-shadow:0 0 30px 10px rgba(29, 25, 221, 0.7) inset;
// }
        border-left:0px;
        box-shadow:0 0 40px 30px rgba(12, 25, 141, 0.7) inset;
        width:100%;//1100px;
       // margin-left:30px;
        background:url('../../../frame_src/imgs/loginback.png');
        background-repeat: no-repeat;
        background-size:100%;
        min-height: 520px;
        // -webkit-filter: blur(5px);
        // -moz-filter: blur(5px);
        // -ms-filter: blur(5px);
        // filter: blur(5px);
        // //background: url(xxxxxxxxxxx);
        // overflow: hidden;
        .loginform {
            margin-top: 15px;
            background: white;
            width: 400px;
            height: 430px;
            border-radius: 10px;
            filter: alpha(opacity=50);
            -moz-opacity: 0.8;
            -khtml-opacity: 0.8;
            opacity: 0.8;
            float: right;
            margin-right: 10%;
            .header {
                line-height: 40px;
                font-size: 15px;
                font-weight: bold;
                font-family: "雅黑";
                border-radius: 10px 10px 0 0;
                height: 40px;
                background-color: rgba(184, 179, 179, 0.904);
            }
            .logo {
                margin-left: 15%;
            }
            .el-form-item {
                // border: 1px solid rgba(255, 255, 255, 0.1);
                border: 1px solid #ffffff;
                //background: rgba(0, 0, 0, 0.1);
                border-radius: 5px;
            }
            .login-form {
                .el-input {
                    margin-top: 13%;
                    margin-left: 15%;
                    width: 80%;
                }
            }
            .el-form-item__error {
                margin-left: 15%;
            }
            .button {
                float: right;
                width: 30%;
                margin-right: 15%;
                margin-top: 30px;
            }
        }
    }
    
    .el-footer {
        background: white;
        height: 150px;
        .copyright {
            margin-left: 45%;
            //margin-bottom: 35px;
            margin-top: 12px;
            color: gray;
            font-family: "微软雅黑";
            font-size: 13px;
        }
    }
}
</style>
