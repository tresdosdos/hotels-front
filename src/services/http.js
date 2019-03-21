import axios from 'axios';
import store from '../store';
import router from '../router';
import { SNACKBAR_COLORS } from '../store/modules/snackbar/snackbar-options';

export class HttpService {
    static token = localStorage.getItem('access_token');

    static getToken() {
        return localStorage.getItem('access_token');
    }

    static setToken(token) {
        localStorage.setItem('access_token', token);
        HttpService.token = token;
    }

    static removeToken() {
        localStorage.removeItem('access_token');
        HttpService.token = null;
    }

    static get(url, options) {
        return HttpService.makeRequest({
            url,
            method: 'get',
            ...options,
        });
    }

    static post(url, data, options) {
        return HttpService.makeRequest({
            url,
            method: 'post',
            data,
            ...options,
        });
    }

    static put(url, data, options) {
        return HttpService.makeRequest({
            url,
            method: 'put',
            data,
            ...options,
        });
    }

    static delete(url, data, options) {
        return HttpService.makeRequest({
            url,
            method: 'delete',
            data,
            ...options,
        });
    }

    static makeRequest(config) {
        store.dispatch('spinner/start');
        const source = axios.CancelToken.source();
        const cancelToken = source.token;
        const token = HttpService.getToken();

        if (token) {
            config.headers = Object.assign(config.headers || {}, {
                Authorization: token,
            });
        }

        return axios
            .request({ ...config, cancelToken })
            .then(res => {
                store.dispatch('spinner/stop');
                HttpService.setToken(res.headers.authorization);

                return res;
            })
            .catch(e => {
                const { response } = e;

                store.dispatch('spinner/stop');
                store.dispatch('snackbar/show', {
                    message: response.data.message,
                    color: SNACKBAR_COLORS.error,
                });

                if (response && response.status === 401) {
                    this.removeToken();
                    router.push('/sign-in');

                    throw response.data;
                }

                if (response) {
                    throw response.data;
                }

                throw response.data;
            });
    }
}
