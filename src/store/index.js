import Vue from 'vue';
import Vuex from 'vuex';
import permission from './modules/permission';
import monitorinstall from './modules/monitoringInstall';
import user from './modules/user';
import account from './modules/account';
import roles from './modules/roles';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        permission,
        monitorinstall,
        user,
        account,
        roles
    },
    getters
});

export default store
