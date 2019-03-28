import AuthForm from '../AuthForm';
import { userActions } from '../../../store/modules/user/constants';

export default {
    name: 'SignUp',
    components: {
        'h-auth-form': AuthForm,
    },
    computed: {
        routeName() {
            return this.$route.name;
        },
    },
    methods: {
        async signUp(user) {
            try {
                this.$store.dispatch(`user/${userActions.SIGN_UP}`, user);
            } catch (err) {
                this.$router.push('/sign-up');
            }
        },
    },
};
