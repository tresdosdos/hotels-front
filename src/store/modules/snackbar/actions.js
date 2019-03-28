import { SNACKBAR_TIMEOUT } from './snackbar-options';
import { snackbarActions, snackbarMutations } from './constants';

export default {
    [snackbarActions.SHOW]({ commit }, { message, color }) {
        commit(snackbarMutations.SET_MESSAGE, message);
        commit(snackbarMutations.SET_COLOR, color);
        commit(snackbarMutations.SET_BAR_STATUS, true);
        setTimeout(() => {
            commit(snackbarMutations.FLUSH_SNACKBAR);
        }, SNACKBAR_TIMEOUT);
    },
    [snackbarActions.CLOSE]({ commit }) {
        commit(snackbarMutations.FLUSH_SNACKBAR);
    },
};
