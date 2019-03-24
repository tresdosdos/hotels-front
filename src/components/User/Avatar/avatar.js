import { mapGetters } from 'vuex';

export default {
    name: 'Avatar',
    props: {
        size: {
            type: String,
            required: true,
        },
        quality: {
            type: String,
            required: true,
            validator: value => ['full', 'hd'].indexOf(value) !== -1,
        },
    },
    computed: {
        ...mapGetters('user', {
            isAuthorized: 'isAuthorized',
            firstLetter: 'firstLetter',
            avatar: 'avatar',
            avatarHD: 'avatarHD',
        }),
    },
};
