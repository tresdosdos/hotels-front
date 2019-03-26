export const hotelRoutes = [
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
