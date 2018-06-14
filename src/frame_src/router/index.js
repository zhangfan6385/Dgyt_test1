import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// import { fetchPermission } from '@/frame_src/api/menu'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'fa fa-home', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/userinfoViews',
    component: Layout,
    redirect: 'noredirect',
    name: 'userinfoViews',
    meta: {
      title: 'userinfoViews',
      icon: 'example'
    },
    children: [
      { path: 'user-manager', component: _import('userinfoViews/userManager'), name: 'userManager', meta: { title: 'userManager', icon: 'table' }},
      { path: 'user-password-manager', component: _import('userinfoViews/userPasswordManager'), name: 'userPasswordManager', meta: { title: 'userPasswordManager', icon: 'table' }}
    ]
  },
  {
    path: '/uidpConfigViews',
    component: Layout,
    redirect: 'noredirect',
    name: 'uidpConfigViews',
    meta: {
      title: 'uidpConfigViews',
      icon: 'example'
    },
    children: [
      { path: 'uidp-config-manager', component: _import('uidpConfigViews/uidpConfigManager'), name: 'uidpConfigManager', meta: { title: 'uidpConfigManager', icon: 'table' }}
    ]
  },
  {
    path: '/roleViews',
    component: Layout,
    redirect: 'noredirect',
    name: 'roleViews',
    meta: {
      title: 'roleViews',
      icon: 'example'
    },
    children: [
      { path: 'role-manager', component: _import('roleViews/roleManager'), name: 'roleManager', meta: { title: 'roleManager', icon: 'table' }},
      { path: 'role-user-manager', component: _import('roleViews/roleUserManager'), name: 'roleUserManager', meta: { title: 'roleUserManager', icon: 'table' }}
    ]
  },
  {
    path: '/menu',
    component: Layout,
    redirect: 'noredirect',
    name: 'menu',
    meta: {
      title: 'menu',
      icon: 'table'
    },
    children: [
      { path: 'menu-manager', component: _import('menu/menuManager'), name: 'menuManager', meta: { title: 'menuManager', icon: 'table' }},
      { path: 'menu-permission-manager', component: _import('menu/menuPermissionManager'), name: 'menuPermissionManager', meta: { title: 'menuPermissionManager', icon: 'table' }}
    ]
  },
  {
    path: '/orgViews',
    component: Layout,
    redirect: 'noredirect',
    name: 'orgViews',
    meta: {
      title: 'orgViews',
      icon: 'example'
    },
    children: [
      { path: 'org-manager', component: _import('orgViews/orgManager'), name: 'orgManager', meta: { title: 'orgManager', icon: 'table' }},
      { path: 'org-user-manager', component: _import('orgViews/orgUserManager'), name: 'orgUserManager', meta: { title: 'orgUserManager', icon: 'table' }}
    ]
  },
  {
    path: '/logInfoViews',
    component: Layout,
    redirect: 'noredirect',
    name: 'logInfoViews',
    meta: {
      title: 'logInfoViews',
      icon: 'form'
    },
    children: [{ path: 'log-info-manager', component: _import('logInfoViews/logInfoManager'), name: 'logInfoManager', meta: { title: 'logInfoManager', icon: 'table' }}]
  },
  /* {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    }
  }, */
  { path: '*', redirect: '/404', hidden: true }
]
