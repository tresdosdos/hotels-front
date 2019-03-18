export default {
    isAuthorized(state) {
        return state && state.data && state.data.id;
    },
};
