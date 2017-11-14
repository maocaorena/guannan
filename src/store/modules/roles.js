const user = {
    state: {    
        dialog:{//第一步编辑或新增
            status: false,
            type: 1,//1为新增, 2为编辑
        },
        dialogRight: {
            status: false,
            type: 1
        }
    },
    mutations: {
        //改变新增弹窗状态
        SET_SHOW_ALERT: (state, data) => {
            state.dialog = data
        },
        SET_RIGHTDIALOG_ALERT: (state, data) => {
            state.dialogRight = data;
        }
        
    },
    actions: {
        //改变新增弹窗状态
        ChangeRoleListDialogState({ commit }, data) {
            commit('SET_SHOW_ALERT', data);
        },
        ChangeRightDialogState({ commit }, data) {
            commit('SET_RIGHTDIALOG_ALERT', data);
        }
    }
};

export default user;
