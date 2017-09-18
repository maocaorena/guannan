import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// const Foo = () => import(/* webpackChunkName: "login" */ '../views/login.vue');
const login = r => require.ensure([], () => r(require('../views/login/login.vue')), 'login');//登录页
const layout = r => require.ensure([], () => r(require('../views/layout/layout.vue')), 'layout');//模板页

const monitoringRunList = r => require.ensure([], () => r(require('../views/monitoringRun/monitoringRunList.vue')), 'monitoringRunList');//运行监控列表
const monitoringRunItem = r => require.ensure([], () => r(require('../views/monitoringRun/monitoringRunItem.vue')), 'monitoringRunItem');//运行监控详情
const monitoringRunMap = r => require.ensure([], () => r(require('../views/monitoringRun/monitoringRunMap.vue')), 'monitoringRunMap');//运行监控地图模式
const fanRunwatch = r => require.ensure([], () => r(require('../views/monitoringRun/fanRunwatch.vue')), 'fanRunwatch');//风机运行监测
const smartMeters = r => require.ensure([], () => r(require('../views/monitoringRun/smartMeters.vue')), 'smartMeters');//智能电表
const hzWatch = r => require.ensure([], () => r(require('../views/monitoringRun/hzWatch.vue')), 'hzWatch');//变频器运行监测

const monitoringInstallList = r => require.ensure([], () => r(require('../views/monitoringInstall/monitoringInstallList.vue')), 'monitoringInstallList');//监控接装列表
const monitoringInstallItem = r => require.ensure([], () => r(require('../views/monitoringInstall/monitoringInstallItem.vue')), 'monitoringInstallItem');//监控接装详情

const eleForm = r => require.ensure([], () => r(require('../views/dataForm/eleForm.vue')), 'eleForm');//用电报表
const fanRun = r => require.ensure([], () => r(require('../views/dataForm/fanRun.vue')), 'fanRun');//风机运行报表
const fanIll = r => require.ensure([], () => r(require('../views/dataForm/fanIll.vue')), 'fanIll');//风机故障报表
const hzRun = r => require.ensure([], () => r(require('../views/dataForm/hzRun.vue')), 'hzRun');//变频器运行报表

const clientList = r => require.ensure([], () => r(require('../views/clientManage/clientList.vue')), 'clientManage');//客户列表

const accountList = r => require.ensure([], () => r(require('../views/accountManage/accountList.vue')), 'accountList');//账号列表
const roleList = r => require.ensure([], () => r(require('../views/accountManage/roleList.vue')), 'roleList');//角色列表


export const routes = [
    {
        path: '/login',
        component: login
    },
    // 运行监控
    {
        path: '/monitoringRun',
        component: layout,
        name:'运行监控',
        redirect: '/monitoringRun/list',
        children:[
            {//运行监控列表
                path: '/monitoringRun/list',
                component: monitoringRunList,
            },
            {//运行监控详情
                path: '/monitoringRun/item',
                component: monitoringRunItem,
                redirect: '/monitoringRun/item/fanRunwatch',
                children: [
                    {//风机运行监测
                        path: 'fanRunwatch',
                        component: fanRunwatch,
                        name: '风机运行监测'
                    },
                    {//智能电表
                        path: 'smartMeters',
                        component: smartMeters,
                        name: '智能电表'
                    },
                    {//变频器运行监测
                        path: 'hzWatch',
                        component: hzWatch,
                        name: '变频器运行监测'
                    },
                ]
            },
            {//运行监控地图模式
                path: '/monitoringRun/map',
                component: monitoringRunMap,
            },

        ]
    },
    // 监控接装
    {
        path: '/monitoringInstall',
        component: layout,
        name: '监控接装',
        redirect: '/monitoringInstall/list',
        children:[
            {// 监控接装列表
                path: '/monitoringInstall/list',
                component: monitoringInstallList,
            },
            {// 监控接装详情
                path: '/monitoringInstall/item',
                component:monitoringInstallItem,
            },
        ]
    },
    // 数据报表
    {
        path: '/dataForm',
        component: layout,
        name: '数据报表',
        redirect: '/dataForm/eleForm',
        children:[
            {// 用电报表
                path: '/dataForm/eleForm',
                component: eleForm,
            },
            {// 风机运行报表
                path: '/dataForm/fanRun',
                component:fanRun,
            },
            {// 风机故障报表
                path: '/dataForm/fanIll',
                component: fanIll,
            },
            {// 变频器运行报表
                path: '/dataForm/hzRun',
                component:hzRun,
            },
        ]
    },
    // 客户管理
    {
        path: '/clientManage',
        component: layout,
        name: '客户管理',
        redirect: '/clientManage/clientList',
        children:[
            {// 客户列表
                path: '/clientManage/clientList',
                component: clientList,
            },
        ]
    },
    // 账号管理
    {
        path: '/accountManage',
        component: layout,
        name: '账号管理',
        redirect: '/accountManage/accountList',
        children:[
            {// 账号列表
                path: '/accountManage/accountList',
                component: accountList,
            },
            {// 角色列表
                path: '/accountManage/roleList',
                component: roleList,
            },
        ]
    },
    { path: '*', redirect: '/login' }
];

export default new Router({
    routes: routes
});
