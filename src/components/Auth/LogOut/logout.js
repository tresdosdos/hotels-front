import { HttpService } from '../../../services/http';
import { userActions } from '../../../store/modules/user/constants';

export default {
    name: 'LogOut',
    mounted() {
        this.$store.dispatch(`user/${userActions.SET_DATA}`, {});
        HttpService.removeToken();
        this.$router.push('/sign-in');
    },
};
