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
        cardNumber: {
            required,
            minLength: minLength(12),
            maxLength: maxLength(12),
        },
        date: { required, minLength: minLength(4), maxLength: maxLength(4) },
        cvv: { required, minLength: minLength(3), maxLength: maxLength(3) },
        passport: { required },
        surname: { required },
        name: { required },
    },
    data: () => ({
        dialog: null,
        cardNumber: undefined,
        date: undefined,
        cvv: undefined,
        passport: undefined,
        surname: undefined,
        name: undefined,
    }),
    methods: {
        async submit() {
            this.$v.$touch();

            if (
                this.cardNumberErrors.length ||
                this.dateErrors.length ||
                this.cvvErrors.length ||
                this.passportErrors.length ||
                this.surnameErrors.length ||
                this.nameErrors.length
            ) {
                return;
            }

            function buildSupportedPaymentMethodData() {
                // Example supported payment methods:
                return [
                    {
                        supportedMethods: 'basic-card',
                        data: {
                            supportedNetworks: ['visa', 'mastercard'],
                            supportedTypes: ['debit', 'credit'],
                        },
                    },
                ];
            }

            function buildShoppingCartDetails() {
                // Hardcoded for demo purposes:
                return {
                    id: 'order-123',
                    displayItems: [
                        {
                            label: 'Example item',
                            amount: { currency: 'USD', value: '1.00' },
                        },
                    ],
                    total: {
                        label: 'Total',
                        amount: { currency: 'USD', value: '1.00' },
                    },
                };
            }

            const request = new PaymentRequest(
                buildSupportedPaymentMethodData(),
                buildShoppingCartDetails()
            );

            request.show().then(function(paymentResponse) {
                paymentResponse
                    .complete('success')
                    .then(function() {
                        console.log('success');
                    })
                    .catch(() => console.log('fail'));
            });

            await this.$store.dispatch(`hotel/${hotelActions.CREATE_RENT}`, {
                ...this.room,
                status: 'rent',
                passportNumber: this.passport,
                surname: this.surname,
                name: this.name,
            });

            this.dialog = false;
        },
    },
};
