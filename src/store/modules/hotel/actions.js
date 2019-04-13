import { hotelActions, hotelMutations } from './constants';
import { hotelService } from '../../../services/hotel.service';
import { snackbarActions } from '../snackbar/constants';
import { SNACKBAR_COLORS } from '../snackbar/snackbar-options';

export default {
    [hotelActions.SET_USER_HOTELS]({ commit }, hotels) {
        commit(hotelMutations.SET_USER_HOTELS, hotels);
    },
    async [hotelActions.CREATE_HOTEL]({ dispatch }, hotel) {
        await hotelService.createHotel(hotel);
        dispatch(
            `snackbar/${snackbarActions.SHOW}`,
            {
                color: SNACKBAR_COLORS.success,
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
    async [hotelActions.GET_BY_ID](store, id) {
        const res = await hotelService.getById(id);

        return res.data;
    },
    async [hotelActions.UPDATE_HOTEL]({ dispatch }, hotel) {
        const res = await hotelService.updateHotel(hotel);
        dispatch(hotelActions.SET_CURRENT_HOTEL, res.data);
    },
    [hotelActions.DELETE_HOTEL](store, id) {
        hotelService.deleteHotel(id);
    },
    [hotelActions.SET_CURRENT_HOTEL]({ commit }, hotel) {
        commit(hotelMutations.SET_CURRENT_HOTEL, hotel);
    },
    async [hotelActions.ADD_ROOM]({ dispatch }, room) {
        try {
            await hotelService.addRoom(room);
        } catch (err) {
            dispatch(
                `snackbar/${snackbarActions.SHOW}`,
                {
                    color: SNACKBAR_COLORS.error,
                    message: err.message,
                },
                { root: true }
            );
        }
    },
    async [hotelActions.UPLOAD_PHOTO](store, { hotelId, file }) {
        return await hotelService.uploadPhoto(hotelId, file);
    },
    async [hotelActions.DELETE_ROOM](store, id) {
        return await hotelService.deleteRoom(id);
    },
    async [hotelActions.CREATE_RENT](store, rent) {
        return await hotelService.createRent(rent);
    },
};
