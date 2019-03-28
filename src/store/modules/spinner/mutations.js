import { spinnerMutations } from './constants';

export default {
    [spinnerMutations.SET_ACTIVITY](state, isActive) {
        state.isActive = isActive;
    },
};
