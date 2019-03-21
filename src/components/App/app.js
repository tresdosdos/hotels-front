import { mapState, mapGetters } from 'vuex';
import { ICONS } from '../../icons';
import Spinner from '../Spinner';
import Avatar from '../User/Avatar';
import logo from '../../assets/logo.png';
import { SNACKBAR_TIMEOUT } from '../../store/modules/snackbar/snackbar-options';
import { HttpService } from '../../services/http';
import { userService } from '../../services/user.service';

export default {
    name: 'App',
    async mounted() {
        const token = HttpService.getToken();

        if (!token) {
            return;
        }

        try {
            const res = await userService.getByToken();

            this.$store.dispatch('user/setData', res.data);
        } catch (err) {
            this.$store.dispatch('user/setData', {});
        }
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
        drawer: null,
        icons: ICONS,
        logo,
        timeout: SNACKBAR_TIMEOUT,
    }),
    props: {
        source: String,
    },
    components: { Spinner, Avatar },
};
