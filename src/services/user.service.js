import { HttpService } from './http';
import { environment } from '../../env';

const getByToken = async function() {
    return HttpService.get(`${environment.baseUrl}/user`);
};

export const userService = {
    getByToken,
};
