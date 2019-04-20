import { HttpService } from './http.service';
import { environment } from '../../env';

const getHotels = params => {
    return HttpService.get(`${environment.baseUrl}/hotel`, { params });
};

const getCities = () => {
    return HttpService.get(`${environment.baseUrl}/hotel/cities`);
};

export const homeService = {
    getHotels,
    getCities,
};
