import AuthForm from '../AuthForm';
import { authService } from '../../../services/auth.service';
import { SNACKBAR_COLORS } from '../../../store/modules/snackbar/snackbar-options';

export default {
    name: 'SignIn',
    components: { AuthForm },
    computed: {
        routeName() {
            return this.$route.name;
        },
    },
    methods: {
        async signIn(user) {
            try {
                this.$store.dispatch('spinner/start');

                const res = await authService.signIn(user);

                this.$store.dispatch('spinner/stop');
                this.$store.dispatch('user/setData', res.data);
                this.$router.push('/');
            } catch (err) {
                this.$store.dispatch('spinner/stop');
                this.$store.dispatch('snackbar/show', {
                    message: err.message,
                    color: SNACKBAR_COLORS.error,
                });
                this.$store.dispatch('user/setData', {});
            }
        },
    },
};
