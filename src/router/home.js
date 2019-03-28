import Home from '../components/Home';
import { GuestGuard } from './guards/guest.guard';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
];

export const homeRoutes = routes.map(route => {
    route.beforeEnter = GuestGuard;

    return route;
});
