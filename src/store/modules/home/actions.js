import { homeActions, homeMutations } from './constants';
import { homeService } from '../../../services/home.service';

export default {
    async [homeActions.GET_HOTELS]({ commit }, params) {
        const res = await homeService.getHotels(params);

        commit(homeMutations.SET_FOUND_HOTELS, res.data);
    },
};
