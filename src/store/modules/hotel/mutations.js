import { hotelMutations } from './constants';

export default {
    [hotelMutations.SET_USER_HOTELS](state, hotels) {
        state.userHotels = hotels;
    },
    [hotelMutations.SET_CURRENT_HOTEL](state, hotel) {
        state.currentHotel = hotel;
    },
};
