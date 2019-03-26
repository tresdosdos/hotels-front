import { validationMixin } from 'vuelidate';
import { minLength, required } from 'vuelidate/lib/validators';
import { hotelService } from '../../../services/hotel.service';

export default {
    name: 'AddHotel',
    mixins: [validationMixin],
    validations: {
        name: { required, minLength: minLength(4) },
        address: { required },
        city: { required },
    },
    computed: {
        nameErrors() {
            const errors = [];

            if (!this.$v.name.$dirty) {
                return errors;
            }

            !this.$v.name.required && errors.push('Name is required');
            !this.$v.name.minLength &&
                errors.push('Name must be longer than 4 chars');

            return errors;
        },
        addressErrors() {
            const errors = [];

            if (!this.$v.address.$dirty) {
                return errors;
            }

            !this.$v.address.required && errors.push('Address is required');

            return errors;
        },
        cityErrors() {
            const errors = [];

            if (!this.$v.city.$dirty) {
                return errors;
            }

            !this.$v.city.required && errors.push('City is required');

            return errors;
        },
    },
    data: () => ({
        name: '',
        address: '',
        city: '',
    }),
    methods: {
        async submit() {
            this.$v.$touch();

            if (
                this.nameErrors.length ||
                this.addressErrors.length ||
                this.cityErrors.length
            ) {
                return;
            }

            await hotelService.createHotel({
                name: this.name,
                address: this.address,
                city: this.city,
            });
            this.$store.dispatch('snackbar', {
                color: 'success',
                message: 'Your hotel was successfully created',
            });
            this.$router.push('/hotels');
        },
    },
};
