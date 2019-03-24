import moment from 'moment';
import _ from 'lodash';
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
            createdAt: state =>
                state.user.data && moment(state.user.data.createdAt).fromNow(),
            lastSystem: state =>
                _.get(state, 'user.data.externalUser.lastSystem'),
        }),
        ...mapGetters('user', {
            avatar: 'avatar',
        }),
    },
};
