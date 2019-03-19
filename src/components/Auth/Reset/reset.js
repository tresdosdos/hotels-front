import { validationMixin } from 'vuelidate';
import { minLength, required } from 'vuelidate/lib/validators';
import { authService } from '../../../services/auth.service';
import { SNACKBAR_COLORS } from '../../../store/modules/snackbar/snackbar-options';

export default {
    name: 'ResetPassword',
    mixins: [validationMixin],
    validations: {
        password: { required, minLength: minLength(8) },
        confPassword: { required },
    },
    data: () => ({
        password: '',
        confPassword: '',
    }),
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
    methods: {
        async submit() {
            this.$v.$touch();

            if (this.passwordErrors.length || this.confPasswordErrors.length) {
                return;
            }

            this.$store.dispatch('spinner/start');
            try {
                const res = await authService.resetPassword(this.password);

                this.$store.dispatch('spinner/stop');
                this.$store.dispatch('user/setData', res.data);
                this.$router.push('/');
            } catch (err) {
                this.$store.dispatch('spinner/stop');
                this.$store.dispatch('user/setData', {});
                this.$store.dispatch('snackbar/show', {
                    message: err.message,
                    color: SNACKBAR_COLORS.error,
                });
            }
        },
    },
};
