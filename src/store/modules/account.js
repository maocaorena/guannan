const user = {
    state: {    
        dialog:{//第一步编辑或新增
            status: false,
            type: 1,//1为新增, 2为编辑
        },
        dialogRole: {
            status: false,
            type: 1
        }
    },
    mutations: {
        //改变新增弹窗状态
        SET_SHOW_ALERT: (state, data) => {
            state.dialog = data
        },
        SET_DIALOGROLE_ALERT: (state, data) => {
            state.dialogRole = data
        }
       
    },
    actions: {
        //改变新增弹窗状态
        ChangeAccountDialogState({ commit }, data) {
            commit('SET_SHOW_ALERT', data);
        },
        ChangeRoleDialogState({ commit }, data) {
            commit('SET_DIALOGROLE_ALERT', data);
        },
    }
};

export default user;
