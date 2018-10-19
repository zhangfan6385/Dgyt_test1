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
import { Navbar, Sidebar, AppMain, TagsView, HeaderSet } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
const ORIGINAL_THEME = "#409EFF";
var lastTheme = "#3A8EE6";

export default {
    name: "layout",
    data() {
        return {
            chalk: "", // content of theme-chalk css
            theme: ORIGINAL_THEME,
            STYLE: ""
        };
    },
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
            return this.$store.state.app.sidebar;
        },
        device() {
            return this.$store.state.app.device;
        },
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === "mobile"
            };
        },
        sysNameMessage: function() {
            if (this.$store.state.user.sysName !== "") {
                return this.$store.state.user.sysName;
            } else {
                return "大港油田软件研发平台";
            }
        }
    },
    methods: {
        handleClickOutside() {
            this.$store.dispatch("closeSideBar", { withoutAnimation: false });
        },
        changeSideBarColour() {
            let style = this.$store.state.user.themClass;
            var subMenu = document.querySelector(".sidebar-container .theme");
            if (style === "#3A8EE6") {
                // 蓝
                subMenu.classList.remove("themeGreen", "themeRed", "themeGray");
                subMenu.classList.add("themeBlue");
            } else if (style === "#C03639") {
                // 红
                subMenu.classList.remove(
                    "themeBlue",
                    "themeGreen",
                    "themeGray"
                );
                subMenu.classList.add("themeRed");
            } else if (style === "#30B08F") {
                // 绿
                subMenu.classList.remove("themeBlue", "themeRed", "themeGray");
                subMenu.classList.add("themeGreen");
            } else if (style === "#909399") {
                // 灰
                subMenu.classList.remove("themeGreen", "themeRed", "themeBlue");
                subMenu.classList.add("themeGray");
            } else {
                // 蓝
                subMenu.classList.remove("themeGreen", "themeRed", "themeGray");
                subMenu.classList.add("themeBlue");
            }
        },
        changeTagColour() {
            let style = this.$store.state.user.themClass;
            var tagsColor = document.querySelector(
                ".tags-view-container .tags-view-wrapper .tags-view-item.active"
            );

            //console.log(this.$store.state.user.themClass);
            tagsColor.style.cssText =
                "background-color:" + style + ";border-color:" + style; // 替换颜色
            console.log(tagsColor.style.cssText);
        }
    },
    mounted() {
        this.changeSideBarColour();
    },
    updated() {
        this.changeTagColour();
    },
};
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
    background: 409eff;
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
.sidebar-container .themeBlue {
    background-color: rgb(22, 86, 155) !important;

    .submenu-title-noDropdown {
        background-color: rgb(22, 86, 155) !important;
        &:hover {
            background-color: rgb(20, 76, 136) !important;
        }
    }

    .el-submenu__title {
        background-color: rgb(22, 86, 155) !important;
        &:hover {
            background-color: rgb(20, 76, 136) !important;
        }
    }

    .nest-menu .el-submenu > .el-submenu__title,
    .el-submenu .el-menu-item {
        min-width: 180px !important;
        background-color: rgb(16, 61, 109) !important;
        &:hover {
            background-color: rgb(12, 42, 75) !important;
        }
    }
}

.sidebar-container .themeGreen {
    background-color: rgb(5, 119, 91) !important;

    .submenu-title-noDropdown {
        background-color: rgb(5, 119, 91) !important;
        &:hover {
            background-color: rgb(3, 102, 77) !important;
        }
    }

    .el-submenu__title {
        background-color: rgb(5, 119, 91) !important;
        &:hover {
            background-color: rgb(3, 102, 77) !important;
        }
    }

    .nest-menu .el-submenu > .el-submenu__title,
    .el-submenu .el-menu-item {
        min-width: 180px !important;
        background-color: rgb(3, 80, 61) !important;
        &:hover {
            background-color: rgb(2, 63, 48) !important;
        }
    }
}

.sidebar-container .themeRed {
    background-color: #750000 !important;

    .submenu-title-noDropdown {
        background-color: #750000 !important;
        &:hover {
            background-color: #930000 !important;
        }
    }

    .el-submenu__title {
        background-color: #750000 !important;
        &:hover {
            background-color: #930000 !important;
        }
    }

    .nest-menu .el-submenu > .el-submenu__title,
    .el-submenu .el-menu-item {
        min-width: 180px !important;
        background-color: #4d0000 !important;
        &:hover {
            background-color: #ae0000 !important;
        }
    }
}

.sidebar-container .themeGray {
    .el-submenu__title {
        background-color: #304156 !important;
        &:hover {
            background-color: #263445 !important;
        }
    }
}
</style>
