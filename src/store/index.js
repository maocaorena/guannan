import Vue from 'vue';
import Vuex from 'vuex';
import permission from './modules/permission';
import monitorinstall from './modules/monitoringInstall';
import user from './modules/user';
import accout from './modules/accout';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        permission,
        monitorinstall,
        user,
        accout
    },
    getters
});

export default store
