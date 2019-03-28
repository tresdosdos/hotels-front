import { UserGuard } from './guards/user.guard';

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

export const userRoutes = routes.map(route => {
    route.beforeEnter = UserGuard;

    return route;
});
