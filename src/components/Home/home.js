import { validationMixin } from 'vuelidate';
import { maxValue, minValue } from 'vuelidate/src/validators';

export default {
    name: 'Home',
    mixins: [validationMixin],
    validations: {
        floor: { minValue: minValue(1) },
        numberOfPlaces: {
            minValue: minValue(1),
            maxValue: maxValue(9),
        },
        cost: { minValue: minValue(0) },
    },
    computed: {
        floorErrors() {
            const errors = [];

            if (!this.$v.floor.$dirty) {
                return errors;
            }

            !this.$v.floor.minValue && errors.push("Minimal value isn't valid");

            return errors;
        },
        numberOfPlacesErrors() {
            const errors = [];

            if (!this.$v.numberOfPlaces.$dirty) {
                return errors;
            }

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

            !this.$v.cost.minValue && errors.push("Minimal value isn't valid");

            return errors;
        },
    },
    data: () => ({
        floor: undefined,
        numberOfPlaces: undefined,
        cost: undefined,
    }),
    methods: {
        submit() {
            this.$router.push({
                path: '/hotels/find',
                query: {
                    floor: this.floor,
                    numberOfPlaces: this.numberOfPlaces,
                    cost: this.cost,
                },
            });
        },
    },
};
