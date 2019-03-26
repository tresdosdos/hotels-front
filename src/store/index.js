import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import snackbar from './modules/snackbar';
import spinner from './modules/spinner';
import hotel from './modules/hotel';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: { snackbar, user, spinner, hotel },
    strict: debug,
});
