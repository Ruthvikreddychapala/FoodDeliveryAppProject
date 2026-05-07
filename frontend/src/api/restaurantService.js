import api from './axiosConfig';

export const getRestaurantOrders = () => api.get('/restaurant/orders');
export const acceptOrder = (id) => api.patch(`/order/${id}/accept`);
export const rejectOrder = (id) => api.patch(`/order/${id}/reject`);
export const addMenuItem = (data) => api.post('/menu', data);
export const deleteMenuItem = (id) => api.delete(`/menu/${id}`);
