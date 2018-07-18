<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <div class="header el-button--primary  is-active">
      <el-col :span="12">
        <div class="logo">
          <img src="../../../frame_src/imgs/logo.png">
          <!-- <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"> -->
          <span>{{sysNameMessage}}</span>
        </div>
      </el-col>
      <!-- <el-col :span="6" style="text-aligh:center;">
        <el-input style="width:300px;"
          size="mini"
          placeholder=""
          suffix-icon="el-icon-search">
        </el-input>
      </el-col> -->
      <el-col :span="12">
        <header-set></header-set>
      </el-col>
    </div>
    <div>
      <sidebar class="sidebar-container"></sidebar>
      <div class="main-container">
        <navbar></navbar>
        <tags-view></tags-view>
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView, HeaderSet } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    HeaderSet
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    sysNameMessage: function() {
      if (this.$store.state.user.sysName !== '') {
        return this.$store.state.user.sysName
      } else {
        return '大港油田软件研发平台'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/frame_src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.header {
  position: fixed;
  z-index: 1999;
  min-width: 100%;
  height: 55px;
  // background:#3A71A8;
  background: 409EFF;
  margin: 0 auto;
  line-height: 55px; /*设置line-height与父级元素的height相等*/
  overflow: hidden; /*防止内容超出容器或者产生自动换行*/

  .logo {
    float: left;
    margin: 0 20px;
    span {
      margin-left: 8px;
      font-size: 18px;
      font-weight: bold;
      color: #ffffff;
    }

    img {
      vertical-align: top;
      margin-top: 13px;
      height: 30px;
      width: 30px;
    }
  }
}
</style>
