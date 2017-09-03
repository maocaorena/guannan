const monitorinstall = {
    state: {
        firstStepAlert: 0,//新增弹窗状态
        firstAdd:{//第一步编辑或新增
            state: false,
            type: 1,//1为新增, 2为编辑
        },
        firstAddMessage:{},//第一步编辑或新增的信息
        secondAdd:{//第二步编辑或新增
            state: false,
            type: 1,//1为新增, 2为编辑
        },
        secondAddMessage:{},//第二步编辑或新增的信息
        thirdAdd:{//第三步编辑或新增
            state: false,
            type: 1,//1为新增, 2为编辑
        },
        thirdAddMessage:{},//第三步编辑或新增的信息
    },
    mutations: {
        //改变新增弹窗状态
        SET_FIRSTSTEP_ALERT: (state, data) => {
            state.firstStepAlert = data
        },
        //第一步编辑或新增
        SET_FIRSTADD_ALERT: (state, data) => {
            state.firstAdd = data
        },
        //第一步编辑或新增的信息
        SET_FIRSTADDMESSAGE: (state, data) => {
            state.firstAddMessage = data
        },
        //第二步编辑或新增
        SET_SECONDADD_ALERT: (state, data) => {
            state.secondAdd = data
        },
        //第二步编辑或新增的信息
        SET_SECONDADDMESSAGE: (state, data) => {
            state.secondAddMessage = data
        },
        //第三步编辑或新增
        SET_THIRD_ALERT: (state, data) => {
            state.thirdAdd = data
        },
        //第三步编辑或新增的信息
        SET_THIRDMESSAGE: (state, data) => {
            state.thirdAddMessage = data
        },
    },
    actions: {
        //改变新增弹窗状态
        SetFirstStepAlert({ commit }, data) {
            commit('SET_FIRSTSTEP_ALERT', data);
        },
        //第一步编辑或新增
        SetFirstAddAlert({ commit }, data) {
            commit('SET_FIRSTADD_ALERT', data);
        },
        //第一步编辑或新增的信息
        SetFirstAddMessage({ commit }, data) {
            commit('SET_FIRSTADDMESSAGE', data);
        },
        //第二步编辑或新增
        SetSecondAddAlert({ commit }, data) {
            commit('SET_SECONDADD_ALERT', data);
        },
        //第二步编辑或新增的信息
        SetSecondAddMessage({ commit }, data) {
            commit('SET_SECONDADDMESSAGE', data);
        },
        //第三步编辑或新增
        SetThirdAddAlert({ commit }, data) {
            commit('SET_THIRD_ALERT', data);
        },
        //第三步编辑或新增的信息
        SetThirdAddMessage({ commit }, data) {
            commit('SET_THIRDMESSAGE', data);
        },
    }
};

export default monitorinstall;
