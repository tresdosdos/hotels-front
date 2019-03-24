import { validationMixin } from 'vuelidate';
import { minLength, required } from 'vuelidate/lib/validators';
import { authService } from '../../../services/auth.service';
import { HttpService } from '../../../services/http';

export default {
    name: 'ResetPassword',
    props: {
        token: {
            type: String,
            required: false,
        },
    },
    mixins: [validationMixin],
    validations: {
        password: { required, minLength: minLength(8) },
        confPassword: { required },
    },
    mounted() {
        if (this.token) {
            HttpService.setToken(this.token);
        }
    },
    computed: {
        passwordErrors() {
            const errors = [];

            if (!this.$v.password.$dirty) {
                return errors;
            }

            !this.$v.password.required && errors.push('Password is required');
            !this.$v.password.minLength &&
                errors.push('Password length must be more than 8 chars');

            return errors;
        },
        confPasswordErrors() {
            const errors = [];

            if (!this.$v.confPassword.$dirty) {
                return errors;
            }

            !this.$v.confPassword.required &&
                errors.push('Password is required');
            this.confPassword !== this.password &&
                errors.push("Passwords doesn't match");

            return errors;
        },
    },
    data: () => ({
        password: '',
        confPassword: '',
    }),
    methods: {
        async submit() {
            this.$v.$touch();

            if (this.passwordErrors.length || this.confPasswordErrors.length) {
                return;
            }

            try {
                const res = await authService.update({
                    password: this.password,
                });

                this.$store.dispatch('user/setData', res.data);
                this.$router.push('/');
            } catch (err) {
                this.$store.dispatch('user/setData', {});
            }
        },
    },
};
