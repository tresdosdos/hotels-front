import { ICONS } from '../../../icons';

export default {
    name: 'Hotel',
    props: {
        hotel: {
            name: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            images: {
                type: Array,
                required: false,
            },
            createdAt: {
                type: Date,
                required: true,
            },
            updatedAt: {
                type: Date,
                required: true,
            },
        },
    },
    data: () => ({
        icons: ICONS,
    }),
};
