export default {
    isAuthorized(state) {
        return state && state.data && state.data.id;
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
};
