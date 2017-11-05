const weihu = {
    state: {
        addMessage: {//弹窗状态 1为新增, 2为编辑
            type: 1,
            state: 0,
        },
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
