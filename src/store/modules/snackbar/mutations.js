import _ from 'lodash';
import { SNACKBAR_COLORS } from './snackbar-options';
import { snackbarMutations } from './constants';

export default {
    [snackbarMutations.SET_MESSAGE](state, message) {
        state.message = message;
    },
    [snackbarMutations.SET_COLOR](state, color) {
        if (!_.includes(_.values(SNACKBAR_COLORS), color)) {
            console.warn('There is no such color in snackbar ' + color);
            return;
        }

        state.color = color;
    },
    [snackbarMutations.SET_BAR_STATUS](state, isActive) {
        state.isActive = isActive;
    },
    [snackbarMutations.FLUSH_SNACKBAR](state) {
        state.isActive = false;
        state.message = '';
        state.color = SNACKBAR_COLORS.info;
    },
};
