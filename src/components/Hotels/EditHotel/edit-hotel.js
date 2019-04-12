import { mapState } from 'vuex';
import PictureInput from 'vue-picture-input';
import { hotelActions } from '../../../store/modules/hotel/constants';
import AddRoom from './AddRoom';
import Rooms from './Rooms';

export default {
    name: 'EditHotel',
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    components: {
        'picture-input': PictureInput,
        'h-add-room': AddRoom,
        'h-rooms': Rooms,
    },
    computed: {
        ...mapState({
            hotel: state => state.hotel.currentHotel,
        }),
    },
    async mounted() {
        const hotel = await this.$store.dispatch(
            `hotel/${hotelActions.GET_BY_ID}`,
            this.id
        );

        this.$store.dispatch(`hotel/${hotelActions.SET_CURRENT_HOTEL}`, hotel);
    },
    methods: {
        async onRoomAddSuccess() {
            this.$store.dispatch(
                `hotel/${hotelActions.SET_CURRENT_HOTEL}`,
                await this.$store.dispatch(
                    `hotel/${hotelActions.GET_BY_ID}`,
                    this.id
                )
            );
        },
        async uploadPhoto() {
            await this.$store.dispatch(`hotel/${hotelActions.UPLOAD_PHOTO}`, {
                hotelId: this.hotel.id,
                file: this.$refs.pictureInput.file,
            });
            this.onRoomAddSuccess();
        },
    },
};
