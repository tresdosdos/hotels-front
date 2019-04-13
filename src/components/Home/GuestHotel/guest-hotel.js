import { mapState, mapGetters } from 'vuex';
import { hotelActions } from '../../../store/modules/hotel/constants';
import ReserveRoom from './ReserveRoom';

export default {
    name: 'GuestHotel',
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    components: {
        'h-reserve-room': ReserveRoom,
    },
    computed: {
        ...mapState({
            hotel: state => state.hotel.currentHotel,
        }),
        ...mapGetters('user', {
            isAuthorized: 'isAuthorized',
        }),
    },
    async mounted() {
        if (!this.id) {
            this.$router.push('/');
        }

        const hotel = await this.$store.dispatch(
            `hotel/${hotelActions.GET_BY_ID}`,
            this.id
        );
        this.$store.dispatch(`hotel/${hotelActions.SET_CURRENT_HOTEL}`, hotel);
    },
};
