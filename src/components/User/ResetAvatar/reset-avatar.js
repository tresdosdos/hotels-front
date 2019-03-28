import { mapGetters } from 'vuex';
import PictureInput from 'vue-picture-input';
import { userActions } from '../../../store/modules/user/constants';

export default {
    name: 'ResetAvatar',
    components: {
        'picture-input': PictureInput,
    },
    computed: {
        ...mapGetters('user', {
            avatar: 'avatar',
        }),
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
