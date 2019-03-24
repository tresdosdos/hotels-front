import { validationMixin } from 'vuelidate';
import { required, minLength, email } from 'vuelidate/lib/validators';
import { ICONS } from '../../../icons';
import { environment } from '../../../../env';

export default {
    name: 'AuthForm',
    props: {
        name: {
            type: String,
            required: true,
            validator: value => ['Sign in', 'Sign up'].indexOf(value) !== -1,
        },
    },
    mixins: [validationMixin],
    validations: {
        email: { required, email },
        password: { required, minLength: minLength(8) },
    },
    computed: {
        emailErrors() {
            const errors = [];

            if (!this.$v.email.$dirty) {
                return errors;
            }

            !this.$v.email.required && errors.push('Email is required');
            !this.$v.email.email && errors.push("Email isn't valid");

            return errors;
        },
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
    },
    data: () => ({
        email: '',
        password: '',
        icons: ICONS,
        googleUrl: `${environment.baseUrl}/user/google`,
        githubUrl: `${environment.baseUrl}/user/github`,
        linkedinUrl: `${environment.baseUrl}/user/linkedin`,
    }),
    methods: {
        submit() {
            this.$v.$touch();

            if (this.emailErrors.length || this.passwordErrors.length) {
                return;
            }

            this.$emit('onClick', {
                email: this.email,
                password: this.password,
            });
        },
    },
};
