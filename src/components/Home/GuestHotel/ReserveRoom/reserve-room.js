import _ from 'lodash';
import moment from 'moment';
import { mapState } from 'vuex';
import { validationMixin } from 'vuelidate';
import { cmp } from 'type-comparator';
import { required } from 'vuelidate/lib/validators';
import { hotelActions } from '../../../../store/modules/hotel/constants';

export default {
    name: 'ReserveRoom',
    computed: {
        ...mapState({
            hotel: state => state.hotel.currentHotel,
        }),
        roomPlaces() {
            const roomPlaces = this.hotel.rooms.map(
                room => room.numberOfPlaces
            );

            return _.uniq(roomPlaces);
        },
        roomNumbers() {
            const filteredRooms = this.hotel.rooms.filter(
                room => this.numberOfPlaces === room.numberOfPlaces
            );

            filteredRooms.sort(
                cmp()
                    .map(room => room.number)
                    .asc()
            );
            return filteredRooms.map(room => room.number);
        },
        finalCost() {
            const room = this.hotel.rooms.find(
                room => room.number === this.number
            );

            if (!room || !this.startDate || !this.endDate) {
                return;
            }

            const date1 = new Date(this.startDate.toString());
            const date2 = new Date(this.endDate.toString());
            const diffTime = Math.abs(date2.getTime() - date1.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return room.cost * diffDays;
        },
        numberErrors() {
            const errors = [];

            if (!this.$v.number.$dirty) {
                return errors;
            }

            !this.$v.number.required && errors.push('Room number is required');

            return errors;
        },
        numberOfPlacesErrors() {
            const errors = [];

            if (!this.$v.numberOfPlaces.$dirty) {
                return errors;
            }

            !this.$v.numberOfPlaces.required &&
                errors.push('Number of places is required');

            return errors;
        },
    },
    mixins: [validationMixin],
    validations: {
        number: { required },
        numberOfPlaces: { required },
        startDate: { required },
        endDate: { required },
    },
    data: () => ({
        dialog: null,
        number: undefined,
        numberOfPlaces: undefined,
        startDate: undefined,
        endDate: undefined,
    }),
    methods: {
        allowedDates(date) {
            const room = this.hotel.rooms.find(
                room => room.number === this.number
            );

            if (!room || !room.users || !room.users.length) {
                return true;
            }

            return _.every(
                room.users,
                user =>
                    !(
                        moment(date).format('YYYY/MM/DD') >=
                            moment(user.Rent.startDate).format('YYYY/MM/DD') &&
                        moment(date).format('YYYY/MM/DD') <=
                            moment(user.Rent.endDate).format('YYYY/MM/DD')
                    )
            );
        },
        async submit() {
            const room = this.hotel.rooms.find(
                room => room.number === this.number
            );

            await this.$store.dispatch(`hotel/${hotelActions.CREATE_RENT}`, {
                roomId: room.id,
                startDate: this.startDate,
                endDate: this.endDate,
            });

            this.dialog = false;
        },
    },
};
