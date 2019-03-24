import { HttpService } from '../../../services/http';
import { userService } from '../../../services/user.service';

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
            const res = await userService.getByToken();

            this.$store.dispatch('user/setData', res.data);
            this.$router.push('/');
        } catch (err) {
            this.$store.dispatch('user/setData', {});
        }
    },
};
