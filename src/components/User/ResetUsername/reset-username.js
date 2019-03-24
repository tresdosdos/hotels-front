import { mapState } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { authService } from '../../../services/auth.service';

export default {
    name: 'ResetUsername',
    mixins: [validationMixin],
    validations: {
        username: { required },
    },
    computed: {
        ...mapState({
            userName: state => state.user.data.username,
        }),
        usernameErrors() {
            const errors = [];

            if (!this.$v.username.$dirty) {
                return errors;
            }

            !this.$v.username.required && errors.push('Username is required');

            return errors;
        },
    },
    data: () => ({
        username: '',
    }),
    methods: {
        async submit() {
            this.$v.$touch();

            if (this.usernameErrors.length) {
                return;
            }

            try {
                const res = await authService.update({
                    username: this.username,
                });

                this.$store.dispatch('user/setData', res.data);
            } catch (err) {
                this.$store.dispatch('user/setData', {});
            }
        },
        async deleteName() {
            if (!this.userName) {
                return;
            }

            try {
                const res = await authService.update({
                    username: null,
                });

                this.$store.dispatch('user/setData', res.data);
            } catch (err) {
                this.$store.dispatch('user/setData', {});
            }
        },
    },
};
