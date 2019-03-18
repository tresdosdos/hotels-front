import { SNACKBAR_TIMEOUT } from './snackbar-options';

export default {
    show({ commit }, { message, color }) {
        commit('setMessage', message);
        commit('setColor', color);
        commit('setBarStatus', true);
        setTimeout(() => {
            commit('flushSnackBar');
        }, SNACKBAR_TIMEOUT);
    },
    close({ commit }) {
        commit('flushSnackBar');
    },
};
