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
    'id': 1, 'path': '/userinfoViews', 'parentId': null, 'sort': 0, 'name': '用户管理', 'href': 'userinfoViews', 'icon': 'fa fa-dashboard', 'children': [
      {
        'id': 92, 'path': 'user-manager', 'parentId': 31, 'sort': 0, 'name': '注册用户', 'href': 'userinfoViews/userManager', 'icon': 'fa fa-bank', 'children': [], 'isShow': '1', 'roleId': [26, 27]
      },
      { 'id': 93, 'path': 'user-password-manager', 'parentId': 31, 'sort': 0, 'name': '修改密码', 'href': 'userinfoViews/userPasswordManager', 'icon': 'fa fa-area-chart', 'children': [], 'isShow': '1', 'roleId': [26, 27] }
    ],
    'isShow': '1', 'roleId': [26, 27]
  },
  {
    'id': 31, 'path': '/uidpConfigViews', 'parentId': null, 'sort': 1, 'name': '基础信息管理', 'href': 'uidpConfigViews', 'icon': 'fa fa-upload', 'children':
      [
        { 'id': 93, 'path': 'uidp-config-manager', 'parentId': 31, 'sort': 0, 'name': '平台信息管理', 'href': 'uidpConfigViews/uidpConfigManager', 'icon': 'fa fa-area-chart', 'children': [], 'isShow': '1', 'roleId': [26, 27] },
        { 'id': 93, 'path': 'uidp-sys-info-manager', 'parentId': 31, 'sort': 0, 'name': '在建系统信息管理', 'href': 'uidpConfigViews/uidpSysInfoManager', 'icon': 'fa fa-area-chart', 'children': [], 'isShow': '1', 'roleId': [26, 27] }
      ],
    'isShow': '1', 'roleId': [26, 27]
  },
  {
    'id': 102, 'path': '/roleViews', 'parentId': null, 'sort': 3, 'name': '角色管理', 'href': 'roleViews', 'icon': 'fa fa-download', 'children':
      [
        { 'id': 103, 'path': 'role-manager', 'parentId': 102, 'sort': 0, 'name': '注册角色', 'href': 'roleViews/roleManager', 'icon': 'fa fa-image', 'children': [], 'isShow': '1', 'roleId': [27] },
        { 'id': 104, 'path': 'role-user-manager', 'parentId': 102, 'sort': 0, 'name': '角色挂载', 'href': 'roleViews/roleUserManager', 'icon': 'fa fa-image', 'children': [], 'isShow': '1', 'roleId': [27] }
      ],
    'isShow': '1', 'roleId': [27]
  },
  {
    'id': 6, 'path': '/menu', 'parentId': null, 'sort': 6, 'name': '菜单权限', 'href': 'menu', 'icon': 'fa fa-cog', 'children':
      [
        { 'id': 108, 'path': 'menu-manager', 'parentId': 6, 'sort': 0, 'name': ' 菜单管理', 'href': 'menu/menuManager', 'icon': 'fa fa-database', 'children': [], 'isShow': '1', 'roleId': [27, 28] },
        { 'id': 109, 'path': 'menu-permission-manager', 'parentId': 6, 'sort': 1, 'name': '权限分配', 'href': 'menu/menuPermissionManager', 'icon': 'fa fa-navicon', 'children': [], 'isShow': '1', 'roleId': [27, 28] }
      ],
    'isShow': '1', 'roleId': [27, 28]
  },
  {
    'id': 7, 'path': '/orgViews', 'parentId': null, 'sort': 6, 'name': '组织结构', 'href': 'orgViews', 'icon': 'fa fa-cog', 'children':
      [
        { 'id': 110, 'path': 'org-manager', 'parentId': 7, 'sort': 2, 'name': '组织机构配置', 'href': 'orgViews/orgManager', 'icon': 'fa fa-universal-access', 'children': [], 'isShow': '1', 'roleId': [27, 28] },
        { 'id': 111, 'path': 'org-user-manager', 'parentId': 7, 'sort': 3, 'name': '组织机构挂载', 'href': 'orgViews/orgUserManager', 'icon': 'fa fa-user-plus', 'children': [], 'isShow': '1', 'roleId': [27, 28] }
      ],
    'isShow': '1', 'roleId': [27, 28]
  },
  {
    'id': 8, 'path': '/logInfoViews', 'parentId': null, 'sort': 6, 'name': '日志管理', 'href': 'logInfoViews', 'icon': 'fa fa-cog', 'children':
      [
        { 'id': 112, 'path': 'log-info-manager', 'parentId': 8, 'sort': 2, 'name': '日志查看', 'href': 'logInfoViews/logInfoManager', 'icon': 'fa fa-universal-access', 'children': [], 'isShow': '1', 'roleId': [27, 28] }
      ],
    'isShow': '1', 'roleId': [27, 28]
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
        console.log('success')
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
      console.log('deleteSuccess')
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
      console.log(parentMenu)
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
      console.log(keyCode)
      console.log(typeof (keyCode))
      var accessedRouters = filterAsyncRouterDelete(currentRoute, Number(keyCode))
      localStorage.setItem('PERMISSION', JSON.stringify(accessedRouters))
      console.log(accessedRouters)

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
