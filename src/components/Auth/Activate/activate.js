import { userActions } from '../../../store/modules/user/constants';

export default {
    name: 'Activate',
    props: {
        token: {
            type: String,
            required: true,
        },
    },
    async mounted() {
        if (!this.token) {
            return;
        }

        this.$store.dispatch(
            `user/${userActions.ACTIVATE_ACCOUNT}`,
            this.token
        );
        this.$router.push('/');
    },
};
