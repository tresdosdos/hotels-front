import { spinnerActions, spinnerMutations } from './constants';

export default {
    [spinnerActions.START]({ commit }) {
        commit(spinnerMutations.SET_ACTIVITY, true);
    },
    [spinnerActions.STOP]({ commit }) {
        commit(spinnerMutations.SET_ACTIVITY, false);
    },
};
