import { mapState } from 'vuex';
import Avatar from '../Avatar';

export default {
    name: 'Profile',
    components: { Avatar },
    computed: {
        ...mapState({
            user: state => state.user.data,
        }),
    },
};
