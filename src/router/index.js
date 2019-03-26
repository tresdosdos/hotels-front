import Vue from 'vue';
import Router from 'vue-router';
import { authRoutes } from './auth';
import { homeRoutes } from './home';
import { userRoutes } from './user';
import { hotelRoutes } from './hotel';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...homeRoutes,
        ...authRoutes,
        ...userRoutes,
        ...hotelRoutes,
        {
            path: '*',
            name: 'redirect',
            redirect: '/',
        },
    ],
});
