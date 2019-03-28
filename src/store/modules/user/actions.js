import { userActions, userMutations } from './constants';
import { HttpService } from '../../../services/http';
import { userService } from '../../../services/user.service';

export default {
    [userActions.SET_DATA]({ commit }, user) {
        commit(userMutations.SET_DATA, user);
    },
    async [userActions.GET_DATA]({ commit }) {
        const token = HttpService.getToken();

        if (!token) {
            return commit(userMutations.SET_DATA, {});
        }

        const res = await userService.getByToken();
        commit(userMutations.SET_DATA, res.data);
    },
};
