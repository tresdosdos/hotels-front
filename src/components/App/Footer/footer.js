import { mapState } from 'vuex';
import { SNACKBAR_TIMEOUT } from '../../../store/modules/snackbar/snackbar-options';
import { snackbarActions } from '../../../store/modules/snackbar/constants';

export default {
    name: 'SnackBar',
    computed: {
        ...mapState({
            isBarActive: state => state.snackbar.isActive,
            msg: state => state.snackbar.message,
            color: state => state.snackbar.color,
        }),
    },
    data: () => ({
        timeout: SNACKBAR_TIMEOUT,
    }),
    methods: {
        closeBar() {
            this.$store.dispatch(`snackbar/${snackbarActions.CLOSE}`);
        },
    },
};
