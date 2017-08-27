import { routes } from 'src/router'

const permission = {
    state: {
        routers: routes,
        rightbars: [],
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.routers = routers
        },
        SET_RIGHTBARS: (state, rightbars) => {
            state.rightbars = rightbars
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            commit('SET_ROUTERS', data);
        },
        ChangeRightbar({ commit }, data) {
            commit('SET_RIGHTBARS', data);
        }
    }
};

export default permission;
