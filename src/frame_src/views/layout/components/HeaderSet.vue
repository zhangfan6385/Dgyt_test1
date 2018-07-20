<template>
  <el-menu class="navbar-set" mode="horizontal">

    <div class="right-menu">
      <!-- <error-log class="errLog-container right-menu-item"></error-log> -->
      <div class="logo">
        <!-- <img src="../../../../frame_src/imgs/avatar.png"> -->
        <span>{{userNameMessage}}</span>

        <span style="margin-left:15px;">单位：{{departCodeMessage}}</span>
      </div>


      <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
        <screenfull class="screenfull right-menu-item" style="vertical-align: middle;"></screenfull>
      </el-tooltip>

      <el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">
        <!-- <theme-picker class="theme-switch right-menu-item"></theme-picker> -->
        <theme-picker class="right-menu-item noborder" style="vertical-align: middle;"></theme-picker>
      </el-tooltip>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <!-- <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <i class="el-icon-caret-bottom"></i>
        </div> -->

        <div class="avatar-wrapper">
            <!-- <img v-if='showPng=="1"'  class='user-avatar' src="../../../../frame_src/imgs/avatar.png">
            <img v-else class='user-avatar' src="../../../../frame_src/imgs/nvtou.png"> -->
            <svg-icon icon-class="user" style="color:white;width:25px;height:25px;vertical-align: middle;cursor: pointer;"/> 
            <i class="el-icon-caret-bottom"></i>
        </div>
        <!-- <svg-icon icon-class="user" style="color:white;width:25px;height:25px;vertical-align: middle;cursor: pointer;"/> -->
        <el-dropdown-menu slot="dropdown">
          <router-link to="/userinfoViews/user-password-manager">
            <el-dropdown-item>
              修改密码
            </el-dropdown-item>
          </router-link>

          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'

import ErrorLog from '@/frame_src/components/ErrorLog'
import Screenfull from '@/frame_src/components/Screenfull'
import ThemePicker from '@/frame_src/components/ThemePicker'

export default {
  components: {
    ErrorLog,
    Screenfull,
    ThemePicker
  }, data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ]),
    // 计算属性的 getter
    departCodeMessage: function() {
      return this.$store.state.user.departName
    },
    userNameMessage: function() {
      return this.$store.state.user.name
    },
    showPng: function() {
      return this.$store.state.user.userSex
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.noborder{
  .el-color-picker__trigger{
    border: none;
  }
}

.theme-picker .el-color-picker__trigger{
  border: none;
}

.el-menu--horizontal{
  border-right: none;
  border-bottom: none;
}

.logo {
    float: left;
    margin: 0 20px;
    span {
      margin-left: 8px;
      font-size: 15px;
      font-weight: bold;
      color: #ffffff;
    }

    img {
      vertical-align: top;
      margin-top: 10px;
      height: 30px;
      width: 30px;
    }
  }

.navbar-set {
  background-color: transparent;
  margin-top: 2px;
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    // .theme-switch {
    //   vertical-align: 15px;
    // }
    .avatar-container {
      height: 55px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        // margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 10px;
          vertical-align: middle;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
}
</style>
