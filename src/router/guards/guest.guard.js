import store from '../../store';
import { userActions } from '../../store/modules/user/constants';

export const GuestGuard = async (to, from, next) => {
    const hasData = store.state.user.data && store.state.user.data.id;

    if (!hasData) {
        await store.dispatch(`user/${userActions.GET_DATA}`);
    }

    next();
};
