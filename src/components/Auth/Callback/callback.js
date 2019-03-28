import { HttpService } from '../../../services/http';
import { userActions } from '../../../store/modules/user/constants';

export default {
    name: 'Callback',
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

        HttpService.setToken(this.token);
        try {
            this.$store.dispatch(`user/${userActions.GET_DATA}`);
            this.$router.push('/');
        } catch (err) {
            this.$store.dispatch(`user/${userActions.SET_DATA}`, {});
        }
    },
};
