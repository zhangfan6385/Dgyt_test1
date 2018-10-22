import { param2Obj } from '@/frame_src/utils'
import merge from 'element-ui/src/utils/merge'
const roleMenuList = [
  {
    'id': [1, 31, 912, 913, 92, 93], 'roleId': 26
  },
  {
    'id': [102, 103], 'roleId': 27
  },
  {
    'id': [6, 108, 7, 8, 9], 'roleId': 28
  }
]

const testMenuList = [
  {
    'SYS_CODE': '1',
    'MENU_ID': 'EEE',
    'MENU_NAME': 'EEE',
    'MENU_ID_UPPER': 'EEE',
    'MENU_ICON': 'EEE',
    'MODULE_URL': 'EEE',
    'MODULE_OBJ': 'EE',
    'MENU_PROP': '1',
    'MENU_ORDER': 1
  }
]

const menuList1 = [
{
    'SYS_CODE': '0',
    'id': '6b773e53-3f3c-4f58-8e89-86a5e223ac33',
    'MENU_NAME': 'Demo',
    'parentId': '',
    'MENU_ICON': 'documentation',
    'MODULE_URL': 'frame_src/views/demo',
    'MODULE_ROUTE': '/demo',
    'MODULE_OBJ': '',
    'MENU_PROP': '1',
    'MENU_ORDER': 6,
    'children': [{
      'SYS_CODE': '0',
      'id': 'dd901286-d7ba-4c3b-b75a-84c0edc42eff',
      'MENU_NAME': 'Demo案例',
      'parentId': '6b773e53-3f3c-4f58-8e89-86a5e223ac33',
      'MENU_ICON': 'documentation',
      'MODULE_URL': 'frame_src/views/demo/',
      'MODULE_ROUTE': 'demo',
      'MODULE_OBJ': 'demo',
      'MENU_PROP': '1',
      'MENU_ORDER': 0,
      'children': []
    }]
  },
  {
    'id': 31, 'MODULE_ROUTE': '/uidpConfigViews', 'MODULE_OBJ': '', 'parentId': null, 'sort': 1, 'MENU_NAME': '基础信息管理', 'MODULE_URL': 'frame_src/views/uidpConfigViews', 'MENU_ICON': 'fa fa-upload', 'children':
      [
        { 'id': 93, 'MODULE_ROUTE': 'uidp-config-manager', 'MODULE_OBJ': 'uidpConfigManager', 'parentId': 31, 'sort': 0, 'MENU_NAME': '平台信息管理', 'MODULE_URL': 'frame_src/views/uidpConfigViews/', 'MENU_ICON': 'fa fa-area-chart', 'children': [], 'MENU_PROP': '1', 'roleId': [26, 27] },
        { 'id': 93, 'MODULE_ROUTE': 'uidp-sys-info-manager', 'MODULE_OBJ': 'uidpSysInfoManager', 'parentId': 31, 'sort': 0, 'MENU_NAME': '在建系统信息管理', 'MODULE_URL': 'frame_src/views/uidpConfigViews/', 'MENU_ICON': 'fa fa-area-chart', 'children': [], 'MENU_PROP': '1', 'roleId': [26, 27] }
      ],
    'MENU_PROP': '1', 'roleId': [26, 27]
  },
  {
    'id': 102, 'MODULE_ROUTE': '/roleViews', 'MODULE_OBJ': '', 'parentId': null, 'sort': 3, 'MENU_NAME': '角色管理', 'MODULE_URL': 'frame_src/views/roleViews', 'MENU_ICON': 'fa fa-download', 'children':
      [
        { 'id': 103, 'MODULE_ROUTE': 'role-manager', 'MODULE_OBJ': 'roleManager', 'parentId': 102, 'sort': 0, 'MENU_NAME': '注册角色', 'MODULE_URL': 'frame_src/views/roleViews/', 'MENU_ICON': 'fa fa-image', 'children': [], 'MENU_PROP': '1', 'roleId': [27] },
        { 'id': 104, 'MODULE_ROUTE': 'role-user-manager', 'MODULE_OBJ': 'roleUserManager', 'parentId': 102, 'sort': 0, 'MENU_NAME': '角色挂载', 'MODULE_URL': 'frame_src/views/roleViews/', 'MENU_ICON': 'fa fa-image', 'children': [], 'MENU_PROP': '1', 'roleId': [27] }
      ],
    'MENU_PROP': '1', 'roleId': [27]
  },
  {
    'id': 6, 'MODULE_ROUTE': '/menu', 'MODULE_OBJ': '', 'parentId': null, 'sort': 6, 'MENU_NAME': '菜单权限', 'MODULE_URL': 'frame_src/views/menu', 'MENU_ICON': 'fa fa-cog', 'children':
      [
        { 'id': 108, 'MODULE_ROUTE': 'menu-manager', 'MODULE_OBJ': 'menuManager', 'parentId': 6, 'sort': 0, 'MENU_NAME': ' 菜单管理', 'MODULE_URL': 'frame_src/views/menu/', 'MENU_ICON': 'fa fa-database', 'children': [], 'MENU_PROP': '1', 'roleId': [27, 28] },
        { 'id': 109, 'MODULE_ROUTE': 'menu-permission-manager', 'MODULE_OBJ': 'menuPermissionManager', 'parentId': 6, 'sort': 1, 'MENU_NAME': '权限分配', 'MODULE_URL': 'frame_src/views/menu/', 'MENU_ICON': 'fa fa-navicon', 'children': [], 'MENU_PROP': '1', 'roleId': [27, 28] }
      ],
    'MENU_PROP': '1', 'roleId': [27, 28]
  },
  {
    'id': 7, 'MODULE_ROUTE': '/orgViews', 'MODULE_OBJ': '', 'parentId': null, 'sort': 6, 'MENU_NAME': '组织结构', 'MODULE_URL': 'frame_src/views/orgViews', 'MENU_ICON': 'fa fa-cog', 'children':
      [
        { 'id': 110, 'MODULE_ROUTE': 'org-manager', 'MODULE_OBJ': 'orgManager', 'parentId': 7, 'sort': 2, 'MENU_NAME': '组织机构配置', 'MODULE_URL': 'frame_src/views/orgViews/', 'MENU_ICON': 'fa fa-universal-access', 'children': [], 'MENU_PROP': '1', 'roleId': [27, 28] },
        { 'id': 111, 'MODULE_ROUTE': 'org-user-manager', 'MODULE_OBJ': 'orgUserManager', 'parentId': 7, 'sort': 3, 'MENU_NAME': '组织机构挂载', 'MODULE_URL': 'frame_src/views/orgViews/', 'MENU_ICON': 'fa fa-user-plus', 'children': [], 'MENU_PROP': '1', 'roleId': [27, 28] }
      ],
    'MENU_PROP': '1', 'roleId': [27, 28]
  },
  {
    'id': 8, 'MODULE_ROUTE': '/logInfoViews', 'MODULE_OBJ': '', 'parentId': null, 'sort': 6, 'MENU_NAME': '日志管理', 'MODULE_URL': 'frame_src/views/logInfoViews', 'MENU_ICON': 'fa fa-cog', 'children':
      [
        { 'id': 112, 'MODULE_ROUTE': 'log-info-manager', 'MODULE_OBJ': 'logInfoManager', 'parentId': 8, 'sort': 2, 'MENU_NAME': '日志查看', 'MODULE_URL': 'frame_src/views/logInfoViews/', 'MENU_ICON': 'fa fa-universal-access', 'children': [], 'MENU_PROP': '1', 'roleId': [27, 28] }
      ],
    'MENU_PROP': '1', 'roleId': [27, 28]
  },
  {
    'id': 9, 'MODULE_ROUTE': '/userinfoViews', 'MODULE_OBJ': '', 'parentId': null, 'sort': 6, 'MENU_NAME': '用户信息', 'MODULE_URL': 'frame_src/views/logInfoViews', 'MENU_ICON': 'fa fa-cog', 'children':
      [
        { 'id': 112, 'MODULE_ROUTE': 'user-manager', 'MODULE_OBJ': 'userManager', 'parentId': 9, 'sort': 2, 'MENU_NAME': '角色管理', 'MODULE_URL': 'frame_src/views/userinfoViews/', 'MENU_ICON': 'fa fa-universal-access', 'children': [], 'MENU_PROP': '1', 'roleId': [27, 28] }
      ],
    'MENU_PROP': '1', 'roleId': [27, 28]
  },
  {
    'id': 10, 'MODULE_ROUTE': '/uidpSynchroConfig', 'MODULE_OBJ': '', 'parentId': null, 'sort': 6, 'MENU_NAME': '云配置', 'MODULE_URL': 'frame_src/views/uidpSynchroConfig', 'MENU_ICON': 'fa fa-cog', 'children':
      [
        { 'id': 101, 'MODULE_ROUTE': 'SynchroConfig', 'MODULE_OBJ': 'SynchroConfig', 'parentId': 10, 'sort': 2, 'MENU_NAME': '云配置管理', 'MODULE_URL': 'frame_src/views/uidpSynchroConfig/', 'MENU_ICON': 'fa fa-universal-access', 'children': [], 'MENU_PROP': '1', 'roleId': [27, 28] }
      ],
    'MENU_PROP': '1', 'roleId': [27, 28]
  }
]

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, updateMenu) {
  asyncRouterMap.filter(route => {
    if (route.id === updateMenu.id) {
      route.name = updateMenu.name
      if (updateMenu.icon.indexOf('fa+') >= 0) {
        //('success')
        route.icon = updateMenu.icon.replace('fa+', 'fa ')
      } else {
        route.icon = updateMenu.icon
      }
      return true
    }
    if (route.children && route.children.length) {
      filterAsyncRouter(route.children, updateMenu)
    }
    return false
  })
  return asyncRouterMap
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouterDelete(asyncRouterMap, menuId) {
  for (let i = 0; i < asyncRouterMap.length; i++) {
    var route = asyncRouterMap[i]
    if (route.id === menuId) {
      //console.log('deleteSuccess')
      asyncRouterMap.splice(i, 1)
      return asyncRouterMap
    }
    if (route.children && route.children.length) {
      filterAsyncRouterDelete(route.children, menuId)
    }
  }
  return asyncRouterMap
}

export default {
  // 创建菜单
  createMenu: (config) => {
    const { field, operCode } = param2Obj(config.url)
    if (operCode === 'add') {
      var newMenu = merge({}, JSON.parse(field))
      newMenu.id = 99
      newMenu.path = 'test'
      if (newMenu.icon.indexOf('fa+') >= 0) {
        newMenu.icon = newMenu.icon.replace('fa+', 'fa ')
      }
      newMenu.children = []
      const parentMenu = menuList1.filter((item) => item.id === newMenu.parentId)
      //console.log(parentMenu)
      parentMenu[0].children.push(newMenu)
      localStorage.setItem('PERMISSION', JSON.stringify(menuList1))
      return {
        field: field,
        operCode: operCode,
        message: '增加成功',
        result: true
      }
    }
  },

  // 更新菜单
  updateMenu: (config) => {
    const { field, operCode } = param2Obj(config.url)
    if (operCode === 'update') {
      var currentRoute
      var localRouteString = localStorage.getItem('PERMISSION')
      var localRouteArray = []
      if (localRouteString) {
        localRouteArray = JSON.parse(localRouteString)
        currentRoute = localRouteArray
      } else {
        currentRoute = menuList1
      }
      var updateMenu = merge({}, JSON.parse(field))
      var accessedRouters = filterAsyncRouter(currentRoute, updateMenu)
      localStorage.setItem('PERMISSION', JSON.stringify(accessedRouters))
      return {
        operCode: operCode,
        field: field,
        message: '修改成功',
        result: true
      }
    }
  },

  // 删除菜单
  deleteMenu: (config) => {
    const { keyCode, operCode } = param2Obj(config.url)
    if (operCode === 'delete') {
      var currentRoute
      var localRouteString = localStorage.getItem('PERMISSION')
      var localRouteArray = []
      if (localRouteString) {
        localRouteArray = JSON.parse(localRouteString)
        currentRoute = localRouteArray
      } else {
        currentRoute = menuList1
      }
      //console.log(keyCode)
      //console.log(typeof (keyCode))
      var accessedRouters = filterAsyncRouterDelete(currentRoute, Number(keyCode))
      localStorage.setItem('PERMISSION', JSON.stringify(accessedRouters))
      //console.log(accessedRouters)

      return {
        operCode: operCode,
        keyCode: keyCode,
        message: '删除成功',
        result: true
      }
    }
  },

  // 设置角色权限
  setRoleMenus: (config) => {
    const { roleId, menuIds } = param2Obj(config.url)
    return {
      roleId: roleId,
      menuIds: menuIds,
      message: '配置成功',
      result: true
    }
  },

  // 获取菜单列表
  getMenuList: config => {
    return {
      items: testMenuList
    }
  },

  // 根据角色获取对应角色下的菜单列表
  getRoleMenuList: config => {
    var { roleId } = param2Obj(config.url)
    roleId = Number(roleId)
    const pageList = roleMenuList.filter((item) => item.roleId === roleId)
    return {
      items: pageList
    }
  },

  // 获取对应角色下的权限菜单列表
  getPermission: config => {
    return {
      items: menuList1
    }
  }
}
