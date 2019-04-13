import { userActions, userMutations } from './constants';
import { HttpService } from '../../../services/http.service';
import { userService } from '../../../services/user.service';
import { authService } from '../../../services/auth.service';
import { snackbarActions } from '../snackbar/constants';
import { SNACKBAR_COLORS } from '../snackbar/snackbar-options';

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
    async [userActions.ACTIVATE_ACCOUNT]({ commit }, token) {
        try {
            const res = await authService.activateAccount(token);

            commit(userMutations.SET_DATA, res.data);
        } catch (err) {
            commit(userMutations.SET_DATA, {});
        }
    },
    async [userActions.UPDATE]({ commit }, user) {
        const res = await authService.update(user);

        commit(userMutations.SET_DATA, res.data);
    },
    async [userActions.SIGN_IN]({ commit }, user) {
        try {
            const res = await authService.signIn(user);

            commit(userMutations.SET_DATA, res.data);
        } catch (err) {
            commit(userMutations.SET_DATA, {});
        }
    },
    async [userActions.SIGN_UP]({ dispatch }, user) {
        const res = await authService.signUp(user);

        dispatch(
            `snackbar/${snackbarActions.SHOW}`,
            {
                message: res.data.message,
                color: SNACKBAR_COLORS.success,
            },
            { root: true }
        );
    },
    async [userActions.UPLOAD_AVATAR]({ commit }, file) {
        const res = await userService.uploadAvatar(file);

        commit(userMutations.SET_DATA, res.data);
    },
    async [userActions.DELETE_AVATAR]({ commit, state }) {
        if (!state.data.avatar) {
            return;
        }

        const res = await userService.deleteAvatar(state.data.avatar.id);

        commit(userMutations.SET_DATA, res.data);
    },
};
