import { hotelActions, hotelMutations } from './constants';
import { hotelService } from '../../../services/hotel.service';
import { snackbarActions } from '../snackbar/constants';

export default {
    [hotelActions.SET_USER_HOTELS]({ commit }, hotels) {
        commit(hotelMutations.SET_USER_HOTELS, hotels);
    },
    async [hotelActions.CREATE_HOTEL]({ dispatch }, hotel) {
        await hotelService.createHotel(hotel);
        dispatch(
            `snackbar/${snackbarActions.SHOW}`,
            {
                color: 'success',
                message: 'Your hotel was successfully created',
            },
            { root: true }
        );
    },
    async [hotelActions.GET_USER_HOTELS]({ dispatch }, userId) {
        const res = await hotelService.getUserHotels(userId);

        if (!res.data) {
            return;
        }

        dispatch(hotelActions.SET_USER_HOTELS, res.data);
    },
};
