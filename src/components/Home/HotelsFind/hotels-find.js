import { mapGetters } from 'vuex';
import Hotel from '../../Hotels/Hotel';
import { homeActions } from '../../../store/modules/home/constants';

export default {
    name: 'HotelsFind',
    props: {
        cost: {
            type: String,
            required: false,
        },
        numberOfPlaces: {
            type: String,
            required: false,
        },
        floor: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        rating: {
            type: Number | String,
            required: false,
        }
    },
    components: {
        'h-hotel': Hotel,
    },
    computed: {
        ...mapGetters('home', {
            foundHotels: 'foundHotels',
        }),
    },
    mounted() {
        this.$store.dispatch(`home/${homeActions.GET_HOTELS}`, {
            cost: this.cost,
            floor: this.floor,
            numberOfPlaces: this.numberOfPlaces,
            city: this.city,
            rating: this.rating,
        });
    },
};
