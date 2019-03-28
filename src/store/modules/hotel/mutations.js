import { hotelMutations } from './constants';

export default {
    [hotelMutations.SET_USER_HOTELS](state, hotels) {
        state.userHotels = hotels;
    },
};
