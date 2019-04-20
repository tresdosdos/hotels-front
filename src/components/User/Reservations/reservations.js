import { userActions } from '../../../store/modules/user/constants';
import { ICONS } from '../../../icons';

export default {
    name: 'reservations',
    data: () => ({
        rents: [],
        icons: ICONS,
    }),
    async mounted() {
        this.rents = await this.$store.dispatch(`user/${userActions.GET_TICKETS}`);
    },
    methods: {
        async uploadAvatar() {
            this.$store.dispatch(
                `user/${userActions.UPLOAD_AVATAR}`,
                this.$refs.pictureInput.file
            );
        },
        async deleteAvatar() {
            this.$store.dispatch(`user/${userActions.DELETE_AVATAR}`);
        },
    },
};
