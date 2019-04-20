import { mapState } from 'vuex';
import { validationMixin } from 'vuelidate';
import { maxValue, minValue } from 'vuelidate/src/validators';
import { homeActions } from '../../store/modules/home/constants';

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
        ...mapState({
            cities: state => state.home.cities,
        }),
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
        city: undefined,
    }),
    mounted() {
        this.$store.dispatch(`home/${homeActions.GET_CITIES}`);
    },
    methods: {
        submit() {
            this.$v.$touch();

            if (
                this.floorErrors.length ||
                this.numberOfPlacesErrors.length ||
                this.costErrors.length
            ) {
                return;
            }

            this.$router.push({
                path: '/hotels/find',
                query: {
                    floor: this.floor,
                    numberOfPlaces: this.numberOfPlaces,
                    cost: this.cost,
                    city: this.city,
                },
            });
        },
    },
};
