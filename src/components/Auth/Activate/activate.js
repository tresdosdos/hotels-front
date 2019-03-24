import { authService } from '../../../services/auth.service';

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

        try {
            const res = await authService.activateAccount(this.token);

            this.$store.dispatch('user/setData', res.data);
            this.$router.push('/');
        } catch (err) {
            this.$store.dispatch('user/setData', {});
        }
    },
};
