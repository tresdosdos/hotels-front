export const authRoutes = [
    {
        path: '/sign-in',
        name: 'Sign in',
        component: () => import('../components/Auth/SignIn'),
    },
    {
        path: '/sign-up',
        name: 'Sign up',
        component: () => import('../components/Auth/SignUp'),
    },
    {
        path: '/activate/:token',
        name: 'Activate account',
        component: () => import('../components/Auth/Activate'),
        props: true,
    },
];
