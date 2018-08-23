
import Mock from 'mockjs'
// import loginAPI from './login'
// import logInfoAPI from './logInfo'
// import userAPI from './user'
// import userloginAPI from './userlogin'
// import roleAPI from './role'
// import orgAPI from './org'
// import configAPI from './config'
// import sysinfoAPI from './sysinfo'
// import remoteSearchAPI from './remoteSearch'
// import transactionAPI from './transaction'
// import menuAPI from './menu'
// import titleApi from './title'
// import configResultAPI from './configResult'
// import syncnhroConfigAPI from './synchroConfig'
// //import demoAPI from './demo'
// // // Demo模块

// // Mock.mock(/\/conf\/fetchDemoList/, 'get', demoAPI.getFetchDemoList)
// // Mock.mock(/\/conf\/createDemoArticle/, 'post', demoAPI.getCreateDemoArticle)
// // Mock.mock(/\/conf\/updateDemoData/, 'post', demoAPI.getUpdateDemoData)
// // Mock.mock(/\/conf\/updateDemoArticle/, 'post', demoAPI.getUpdateDemoArticle)
//  Mock.setup({
//    timeout: '350-600'
//  })

// //登录页面获取相关配置信息
// Mock.mock(/\/Conf\/loginConfig/, 'get', titleApi.GetTitle)


// //云配置相关
// Mock.mock(/\/SyncConf\/fetchSyncConfList/, 'get', syncnhroConfigAPI.fetchSynchroConfigList)
// Mock.mock(/\/SyncConf\/createSyncConf/, 'post', syncnhroConfigAPI.createSynchroConfigArticle)
// Mock.mock(/\/SyncConf\/updateSyncConf/, 'post', syncnhroConfigAPI.updateSynchroConfigData)
// Mock.mock(/\/SyncConf\/deleteSyncConf/, 'post', syncnhroConfigAPI.DeleteSynchroConfigArticle)
// Mock.mock(/\/Org\/pushOrgList/, 'post', syncnhroConfigAPI.pushOrgList)
// Mock.mock(/\/SyncResult\/fetchSyncResultList/, 'get', configResultAPI.GetConfigResult)


// //登录相关
// Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
// Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
// Mock.mock(/\/user\/info\.*/, 'post', loginAPI.getUserInfo)

// //文章相关
// // Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
// // Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
// // Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
// // Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
// // Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// //用户管理模块
// Mock.mock(/\/user\/fetchUserList/, 'get', userAPI.getFetchUserList)
// Mock.mock(/\/user\/updateUserArticle/, 'post', userAPI.getUpdateUserArticle)
// Mock.mock(/\/user\/updateUserFlag/, 'post', userAPI.getUpdateUserFlag)
// Mock.mock(/\/user\/createUserArticle/, 'post', userAPI.createUserArticle)
// Mock.mock(/\/user\/updateUserData/, 'post', userAPI.getUpdateUserData)
// Mock.mock(/\/user\/updatePasswordData/, 'post', userAPI.getUpdatePasswordData)
// // 用户管理模块--登陆账号管理
// Mock.mock(/\/userlogin\/fetchUserLoginList/, 'get', userloginAPI.getFetchUserLoginList)
// Mock.mock(/\/userlogin\/updateUserLoginArticle/, 'post', userloginAPI.getUpdateUserLoginArticle)
// Mock.mock(/\/userlogin\/createUserLoginArticle/, 'post', userloginAPI.createUserLoginArticle)
// Mock.mock(/\/userlogin\/updateUserLoginData/, 'post', userloginAPI.getUpdateUserLoginData)
// Mock.mock(/\/userlogin\/updatePasswordLoginData/, 'post', userloginAPI.getUpdatePasswordLoginData)

// Mock.mock(/\/user\/fetchUserForLoginList/, 'get', userAPI.getFetchUserForLoginList)
// Mock.mock(/\/userlogin\/updateUserForLoginArticle/, 'post', userloginAPI.getUpdateUserForLoginArticle)
// Mock.mock(/\/userlogin\/deleteUserForLoginArticle/, 'post', userloginAPI.getDeleteUserForLoginArticle)
// //角色管理模块
// Mock.mock(/\/role\/fetchRoleList/, 'get', roleAPI.getFetchRoleList)
// Mock.mock(/\/role\/createRoleArticle/, 'post', roleAPI.createRoleArticle)
// Mock.mock(/\/role\/updateRoleArticle/, 'post', roleAPI.getUpdateRoleArticle)
// Mock.mock(/\/role\/updateRoleData/, 'post', roleAPI.getUpdateRoleData)
// Mock.mock(/\/user\/fetchUserRoleList/, 'get', userAPI.getFetchUserRoleList)
// Mock.mock(/\/role\/updateUserRoleArticle/, 'post', roleAPI.getUpdateUserRoleArticle)
// Mock.mock(/\/role\/deleteUserRoleArticle/, 'post', roleAPI.getDeleteUserRoleArticle)

// // 基础信息配置模块

// Mock.mock(/\/conf\/fetchConfigList/, 'get', configAPI.getFetchConfigList)
// Mock.mock(/\/conf\/createConfigArticle/, 'post', configAPI.getCreateConfigArticle)
// Mock.mock(/\/conf\/updateConfigData/, 'post', configAPI.getUpdateConfigData)
// Mock.mock(/\/conf\/updateConfigArticle/, 'post', configAPI.getUpdateConfigArticle)
// // 平台在建系统配置模块

// Mock.mock(/\/sysinfo\/fetchSysInfoList/, 'get', sysinfoAPI.getFetchSysInfoList)
// Mock.mock(/\/sysinfo\/createSysInfoArticle/, 'post', sysinfoAPI.getCreateSysInfoArticle)
// Mock.mock(/\/sysinfo\/updateSysInfoData/, 'post', sysinfoAPI.getUpdateSysInfoData)
// Mock.mock(/\/sysinfo\/updateSysInfoArticle/, 'post', sysinfoAPI.getUpdateSysInfoArticle)
// // 组织结构配置模块

// Mock.mock(/\/org\/fetchOrgList/, 'get', orgAPI.getFetchOrgList)
// Mock.mock(/\/org\/createOrgArticle/, 'post', orgAPI.createOrgArticle)
// Mock.mock(/\/org\/updateOrgArticle/, 'post', orgAPI.getUpdateOrgArticle)
// Mock.mock(/\/org\/updateOrgData/, 'post', orgAPI.getUpdateOrgData)
// Mock.mock(/\/user\/fetchUserOrgList/, 'get', userAPI.getFetchUserOrgList)
// Mock.mock(/\/org\/updateUserOrgArticle/, 'post', orgAPI.getUpdateUserOrgArticle)
// Mock.mock(/\/org\/deleteUserOrgArticle/, 'post', orgAPI.getDeleteUserOrgArticle)
// //日志管理模块

// Mock.mock(/\/logInfo\/fetchLogInfoList/, 'get', logInfoAPI.getFetchLogInfoList)
// //搜索相关
// Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// //账单相关
// Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// // 菜单管理界面
// Mock.mock(/\/menu\/fetchMenuList/, 'get', menuAPI.getMenuList)
// Mock.mock(/\/menu\/fetchMenuDetail/, 'get', menuAPI.getMenuDetail)
// Mock.mock(/\/menu\/updateMenu/, 'post', menuAPI.updateMenu)
// Mock.mock(/\/menu\/createMenu/, 'post', menuAPI.createMenu)
// Mock.mock(/\/menu\/deleteMenu/, 'post', menuAPI.deleteMenu)

// Mock.mock(/\/menu\/fetchRoleMenuList/, 'get', menuAPI.getRoleMenuList)
// Mock.mock(/\/menu\/setRoleMenus/, 'post', menuAPI.setRoleMenus)

// Mock.mock(/\/menu\/fetchPermission/, 'get', menuAPI.getPermission)
export default Mock

