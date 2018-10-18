<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import adminDashboard from "./admin";
// import editorDashboard from './editor'

export default {
    name: "dashboard",
    // components: { adminDashboard, editorDashboard },
    components: { adminDashboard },
    data() {
        return {
            currentRole: "adminDashboard"
        };
    },
    methods: {
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
        }
    },
    computed: {
        ...mapGetters(["roles"])
    },
    mounted() {
        this.changeSideBarColour();
    }
    /* created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  } */
};
</script>

<style lang="scss" scoped>
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

