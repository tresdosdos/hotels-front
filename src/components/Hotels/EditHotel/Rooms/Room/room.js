import _ from 'lodash';
import moment from 'moment';
import { mapState } from 'vuex';
import { cmp } from 'type-comparator';
import { hotelActions } from '../../../../../store/modules/hotel/constants';

export default {
    name: 'Room',
    props: {
        room: {
            type: Object,
            required: true,
        },
    },
    computed: {
        dates() {
            if (!this.room.users || !this.busy) {
                return;
            }

            const comparator = cmp()
                .map(user => user.Rent)
                .use([
                    cmp()
                        .map(rent => rent.startDate)
                        .desc(),
                    cmp()
                        .map(rent => rent.endDate)
                        .asc(),
                ]);
            const sortedUsers = _.clone(this.room.users);
            sortedUsers.sort(comparator);

            return {
                startDate: sortedUsers[0].Rent.startDate,
                endDate: sortedUsers[0].Rent.endDate,
            };
        },
        busy() {
            return (
                this.room.users &&
                _.some(this.room.users, user => {
                    return (
                        user.Rent &&
                        new Date().getTime() >=
                            Date.parse(user.Rent.startDate) &&
                        new Date().getTime() <= Date.parse(user.Rent.endDate)
                    );
                }) &&
                'busy'
            );
        },
        ...mapState({
            hotelId: state =>
                state.hotel.currentHotel && state.hotel.currentHotel.id,
        }),
    },
    methods: {
        formatDate(date) {
            return moment(date).format('DD/MM/YYYY');
        },
        async deleteRoom() {
            await this.$store.dispatch(
                `hotel/${hotelActions.DELETE_ROOM}`,
                this.room.id
            );
            const newHotel = await this.$store.dispatch(
                `hotel/${hotelActions.GET_BY_ID}`,
                this.hotelId
            );

            this.$store.dispatch(
                `hotel/${hotelActions.SET_CURRENT_HOTEL}`,
                newHotel
            );
        },
    },
};
