import { HttpService } from './http';
import { environment } from '../../env';

const getUserHotels = userId => {
    return HttpService.get(`${environment.baseUrl}/hotel/user/${userId}`);
};

const createHotel = hotel => {
    return HttpService.post(`${environment.baseUrl}/hotel`, hotel);
};

export const hotelService = {
    getUserHotels,
    createHotel,
};
