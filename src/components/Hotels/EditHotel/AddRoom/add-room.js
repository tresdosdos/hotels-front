import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { hotelActions } from '../../../../store/modules/hotel/constants';
import { maxValue, minValue } from 'vuelidate/src/validators';

export default {
    name: 'AddRoom',
    props: {
        hotelId: {
            type: String | Number,
            required: true,
        },
    },
    mixins: [validationMixin],
    validations: {
        number: { required, minValue: minValue(1) },
        floor: { required, minValue: minValue(1) },
        numberOfPlaces: {
            required,
            minValue: minValue(1),
            maxValue: maxValue(9),
        },
        cost: { required, minValue: minValue(0) },
    },
    computed: {
        numberErrors() {
            const errors = [];

            if (!this.$v.number.$dirty) {
                return errors;
            }

            !this.$v.number.required && errors.push('Number is required');
            !this.$v.number.minValue &&
                errors.push("Minimal value isn't valid");

            return errors;
        },
        floorErrors() {
            const errors = [];

            if (!this.$v.floor.$dirty) {
                return errors;
            }

            !this.$v.floor.required && errors.push('Floor is required');
            !this.$v.floor.minValue && errors.push("Minimal value isn't valid");

            return errors;
        },
        numberOfPlacesErrors() {
            const errors = [];

            if (!this.$v.numberOfPlaces.$dirty) {
                return errors;
            }

            !this.$v.numberOfPlaces.required &&
                errors.push('Number of places is required');
            !this.$v.numberOfPlaces.minValue &&
                errors.push("Minimal value isn't valid");
            !this.$v.numberOfPlaces.maxValue &&
                errors.push('Max value should be equal or less than 9');

            return errors;
        },
        costErrors() {
            const errors = [];

            if (!this.$v.cost.$dirty) {
                return errors;
            }

            !this.$v.cost.required && errors.push('Cost is required');
            !this.$v.cost.minValue && errors.push("Minimal value isn't valid");

            return errors;
        },
    },
    data: () => ({
        dialog: false,
        number: undefined,
        floor: undefined,
        numberOfPlaces: undefined,
        cost: undefined,
    }),
    methods: {
        async submit() {
            this.$v.$touch();

            if (
                this.numberErrors.length ||
                this.floorErrors.length ||
                this.numberOfPlacesErrors.length ||
                this.costErrors.length
            ) {
                return;
            }

            this.dialog = false;

            await this.$store.dispatch(`hotel/${hotelActions.ADD_ROOM}`, {
                name: this.name,
                cost: this.cost,
                floor: this.floor,
                number: this.number,
                numberOfPlaces: this.numberOfPlaces,
                hotelId: this.hotelId,
            });
            this.$emit('onRoomAddSuccess');
        },
    },
};
