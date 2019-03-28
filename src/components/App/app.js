import { mapState, mapGetters } from 'vuex';
import { ICONS } from '../../icons';
import Spinner from '../Spinner';
import Avatar from '../User/Avatar';
import logo from '../../assets/logo.png';
import { SNACKBAR_TIMEOUT } from '../../store/modules/snackbar/snackbar-options';

export default {
    name: 'App',
    props: {
        source: String,
        required: true,
    },
    components: {
        'h-spinner': Spinner,
        'h-avatar': Avatar,
    },
    computed: {
        currentRouteName() {
            return this.$route.name;
        },
        ...mapState({
            isBarActive: state => state.snackbar.isActive,
            msg: state => state.snackbar.message,
            color: state => state.snackbar.color,
            isSpinnerActive: state => state.spinner.isActive,
        }),
        ...mapGetters('user', {
            isAuthorized: 'isAuthorized',
            firstLetter: 'firstLetter',
        }),
    },
    data: () => ({
        timeout: SNACKBAR_TIMEOUT,
        drawer: null,
        icons: ICONS,
        logo,
    }),
};
