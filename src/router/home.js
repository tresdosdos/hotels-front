import Home from '../components/Home';
import { GuestGuard } from './guards/guest.guard';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/hotel/:id',
        name: 'Hotel',
        component: () => import('../components/Home/GuestHotel'),
        props: true,
    },
    {
        path: '/hotels/find',
        name: 'Find hotel',
        component: () => import('../components/Home/HotelsFind'),
        props: route => ({
            cost: route.query.cost,
            numberOfPlaces: route.query.numberOfPlaces,
            floor: route.query.floor,
            city: route.query.city,
            rating: route.query.rating,
        }),
    },
];

export const homeRoutes = routes.map(route => {
    route.beforeEnter = GuestGuard;

    return route;
});
