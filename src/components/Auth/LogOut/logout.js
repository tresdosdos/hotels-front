import { HttpService } from '../../../services/http';

export default {
    name: 'LogOut',
    mounted() {
        this.$store.dispatch('user/setData', {});
        HttpService.removeToken();
        this.$router.push('/sign-in');
    },
};
