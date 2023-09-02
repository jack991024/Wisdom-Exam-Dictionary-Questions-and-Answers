import {
    createStore
} from "vuex";

export default createStore({
    state: {
        token: ''
    },
    mutations: {
        // 定义mutations，用于修改状态(同步)
        updateToken(state, payload) {
            state.token = "Bearer "+payload
        }
    },
    actions: {

    },
    getters: {
        // 定义一个getters
        getToken(state) {
            return state.token
        }
    },
    modules: {}
});

