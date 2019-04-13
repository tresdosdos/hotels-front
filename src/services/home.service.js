import { HttpService } from './http.service';
import { environment } from '../../env';

const getHotels = params => {
    return HttpService.get(`${environment.baseUrl}/hotel`, { params });
};

export const homeService = {
    getHotels,
};
