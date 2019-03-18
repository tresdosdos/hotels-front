import Vue from 'vue';
import App from './components/App';
import router from './router';
import store from './store';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

import uiComponents from './ui-components';

Vue.config.productionTip = false;
Vue.use(Vuetify, {
    iconfont: 'mdi',
    components: uiComponents,
    theme: {
        primary: '#084A83',
        secondary: '#C6E5F3',
        accent: '#8c9eff',
        error: '#b71c1c',
    },
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
