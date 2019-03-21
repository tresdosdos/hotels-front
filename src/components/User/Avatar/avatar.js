import { mapGetters, mapState } from 'vuex';

export default {
    name: 'Avatar',
    props: ['size'],
    computed: {
        ...mapGetters('user', {
            isAuthorized: 'isAuthorized',
            firstLetter: 'firstLetter',
        }),
        ...mapState({
            avatar: state => state.user.data.avatar,
        }),
    },
};
