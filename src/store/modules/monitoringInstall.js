const monitorinstall = {
    state: {
        firstStepAlert: true,//新增弹窗状态
    },
    mutations: {
        //改变新增弹窗状态
        SET_FIRSTSTEP_ALERT: (state, data) => {
            state.firstStepAlert = data
        },
    },
    actions: {
        //改变新增弹窗状态
        SetFirstStepAlert({ commit }, data) {
            commit('SET_FIRSTSTEP_ALERT', data);
        },
    }
};

export default monitorinstall;
