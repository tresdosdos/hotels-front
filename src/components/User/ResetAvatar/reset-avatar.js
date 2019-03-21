import { mapState } from 'vuex';
import PictureInput from 'vue-picture-input';
import { userService } from '../../../services/user.service';

export default {
    name: 'ResetAvatar',
    components: { PictureInput },
    computed: {
        ...mapState({
            avatar: state => state.user.data.avatar,
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
            const res = await userService.deleteAvatar();

            this.$store.dispatch('user/setData', res.data);
        },
    },
};
