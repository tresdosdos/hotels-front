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
        path: '/log-out',
        name: 'Log out',
        component: () => import('../components/Auth/LogOut'),
    },
    {
        path: '/callback/:token',
        name: 'Auth callback',
        component: () => import('../components/Auth/Callback'),
        props: true,
    },
    {
        path: '/activate/:token',
        name: 'Activate account',
        component: () => import('../components/Auth/Activate'),
        props: true,
    },
];