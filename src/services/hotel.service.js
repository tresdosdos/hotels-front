import { HttpService } from './http';
import { environment } from '../../env';

const getUserHotels = userId => {
    return HttpService.get(`${environment.baseUrl}/hotel/user/${userId}`);
};

const getById = id => {
    return HttpService.get(`${environment.baseUrl}/hotel/${id}`);
};

const createHotel = hotel => {
    return HttpService.post(`${environment.baseUrl}/hotel`, hotel);
};

const deleteHotel = id => {
    return HttpService.delete(`${environment.baseUrl}/hotel/${id}`);
};

const addRoom = room => {
    return HttpService.post(`${environment.baseUrl}/room`, room);
};

const updateHotel = hotel => {
    return HttpService.put(`${environment.baseUrl}/hotel`, hotel);
};

const uploadPhoto = (hotelId, inputFile) => {
    const file = new FormData();
    file.append('file', inputFile);

    return HttpService.post(
        `${environment.baseUrl}/hotel/${hotelId}/photo`,
        file,
        {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }
    );
};

const deleteRoom = id => {
    return HttpService.delete(`${environment.baseUrl}/room/${id}`);
};

export const hotelService = {
    getUserHotels,
    getById,
    createHotel,
    deleteHotel,
    addRoom,
    updateHotel,
    uploadPhoto,
    deleteRoom,
};
