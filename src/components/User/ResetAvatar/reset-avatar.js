import { mapGetters } from 'vuex';
import PictureInput from 'vue-picture-input';
import { userService } from '../../../services/user.service';

export default {
    name: 'ResetAvatar',
    components: {
        'picture-input': PictureInput,
    },
    computed: {
        ...mapGetters('user', {
            avatar: 'avatar',
            avatarId: 'avatarId',
        }),
    },
    methods: {
        async uploadAvatar() {
            const res = await userService.uploadAvatar(
                this.$refs.pictureInput.file
            );

            this.$store.dispatch('user/setData', res.data);
        },
        async deleteAvatar() {
            const res = await userService.deleteAvatar(this.avatarId);

            this.$store.dispatch('user/setData', res.data);
        },
    },
};
