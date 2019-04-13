import _ from 'lodash';

export default {
    foundHotels(state) {
        const hotels = state.rooms.map(room => room.hotel);

        return _.uniqBy(hotels, 'id');
    },
};
