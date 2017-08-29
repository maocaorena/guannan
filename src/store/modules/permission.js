import { routes } from 'src/router'

const permission = {
    state: {
        routers: routes,//将路由表放入进去，进行渲染顶部栏
        rightbars: [],//右边耳机顶部栏
        leftbarselected: {//左侧侧边栏选中的在leftbars里面的两个下标
            first: 0,
            second: 0,
        },
        leftbarsType: 1,//左侧侧边栏类型1 为二级侧边栏，2为只有1级 ，3为三级显示顶部select
        leftbars: [//要渲染的左侧侧边栏
            {
                tit : '浙江省',
                list : [
                    {
                        name : '杭州东南有限公司',
                    },
                    {
                        name : '杭州西北有限公司',
                    },
                    {
                        name : '金华西南有限公司',
                    },
                ]
            },
            {
                tit : '河南省',
                list : [
                    {
                        name : '河南东南有限公司',
                    },
                    {
                        name : '郑州西北有限公司',
                    },
                    {
                        name : '洛阳西南有限公司',
                    },
                ]
            }
        ],
    },
    mutations: {
        //把要渲染的顶部栏列表放进去
        SET_ROUTERS: (state, routers) => {
            state.routers = routers
        },
        //点击顶部侧边栏，将对应的下面的子集放入rightbars
        SET_RIGHTBARS: (state, rightbars) => {
            state.rightbars = rightbars
        },
        //把要渲染的左侧侧边栏添加进去
        SET_LEFTBARS: (state, leftbars) => {
            state.leftbars = leftbars
        },
        //把要渲染的左侧侧边栏添加进去
        SET_LEFTBARSTYPE: (state, leftbarsType) => {
            state.leftbarsType = leftbarsType
        },
        //将选中的侧边栏在leftbars数组中的两个下标传进去
        SET_LEFTBARSELECTED: (state, leftbarselected) => {
            state.leftbarselected = leftbarselected
        },
    },
    actions: {
        //把要渲染的顶部栏列表放进去
        GenerateRoutes({ commit }, data) {
            commit('SET_ROUTERS', data);
        },
        //点击顶部侧边栏，将对应的下面的子集放入rightbars
        ChangeRightbar({ commit }, data) {
            commit('SET_RIGHTBARS', data);
        },
        //把要渲染的左侧侧边栏添加进去
        ChangeLeftbar({ commit }, data) {
            commit('SET_LEFTBARS', data);
        },
        //把要渲染的左侧侧边栏类型
        ChangeLeftbarType({ commit }, data) {
            commit('SET_LEFTBARSTYPE', data);
        },
        //将选中的侧边栏在leftbars数组中的两个下标传进去
        ChangeLeftbarSelected({ commit }, data) {
            commit('SET_LEFTBARSELECTED', data);
        }
    }
};

export default permission;
