import { userMutations } from './constants';

export default {
    [userMutations.SET_DATA](state, user) {
        state.data = user;
    },
};
