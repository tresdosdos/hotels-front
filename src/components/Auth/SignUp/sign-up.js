import AuthForm from '../AuthForm';
import { authService } from '../../../services/auth.service';
import { SNACKBAR_COLORS } from '../../../store/modules/snackbar/snackbar-options';

export default {
    name: 'SignUp',
    components: { AuthForm },
    computed: {
        routeName() {
            return this.$route.name;
        },
    },
    methods: {
        async signUp(user) {
            try {
                this.$store.dispatch('spinner/start');

                const res = await authService.signUp(user);

                this.$store.dispatch('spinner/stop');
                this.$store.dispatch('snackbar/show', {
                    message: res.data.message,
                    color: SNACKBAR_COLORS.success,
                });
            } catch (err) {
                this.$store.dispatch('spinner/stop');
                this.$store.dispatch('snackbar/show', {
                    message: err.message,
                    color: SNACKBAR_COLORS.error,
                });
            }
        },
    },
};
