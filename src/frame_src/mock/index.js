import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'

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

// 用户管理界面
Mock.mock(/\/article\/fetchUserList/, 'get', articleAPI.getFetchUserList)
Mock.mock(/\/article\/updateUserArticle/, 'get', articleAPI.getUpdateUserArticle)
Mock.mock(/\/article\/createUserArticle/, 'post', articleAPI.createUserArticle)
Mock.mock(/\/article\/updateUserData/, 'post', articleAPI.getUpdateUserData)
// 角色管理界面
Mock.mock(/\/article\/fetchRoleList/, 'get', articleAPI.getFetchRoleList)
Mock.mock(/\/article\/createRoleArticle/, 'post', articleAPI.createRoleArticle)
Mock.mock(/\/article\/updateRoleArticle/, 'get', articleAPI.getUpdateRoleArticle)
Mock.mock(/\/article\/updateRoleData/, 'post', articleAPI.getUpdateRoleData)
Mock.mock(/\/article\/fetchUserRoleList/, 'get', articleAPI.getFetchUserRoleList)
Mock.mock(/\/article\/updateUserRoleArticle/, 'get', articleAPI.getUpdateUserRoleArticle)
Mock.mock(/\/article\/updatePasswordData/, 'get', articleAPI.getUpdatePasswordData)
// 基础信息配置界面

Mock.mock(/\/article\/fetchConfigList/, 'get', articleAPI.getFetchConfigList)
Mock.mock(/\/article\/createConfigArticle/, 'post', articleAPI.getCreateConfigArticle)
Mock.mock(/\/article\/updateConfigData/, 'post', articleAPI.getUpdateConfigData)
Mock.mock(/\/article\/updateConfigArticle/, 'get', articleAPI.getUpdateConfigArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

export default Mock
