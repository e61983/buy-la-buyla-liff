import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

function new_timestamp() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export default new Vuex.Store({
    state: {
        is_loading: true,
        is_loggedin: false,
        liff_context: null,
        user_profile: null,
        gid: "",
        uid: "",
        records: null,
        current_goods: [],
        order_status: "empty",
        messages: [],
    },
    actions: {
        set_is_loading(context, payload) {
            context.commit('SET_IS_LOADING', payload);
        },
        set_is_loggedin(context, payload) {
            context.commit('SET_IS_LOGGEDIN', payload);
        },
        set_gid(context, payload) {
            context.commit('SET_GID', payload);
        },
        set_order_status(context, payload) {
            context.commit('SET_ORDER_STATUS', payload);
        },
        add_good(context, payload) {
            payload.id = new_timestamp()
            context.commit('ADD_GOOD', payload);
        },
        remove_good(context, payload) {
            context.commit('REMOVE_GOOD', payload);
        },
        goods_same_as(context, payload) {
            context.commit('GOODS_SAME_AS', payload);
        },
        remove_all_goods(context) {
            context.commit('REMOVE_ALL_GOODS');
        },
        add_message(context, payload) {
            const timestamp = new_timestamp();
            context.commit('ADD_MESSAGE', {
                message: payload.message,
                status: payload.status,
                timestamp
            });
            const vm = this;
            setTimeout(() => {
                vm.state.messages.forEach((item, i) => {
                    if (item.timestamp === timestamp) {
                        context.commit('REMOVE_MESSAGE', i);
                    }
                });
            }, 5000);
        },
        remove_message(context, payload) {
            context.commit('REMOVE_MESSAGE', payload);
        },
        get_liff_context(context) {
            context.commit('GET_LIFF_CONTEXT', window.liff.getContext());
            if (this.state.liff_context !== null) {
                if (this.state.liff_context.hasOwnProperty('groupId')) {
                    context.commit('SET_GID', this.state.liff_context.groupId);
                }
            }
            // for test and debug
            if (this.state.gid === "") {
                context.commit('SET_GID', "test");
            }

        },
        get_user_profile(context) {
            window.liff.getProfile()
                .then(profile => {
                    context.commit('GET_USER_PROFILE', {
                        display_name: profile.displayName,
                        photo_url: profile.pictureUrl
                    })
                    context.commit('SET_UID', profile.userId)
                })
                .catch((err) => {
                    console.log('error', err);
                });
        },
        get_records(context) {
            let vm = this
            const base_url = process.env.VUE_APP_API_SERVER_BASE;
            const url = new URL(String(vm.state.gid) + "/orders", base_url).toString()
            context.commit('SET_IS_LOADING', true);
            console.log(url)
            axios.get(url).then(resp => {
                let userid = vm.state.uid
                context.commit('GET_RECORDS', resp.data);
                if (resp.data.hasOwnProperty(vm.state.uid)) {
                    context.commit('SET_ORDER_STATUS', 'exist');
                    context.commit('SET_GOODS', resp.data[userid].goods);
                } else {
                    context.commit('SET_ORDER_STATUS', 'empty');
                }
                context.commit('SET_IS_LOADING', false);
            }).catch((err) => {
                console.log(err)
                context.commit('SET_IS_LOADING', false);
            })
        },
    },
    mutations: {
        SET_IS_LOADING(state, payload) {
            state.is_loading = payload
        },
        SET_IS_LOGGEDIN(state, payload) {
            state.is_loggedin = payload
        },
        SET_UID(state, payload) {
            state.uid = payload
        },
        SET_GID(state, payload) {
            state.gid = payload
        },
        SET_ORDER_STATUS(state, payload) {
            state.order_status = payload
        },
        ADD_GOOD(state, payload) {
            state.current_goods.push(payload);
        },
        REMOVE_GOOD(state, payload) {
            state.current_goods.forEach((item, i) => {
                if (item.id === payload) {
                    state.current_goods.splice(i, 1);
                }
            });
        },
        SET_GOODS(state, payload) {
            state.current_goods = JSON.parse(JSON.stringify(payload));
        },
        GOODS_SAME_AS(state, payload) {
            state.current_goods.splice(0, state.current_goods.length);

            payload.forEach((good) => {
                let clone_good = JSON.parse(JSON.stringify(good));
                clone_good.id = new_timestamp()
                state.current_goods.push(clone_good);
            });
        },
        REMOVE_ALL_GOODS(state) {
            state.current_goods.splice(0, state.current_goods.length);
        },
        ADD_MESSAGE(state, payload) {
            state.messages.push({
                message: payload.message,
                status: payload.status,
                timestamp: payload.timestamp
            });
        },
        REMOVE_MESSAGE(state, payload) {
            state.messages.splice(payload, 1);
        },
        GET_LIFF_CONTEXT(state, payload) {
            state.liff_context = payload
        },
        GET_USER_PROFILE(state, payload) {
            state.user_profile = payload
        },
        GET_RECORDS(state, payload) {
            state.records = payload
        },
    }
});