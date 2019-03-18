import actions from './actions';
import mutations from './mutations';

const state = {
    isActive: false,
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
