import { validationMixin } from 'vuelidate';
import { minLength, required } from 'vuelidate/lib/validators';
import { HttpService } from '../../../services/http.service';
import { userActions } from '../../../store/modules/user/constants';
import { snackbarActions } from '../../../store/modules/snackbar/constants';
import { SNACKBAR_COLORS } from '../../../store/modules/snackbar/snackbar-options';

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
                await this.$store.dispatch(`user/${userActions.UPDATE}`, {
                    password: this.password,
                });
                this.$router.push('/');
            } catch (err) {
                this.$store.dispatch(`snackbar/${snackbarActions.SHOW}`, {
                    color: SNACKBAR_COLORS.error,
                    message: err.message,
                });
            }
        },
    },
};
