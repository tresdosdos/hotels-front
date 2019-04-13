import _ from 'lodash';
import Room from './Room';

export default {
    name: 'Rooms',
    components: {
        'h-room': Room,
    },
    props: {
        rooms: {
            type: Array,
            required: true,
        },
    },
    computed: {
        orderedRooms() {
            const orderedRooms = this.rooms.reduce((acc, room) => {
                if (!Array.isArray(acc[room.floor])) {
                    acc[room.floor] = [];
                }

                acc[room.floor].push(room);

                return acc;
            }, []);

            orderedRooms.forEach(rooms =>
                rooms.sort((room1, room2) => +room1.number - +room2.number)
            );

            return orderedRooms;
        },
        currentFloor() {
            return _.find(this.rooms, room => room.floor).floor;
        },
    },
};
