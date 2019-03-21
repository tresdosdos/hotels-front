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
                const res = await authService.signUp(user);

                this.$store.dispatch('snackbar/show', {
                    message: res.data.message,
                    color: SNACKBAR_COLORS.success,
                });
            } catch (err) {
                this.$router.push('/sign-up');
            }
        },
    },
};
