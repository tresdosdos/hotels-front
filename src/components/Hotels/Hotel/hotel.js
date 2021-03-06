import { mapGetters } from 'vuex';
import { ICONS } from '../../../icons';
import { hotelActions } from '../../../store/modules/hotel/constants';

export default {
    name: 'Hotel',
    props: {
        hotel: {
            id: {
                type: Number,
                required: true,
            },
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
        link: {
            type: String,
            required: true,
        },
        fromAdminPanel: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        ...mapGetters('user', {
            userId: 'userId',
        }),
        isAdmin() {
            return this.hotel.userId === this.userId;
        },
    },
    data: () => ({
        icons: ICONS,
    }),
    methods: {
        deleteHotel() {
            this.$store.dispatch(
                `hotel/${hotelActions.DELETE_HOTEL}`,
                this.hotel.id
            );
            this.$store.dispatch(
                `hotel/${hotelActions.GET_USER_HOTELS}`,
                this.userId
            );
        },
    },
};
