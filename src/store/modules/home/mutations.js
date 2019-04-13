import { homeMutations } from './constants';

export default {
    [homeMutations.SET_FOUND_HOTELS](state, rooms) {
        state.rooms = rooms;
    },
};
