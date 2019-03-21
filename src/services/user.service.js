import { HttpService } from './http';
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

const deleteAvatar = function() {
    return HttpService.post(`${environment.baseUrl}/user/avatar`, undefined);
};

export const userService = {
    getByToken,
    uploadAvatar,
    deleteAvatar,
};
