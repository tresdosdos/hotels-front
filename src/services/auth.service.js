import { HttpService } from './http';
import { environment } from '../../env';

const signIn = function(user) {
    return HttpService.post(`${environment.baseUrl}/user/signIn`, user);
};

const signUp = function(user) {
    return HttpService.post(`${environment.baseUrl}/user/signUp`, user);
};

const activateAccount = function() {
    return HttpService.put(`${environment.baseUrl}/user/activate`);
};

const update = function(user) {
    return HttpService.put(`${environment.baseUrl}/user`, user);
};

const sendResetEmail = function(email) {
    return HttpService.put(`${environment.baseUrl}/user/reset`, { email });
};

export const authService = {
    signIn,
    signUp,
    activateAccount,
    update,
    sendResetEmail,
};
