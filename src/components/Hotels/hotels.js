import { mapGetters, mapState } from 'vuex';
import CreateHotel from './CreateHotel';
import Hotel from './Hotel';
import { hotelService } from '../../services/hotel.service';

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
    async updated() {
        if (!this.userId) {
            return;
        }

        const res = await hotelService.getUserHotels(this.userId);

        if (!res.data) {
            return;
        }

        this.$store.dispatch('hotel/setUserHotels', res.data);
        console.log(this.userHotels);
    },
};
