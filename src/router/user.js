export const userRoutes = [
    {
        path: '/reset',
        name: 'Reset password',
        component: () => import('../components/Auth/Reset'),
    },
];
