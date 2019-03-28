import { mapGetters, mapState } from 'vuex';
import CreateHotel from './CreateHotel';
import Hotel from './Hotel';
import { hotelActions } from '../../store/modules/hotel/constants';

export default {
    name: 'Hotels',
    components: {
        'h-create-hotel': CreateHotel,
        'h-hotel': Hotel,
    },
    computed: {
        ...mapGetters('user', {
            userId: 'userId',
        }),
        ...mapState({
            userHotels: state => state.hotel.userHotels,
        }),
    },
    async mounted() {
        this.$store.dispatch(
            `hotel/${hotelActions.GET_USER_HOTELS}`,
            this.userId
        );
    },
};
