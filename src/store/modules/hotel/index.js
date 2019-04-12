import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = {
    userHotels: [],
    currentHotel: {
        id: 0,
        userId: 0,
        name: '',
        address: '',
        city: '',
        createdAt: '',
        updatedAt: '',
        rooms: [],
        images: [],
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
