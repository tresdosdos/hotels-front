export default {
    start({ commit }) {
        commit('setActivity', true);
    },
    stop({ commit }) {
        commit('setActivity', false);
    },
};
