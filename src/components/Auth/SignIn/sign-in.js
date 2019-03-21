import AuthForm from '../AuthForm';
import { authService } from '../../../services/auth.service';

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
                const res = await authService.signIn(user);

                this.$store.dispatch('user/setData', res.data);
                this.$router.push('/');
            } catch (err) {
                this.$store.dispatch('user/setData', {});
            }
        },
    },
};
