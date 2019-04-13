import store from '../../store';
import { HttpService } from '../../services/http.service';
import { userActions } from '../../store/modules/user/constants';

export const UserGuard = async (to, from, next) => {
    const hasData = store.state.user.data && store.state.user.data.id;

    if (!hasData) {
        const token = HttpService.getToken();

        if (!token) {
            return next('/');
        }

        try {
            await store.dispatch(`user/${userActions.GET_DATA}`);

            return next();
        } catch (err) {
            return next('/');
        }
    }

    next();
};
