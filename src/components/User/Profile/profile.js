import { mapState, mapGetters } from 'vuex';
import Avatar from '../Avatar';

export default {
    name: 'Profile',
    components: {
        'h-avatar': Avatar,
    },
    computed: {
        ...mapState({
            user: state => state.user.data,
        }),
        ...mapGetters('user', {
            avatar: 'avatar',
        }),
    },
};
