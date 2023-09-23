import {
    createStore
} from "vuex";

export default createStore({
    state: {
        token: '',
        tiku: '',
        regionId: ''
    },
    mutations: {
        // 定义mutations，用于修改状态(同步)
        updateToken(state, payload) {
            state.token = "Bearer " + payload
        },
        updateTiKu(state, payload) {
            state.tiku = payload
        },
        updateRegionId(state, payload) {
            state.regionId = payload
        }
    },
    actions: {},
    getters: {
        // 定义一个getters
        getToken(state) {
            return state.token
        },
        getTiKu(state) {
            return state.tiku
        },
        getRegionId(state) {
            return state.regionId
        }
    },
    modules: {}
});

