import { HttpService } from '../../../services/http';
import { authService } from '../../../services/auth.service';
import { SNACKBAR_COLORS } from '../../../store/modules/snackbar/snackbar-options';

export default {
    name: 'Activate',
    props: ['token'],
    async mounted() {
        if (!this.token) {
            return;
        }

        HttpService.setToken(this.token);
        try {
            const res = await authService.activateAccount();

            this.$store.dispatch('user/setData', res.data);
            this.$router.push('/');
        } catch (err) {
            this.$store.dispatch('snackbar/show', {
                message: err.message,
                color: SNACKBAR_COLORS.error,
            });
            this.$store.dispatch('user/setData', {});
            this.$router.push('/sign-in');
        }
    },
};
