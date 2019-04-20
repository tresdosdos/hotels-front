import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { hotelActions } from '../../../../../store/modules/hotel/constants';
import { maxLength, minLength } from 'vuelidate/src/validators';

export default {
    name: 'Rent',
    props: {
        room: {
            type: Object,
            required: true,
        },
    },
    computed: {
        cardNumberErrors() {
            const errors = [];

            if (!this.$v.cardNumber.$dirty) {
                return errors;
            }

            !this.$v.cardNumber.required &&
                errors.push('Card number is required');

            return errors;
        },
        dateErrors() {
            const errors = [];

            if (!this.$v.date.$dirty) {
                return errors;
            }

            !this.$v.date.required &&
                errors.push('Expiration date is required');

            return errors;
        },
        cvvErrors() {
            const errors = [];

            if (!this.$v.cvv.$dirty) {
                return errors;
            }

            !this.$v.cvv.required && errors.push('CVV is required');

            return errors;
        },
    },
    mixins: [validationMixin],
    validations: {
        cardNumber: {
            required,
            minLength: minLength(12),
            maxLength: maxLength(12),
        },
        date: { required, minLength: minLength(4), maxLength: maxLength(4) },
        cvv: { required, minLength: minLength(3), maxLength: maxLength(3) },
    },
    data: () => ({
        dialog: null,
        cardNumber: undefined,
        date: undefined,
        cvv: undefined,
    }),
    methods: {
        async submit() {
            this.$v.$touch();

            if (
                this.cardNumberErrors.length ||
                this.dateErrors.length ||
                this.cvvErrors.length
            ) {
                return;
            }

            await this.$store.dispatch(
                `hotel/${hotelActions.CREATE_RENT}`,
                Object.assign(this.room, { status: 'rent' })
            );

            this.dialog = false;
        },
    },
};
