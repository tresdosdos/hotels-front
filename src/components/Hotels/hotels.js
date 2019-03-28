import { mapGetters, mapState } from 'vuex';
import CreateHotel from './CreateHotel';
import Hotel from './Hotel';
import { hotelService } from '../../services/hotel.service';
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
        const res = await hotelService.getUserHotels(this.userId);

        if (!res.data) {
            return;
        }

        this.$store.dispatch(`hotel/${hotelActions.SET_USER_HOTELS}`, res.data);
    },
};
