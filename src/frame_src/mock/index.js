import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import logInfoAPI from './logInfo'
import userAPI from './user'
import roleAPI from './role'
import orgAPI from './org'
import configAPI from './config'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import menuAPI from './menu'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 用户管理模块
Mock.mock(/\/user\/fetchUserList/, 'get', userAPI.getFetchUserList)
Mock.mock(/\/user\/updateUserArticle/, 'get', userAPI.getUpdateUserArticle)
Mock.mock(/\/user\/createUserArticle/, 'post', userAPI.createUserArticle)
Mock.mock(/\/user\/updateUserData/, 'post', userAPI.getUpdateUserData)
Mock.mock(/\/user\/updatePasswordData/, 'get', userAPI.getUpdatePasswordData)
// 角色管理模块
Mock.mock(/\/role\/fetchRoleList/, 'get', roleAPI.getFetchRoleList)
Mock.mock(/\/role\/createRoleArticle/, 'post', roleAPI.createRoleArticle)
Mock.mock(/\/role\/updateRoleArticle/, 'get', roleAPI.getUpdateRoleArticle)
Mock.mock(/\/role\/updateRoleData/, 'post', roleAPI.getUpdateRoleData)
Mock.mock(/\/user\/fetchUserRoleList/, 'get', userAPI.getFetchUserRoleList)
Mock.mock(/\/role\/updateUserRoleArticle/, 'get', roleAPI.getUpdateUserRoleArticle)

// 基础信息配置模块

Mock.mock(/\/config\/fetchConfigList/, 'get', configAPI.getFetchConfigList)
Mock.mock(/\/config\/createConfigArticle/, 'post', configAPI.getCreateConfigArticle)
Mock.mock(/\/config\/updateConfigData/, 'post', configAPI.getUpdateConfigData)
Mock.mock(/\/config\/updateConfigArticle/, 'get', configAPI.getUpdateConfigArticle)
// 组织结构配置模块

Mock.mock(/\/org\/fetchOrgList/, 'get', orgAPI.getFetchOrgList)
Mock.mock(/\/org\/createOrgArticle/, 'post', orgAPI.createOrgArticle)
Mock.mock(/\/org\/updateOrgArticle/, 'get', orgAPI.getUpdateOrgArticle)
Mock.mock(/\/org\/updateOrgData/, 'post', orgAPI.getUpdateOrgData)
Mock.mock(/\/user\/fetchUserOrgList/, 'get', userAPI.getFetchUserOrgList)
Mock.mock(/\/org\/updateUserOrgArticle/, 'get', orgAPI.getUpdateUserOrgArticle)
// 日志管理模块

Mock.mock(/\/logInfo\/fetchLogInfoList/, 'get', logInfoAPI.getFetchLogInfoList)
// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// 菜单管理界面
Mock.mock(/\/menu\/fetchMenuList/, 'get', menuAPI.getMenuList)
Mock.mock(/\/menu\/fetchRoleMenuList/, 'get', menuAPI.getRoleMenuList)
Mock.mock(/\/menu\/fetchMenuDetail/, 'get', menuAPI.getMenuDetail)
Mock.mock(/\/menu\/updateMenu/, 'post', menuAPI.updateMenu)
Mock.mock(/\/menu\/createMenu/, 'post', menuAPI.createMenu)
Mock.mock(/\/menu\/deleteMenu/, 'post', menuAPI.deleteMenu)
Mock.mock(/\/menu\/setRoleMenus/, 'post', menuAPI.setRoleMenus)

export default Mock
