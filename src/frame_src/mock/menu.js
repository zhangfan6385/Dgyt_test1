import { param2Obj } from '@/frame_src/utils'
const menuList = [
  {
    'id': 1, 'parentId': null, 'sort': 0, 'name': '仪表盘', 'href': '/index', 'icon': 'fa fa-dashboard', 'children': [],
    'isShow': '1'
  },
  {
    'id': 31, 'parentId': null, 'sort': 1, 'name': '测试1', 'href': '/test/1', 'icon': 'fa fa-upload', 'children':
      [
        {
          'id': 92, 'parentId': 31, 'sort': 0, 'name': '测试1-1', 'href': '/test/1/1', 'icon': 'fa fa-bank', 'children': [
            { 'id': 912, 'parentId': 92, 'sort': 0, 'name': '测试1-1-1', 'href': '/test/1/1/1', 'icon': 'fa fa-bank', 'children': [], 'isShow': '1' },
            { 'id': 913, 'parentId': 92, 'sort': 0, 'name': '测试1-1-2', 'href': '/test/1/1/2', 'icon': 'fa fa-area-chart', 'children': [], 'isShow': '1' }
          ], 'isShow': '1'
        },
        { 'id': 93, 'parentId': 31, 'sort': 0, 'name': '测试1-2', 'href': '/test/1/2', 'icon': 'fa fa-area-chart', 'children': [], 'isShow': '1' }
      ],
    'isShow': '1'
  },
  {
    'id': 102, 'parentId': null, 'sort': 3, 'name': '测试2', 'href': '/test/2', 'icon': 'fa fa-download', 'children':
      [
        { 'id': 103, 'parentId': 102, 'sort': 0, 'name': '测试2-1', 'href': '/test/2/1', 'icon': 'fa fa-image', 'children': [], 'isShow': '1' }
      ],
    'isShow': '1'
  },
  {
    'id': 6, 'parentId': null, 'sort': 6, 'name': '系统管理', 'href': '/sys', 'icon': 'fa fa-cog', 'children':
      [
        { 'id': 108, 'parentId': 6, 'sort': 0, 'name': ' 资源管理', 'href': '/sys/resource', 'icon': 'fa fa-database', 'children': [], 'isShow': '1' },
        { 'id': 7, 'parentId': 6, 'sort': 1, 'name': '菜单管理', 'href': '/sys/menuList', 'icon': 'fa fa-navicon', 'children': [], 'isShow': '1' },
        { 'id': 8, 'parentId': 6, 'sort': 2, 'name': '角色管理', 'href': '/sys/roleList', 'icon': 'fa fa-universal-access', 'children': [], 'isShow': '1' },
        { 'id': 9, 'parentId': 6, 'sort': 3, 'name': '用户管理', 'href': '/sys/userList', 'icon': 'fa fa-user-plus', 'children': [], 'isShow': '1' }
      ],
    'isShow': '1'
  }]

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

export default {
  getPv: () => ({
    pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),
  getMenuDetail: () => ({
    id: 120000000001,
    author: { key: 'mockPan' },
    source_name: '原创作者',
    category_item: [{ key: 'global', name: '全球' }],
    comment_disabled: true,
    content: '<p>我是测试数据我是测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>"',
    content_short: '我是测试数据',
    display_time: +new Date(),
    image_uri: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
    platforms: ['a-platform'],
    source_uri: 'https://github.com/zhangfan6385/Dgyt_test1',
    status: 'published',
    tags: [],
    title: 'vue-element-admin'
  }),

  // 创建菜单
  createMenu: (config) => {
    const { field, operCode } = param2Obj(config.url)
    if (operCode === 'add') {
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
    const { field, operCode } = param2Obj(config.url)
    if (operCode === 'delete') {
      return {
        operCode: operCode,
        field: field,
        message: '修改成功',
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
      items: menuList
    }
  },

  // 根据角色获取对应角色下的菜单列表
  getRoleMenuList: config => {
    const { roleId } = param2Obj(config.url)
    console.log(roleId)
    const pageList = roleMenuList.filter((item) => item.roleId === roleId)
    return {
      items: pageList
    }
  }
}
