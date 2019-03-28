import { UserGuard } from './guards/user.guard';

export const routes = [
    {
        path: '/hotels',
        name: 'Hotels',
        component: () => import('../components/Hotels'),
    },
    {
        path: '/hotel/add',
        name: 'Add hotel',
        component: () => import('../components/Hotels/AddHotel'),
    },
];

export const hotelRoutes = routes.map(route => {
    route.beforeEnter = UserGuard;

    return route;
});
