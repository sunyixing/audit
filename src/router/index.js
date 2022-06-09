import Vue from 'vue'
import Router from 'vue-router'
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading
/* layout */
import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {path: '/404', component: _import('404'), hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard', component: _import('dashboard/index')
    }]
  }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/',
    name: 'user',
    meta: {title: '用户权限',},
    children: [
      {
        path: 'user', name: '用户列表', 
        component: _import('user/user'), 
        meta: {title: '用户列表', icon: 'user'}, 
        menu: 'user'
      },
      {
        path: 'role',
        name: '权限管理',
        component: _import('user/role'),
        meta: {title: '权限管理', icon: 'password'},
        menu: 'role'
      },
    ]
  },
  {
    path: '/audit',
    component: Layout,
    redirect: '/audit/',
    name: 'audit',
    meta: {title: '审计事项',},
    children: [
      {
        path: 'lawList', name: '法规正文', 
        component: _import('audit/index'), 
        meta: {title: '法规正文',}, 
        menu: 'lawList'
      },
      {
        path: 'addlaw', name: '新增法规', 
        component: _import('audit/add'), 
        meta: {title: '新增法规',}, 
        menu: 'addlaw'
      },
      {
        path: 'auditCheck', name: '审计方法', 
        component: _import('auditCheck/index'), 
        meta: {title: '审计方法',}, 
        menu: 'auditCheck'
      },
      {
        path: 'auditCheckAdd', name: '新增审计方法', 
        component: _import('auditCheck/add'), 
        meta: {title: '新增审计方法',}, 
        menu: 'auditCheckAdd'
      },
      {
        path: 'auditCheckCreated', name: '生成取证单', 
        component: _import('auditCheck/create'), 
        meta: {title: '生成取证单',}, 
        menu: 'auditCheckCreated'
      },
      {
        path: 'auditCheckList', name: '取证单列表', 
        component: _import('auditCheck/list'), 
        meta: {title: '取证单列表',}, 
        menu: 'auditCheckList'
      },
    ]
  },
  {
    path: '/dbset',
    component: Layout,
    redirect: '/dbset/',
    name: 'dbset',
    meta: {title: '数据库配置',},
    children: [
      {
        path: 'dblist', name: '数据库列表', 
        component: _import('dbset/index'), 
        meta: {title: '数据库列表',}, 
        menu: 'dblist'
      },
      {
        path: 'dbadd', name: '新增数据库', 
        component: _import('dbset/add'), 
        meta: {title: '新增数据库',}, 
        menu: 'dbadd'
      },
    ]
  },
  {
    path: '/industry',
    component: Layout,
    redirect: '/industry/',
    name: '',
    meta: {title: '行业配置',},
    children: [
      {
        path: 'industrylist', name: '行业列表', 
        component: _import('industry/index'), 
        meta: {title: '行业列表',}, 
        menu: 'industrylist'
      },
      {
        path: 'industryadd', name: '新增行业', 
        component: _import('industry/add'), 
        meta: {title: '新增行业',}, 
        menu: 'industryadd'
      },
    ]
  },
  {
    path: '/fiveCheck',
    component: Layout,
    redirect: '/fiveCheck/',
    name: '',
    meta: {title: '五审五查'},
    children: [
      {
        path: 'fiveCheck', name: '五审五查', 
        component: _import('fiveCheck/index'), 
        meta: {title: '五审五查'}, 
        menu: 'fiveCheck'
      },
    ]
  },
  {
    path: '/leaveRecTable',
    component: Layout,
    redirect: '/leaveRecTable/',
    name: '',
    meta: {title: '离任经济事项交接表'},
    children: [
      {
        path: 'leaveRecTable', name: '离任经济事项交接表', 
        component: _import('leaveRecTable/index'), 
        meta: {title: '离任经济事项交接表'}, 
        menu: 'leaveRecTable'
      },
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]
