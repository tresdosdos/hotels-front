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

const resetPassword = function(password) {
    return HttpService.put(`${environment.baseUrl}/user`, { password });
};

export const authService = {
    signIn,
    signUp,
    activateAccount,
    resetPassword,
};
