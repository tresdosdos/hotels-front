import AuthForm from '../AuthForm';
import { userActions } from '../../../store/modules/user/constants';

export default {
    name: 'SignIn',
    components: {
        'h-auth-form': AuthForm,
    },
    computed: {
        routeName() {
            return this.$route.name;
        },
    },
    methods: {
        async signIn(user) {
            await this.$store.dispatch(`user/${userActions.SIGN_IN}`, user);
            this.$router.push('/');
        },
    },
};
