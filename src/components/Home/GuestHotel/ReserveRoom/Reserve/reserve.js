import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { hotelActions } from '../../../../../store/modules/hotel/constants';

export default {
    name: 'Reserve',
    props: {
        room: {
            type: Object,
            required: true,
        },
    },
    computed: {
        passportErrors() {
            const errors = [];

            if (!this.$v.passport.$dirty) {
                return errors;
            }

            !this.$v.passport.required &&
                errors.push('Passport number is required');

            return errors;
        },
        surnameErrors() {
            const errors = [];

            if (!this.$v.surname.$dirty) {
                return errors;
            }

            !this.$v.surname.required && errors.push('Surname is required');

            return errors;
        },
        nameErrors() {
            const errors = [];

            if (!this.$v.name.$dirty) {
                return errors;
            }

            !this.$v.name.required && errors.push('Name is required');

            return errors;
        },
    },
    mixins: [validationMixin],
    validations: {
        passport: { required },
        surname: { required },
        name: { required },
    },
    data: () => ({
        dialog: null,
        passport: undefined,
        surname: undefined,
        name: undefined,
    }),
    methods: {
        async submit() {
            this.$v.$touch();

            if (
                this.passportErrors.length ||
                this.surnameErrors.length ||
                this.nameErrors.length
            ) {
                return;
            }

            await this.$store.dispatch(
                `hotel/${hotelActions.CREATE_RENT}`,
                Object.assign(this.room, { status: 'reserve' })
            );

            this.dialog = false;
        },
    },
};
