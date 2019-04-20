import { HttpService } from './http.service';
import { environment } from '../../env';

const getByToken = function() {
    return HttpService.get(`${environment.baseUrl}/user`);
};

const uploadAvatar = function(inputFile) {
    const file = new FormData();
    file.append('file', inputFile);
    return HttpService.post(`${environment.baseUrl}/user/avatar`, file, {
        headers: {
            'content-type': 'multipart/form-data',
        },
    });
};

const deleteAvatar = function(id) {
    return HttpService.post(`${environment.baseUrl}/user/avatar`, { id });
};

const getTickets = () => {
    return HttpService.get(`${environment.baseUrl}/rent/user`);
};

export const userService = {
    getByToken,
    uploadAvatar,
    deleteAvatar,
    getTickets,
};
