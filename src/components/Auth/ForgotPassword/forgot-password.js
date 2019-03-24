import { validationMixin } from 'vuelidate';
import { email, required } from 'vuelidate/lib/validators';
import { authService } from '../../../services/auth.service';
import { SNACKBAR_COLORS } from '../../../store/modules/snackbar/snackbar-options';

export default {
    name: 'ForgotPassword',
    mixins: [validationMixin],
    validations: {
        email: { required, email },
    },
    computed: {
        emailErrors() {
            const errors = [];

            if (!this.$v.email.$dirty) {
                return errors;
            }

            !this.$v.email.required && errors.push('Email is required');
            !this.$v.email.email && errors.push('Invalid email');

            return errors;
        },
    },
    data: () => ({
        email: '',
    }),
    methods: {
        async submit() {
            this.$v.$touch();

            if (this.emailErrors.length) {
                return;
            }

            try {
                const res = await authService.sendResetEmail(this.email);

                this.$store.dispatch('snackbar/show', {
                    message: res.data.message,
                    color: SNACKBAR_COLORS.info,
                });
            } catch (err) {
                this.$router.push('/sign-in');
            }
        },
    },
};
