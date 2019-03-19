import Vue from 'vue';
import Router from 'vue-router';
import { authRoutes } from './auth';
import { homeRoutes } from './home';
import { userRoutes } from './user';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...homeRoutes,
        ...authRoutes,
        ...userRoutes,
        {
            path: '*',
            name: 'redirect',
            redirect: '/',
        },
    ],
});
