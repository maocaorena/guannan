const user = {
    state: {    
        dialog:{//第一步编辑或新增
            status: false,
            type: 1,//1为新增, 2为编辑
        }
    },
    mutations: {
        //改变新增弹窗状态
        SET_SHOW_ALERT: (aaa, data) => {
            console.log(aaa.dialog);
            aaa.dialog = data
        }
       
    },
    actions: {
        //改变新增弹窗状态
        ChangeDialogState({ commit }, data) {
            console.log(data);
            commit('SET_SHOW_ALERT', data);
        },
        
    }
};

export default user;
