import _ from 'lodash';
import { SNACKBAR_COLORS } from './snackbar-options';

export default {
    setMessage(state, message) {
        state.message = message;
    },
    setColor(state, color) {
        if (!_.includes(_.values(SNACKBAR_COLORS), color)) {
            console.warn('There is no such color in snackbar ' + color);
            return;
        }

        state.color = color;
    },
    setBarStatus(state, isActive) {
        state.isActive = isActive;
    },
    flushSnackBar(state) {
        state.isActive = false;
        state.message = '';
        state.color = SNACKBAR_COLORS.info;
    },
};
