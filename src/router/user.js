import store from '../store';
import { HttpService } from '../services/http';
import { userService } from '../services/user.service';
import { SNACKBAR_COLORS } from '../store/modules/snackbar/snackbar-options';

const routes = [
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../components/User/Profile'),
    },
    {
        path: '/reset-username',
        name: 'Reset username',
        component: () => import('../components/User/ResetUsername'),
    },
    {
        path: '/reset-avatar',
        name: 'Reset avatar',
        component: () => import('../components/User/ResetAvatar'),
    },
];

export const UserGuard = async (to, from, next) => {
    const hasData = store.state.user.data && store.state.user.data.id;

    if (!hasData) {
        const token = HttpService.getToken();

        if (!token) {
            return next('/');
        }

        try {
            store.dispatch('spinner/start');

            const res = await userService.getByToken();

            store.dispatch('user/setData', res.data);
            store.dispatch('spinner/stop');
            return next();
        } catch (err) {
            store.dispatch('spinner/stop');
            store.dispatch('snackbar/show', {
                message: err.message,
                color: SNACKBAR_COLORS.error,
            });
            return next('/');
        }
    }

    next();
};

export const userRoutes = routes.map(route => {
    route.beforeEnter = UserGuard;

    return route;
});
