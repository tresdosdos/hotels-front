import _ from 'lodash';

export default {
    isAuthorized(state) {
        return _.get(state, 'data.id');
    },
    firstLetter(state) {
        if (!state.data) {
            return null;
        }

        if (state.data.username && state.data.username.length) {
            return state.data.username[0].toUpperCase();
        }

        return state.data.email && state.data.email[0].toUpperCase();
    },
    avatar(state) {
        return _.get(state, 'data.avatar.url');
    },
    avatarHD(state) {
        return _.get(state, 'data.avatar.shortUrl');
    },
    avatarId(state) {
        return _.get(state, 'data.avatar.id');
    },
};
