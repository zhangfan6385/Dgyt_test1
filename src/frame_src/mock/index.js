import Mock from 'mockjs'
import loginAPI from './login'
// import logInfoAPI from './logInfo'
// import userAPI from './user'
// import roleAPI from './role'
// import orgAPI from './org'
// import configAPI from './config'
// import sysinfoAPI from './sysinfo'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
// import menuAPI from './menu'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
// Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
// Mock.mock(/\/user\/info\.*/, 'post', loginAPI.getUserInfo)

// 用户管理模块
// Mock.mock(/\/user\/fetchUserList/, 'get', userAPI.getFetchUserList)
// Mock.mock(/\/user\/updateUserArticle/, 'post', userAPI.getUpdateUserArticle)
// Mock.mock(/\/user\/updateUserFlag/, 'post', userAPI.getUpdateUserFlag)
// Mock.mock(/\/user\/createUserArticle/, 'post', userAPI.createUserArticle)
// Mock.mock(/\/user\/updateUserData/, 'post', userAPI.getUpdateUserData)
// Mock.mock(/\/user\/updatePasswordData/, 'post', userAPI.getUpdatePasswordData)
// 角色管理模块
// Mock.mock(/\/role\/fetchRoleList/, 'get', roleAPI.getFetchRoleList)
// Mock.mock(/\/role\/createRoleArticle/, 'post', roleAPI.createRoleArticle)
// Mock.mock(/\/role\/updateRoleArticle/, 'post', roleAPI.getUpdateRoleArticle)
// Mock.mock(/\/role\/updateRoleData/, 'post', roleAPI.getUpdateRoleData)
// Mock.mock(/\/user\/fetchUserRoleList/, 'get', userAPI.getFetchUserRoleList)
// Mock.mock(/\/role\/updateUserRoleArticle/, 'post', roleAPI.getUpdateUserRoleArticle)
// Mock.mock(/\/role\/deleteUserRoleArticle/, 'post', roleAPI.getDeleteUserRoleArticle)

// 基础信息配置模块

// Mock.mock(/\/conf\/fetchConfigList/, 'get', configAPI.getFetchConfigList)
// Mock.mock(/\/conf\/createConfigArticle/, 'post', configAPI.getCreateConfigArticle)
// Mock.mock(/\/conf\/updateConfigData/, 'post', configAPI.getUpdateConfigData)
// Mock.mock(/\/conf\/updateConfigArticle/, 'post', configAPI.getUpdateConfigArticle)
// 平台在建系统配置模块

// Mock.mock(/\/sysinfo\/fetchSysInfoList/, 'get', sysinfoAPI.getFetchSysInfoList)
// Mock.mock(/\/sysinfo\/createSysInfoArticle/, 'post', sysinfoAPI.getCreateSysInfoArticle)
// Mock.mock(/\/sysinfo\/updateSysInfoData/, 'post', sysinfoAPI.getUpdateSysInfoData)
// Mock.mock(/\/sysinfo\/updateSysInfoArticle/, 'post', sysinfoAPI.getUpdateSysInfoArticle)
// 组织结构配置模块

// Mock.mock(/\/org\/fetchOrgList/, 'get', orgAPI.getFetchOrgList)
// Mock.mock(/\/org\/createOrgArticle/, 'post', orgAPI.createOrgArticle)
// Mock.mock(/\/org\/updateOrgArticle/, 'post', orgAPI.getUpdateOrgArticle)
// Mock.mock(/\/org\/updateOrgData/, 'post', orgAPI.getUpdateOrgData)
// Mock.mock(/\/user\/fetchUserOrgList/, 'get', userAPI.getFetchUserOrgList)
// Mock.mock(/\/org\/updateUserOrgArticle/, 'post', orgAPI.getUpdateUserOrgArticle)
// Mock.mock(/\/org\/deleteUserOrgArticle/, 'post', orgAPI.getDeleteUserOrgArticle)
// 日志管理模块

// Mock.mock(/\/logInfo\/fetchLogInfoList/, 'get', logInfoAPI.getFetchLogInfoList)
// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// 菜单管理界面
// Mock.mock(/\/menu\/fetchMenuList/, 'get', menuAPI.getMenuList)
// Mock.mock(/\/menu\/fetchMenuDetail/, 'get', menuAPI.getMenuDetail)
// Mock.mock(/\/menu\/updateMenu/, 'post', menuAPI.updateMenu)
// Mock.mock(/\/menu\/createMenu/, 'post', menuAPI.createMenu)
// Mock.mock(/\/menu\/deleteMenu/, 'post', menuAPI.deleteMenu)

// Mock.mock(/\/menu\/fetchRoleMenuList/, 'get', menuAPI.getRoleMenuList)
// Mock.mock(/\/menu\/setRoleMenus/, 'post', menuAPI.setRoleMenus)
// Mock.mock(/\/menu\/fetchPermission/, 'get', menuAPI.getPermission)
export default Mock
