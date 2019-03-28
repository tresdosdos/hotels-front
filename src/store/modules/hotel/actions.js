import { hotelActions, hotelMutations } from './constants';

export default {
    [hotelActions.SET_USER_HOTELS]({ commit }, hotels) {
        commit(hotelMutations.SET_USER_HOTELS, hotels);
    },
};
