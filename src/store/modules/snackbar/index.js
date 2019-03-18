import actions from './actions';
import mutations from './mutations';
import { SNACKBAR_COLORS } from './snackbar-options';

const state = {
    isActive: false,
    color: SNACKBAR_COLORS.info,
    message: '',
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
