import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

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
        set_current_goods(context, payload) {
            context.commit('SET_CURRENT_GOODS', payload);
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
            const url = base_url + "/" + vm.state.gid + "/orders";
            context.commit('SET_IS_LOADING', true);
            axios.get(url).then(resp => {
                context.commit('GET_RECORDS', resp.data);
                context.commit('SET_IS_LOADING', false);
            }).catch(() => {
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
        SET_CURRENT_GOODS(state, payload) {
            state.current_goods = payload
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