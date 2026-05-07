import api from './axiosConfig';

export const getRestaurants = () => api.get('/restaurants');
export const getMenu = (restaurantId) => api.get(`/menu/${restaurantId}`);
export const placeOrder = (data) => api.post('/orders', data);
export const getOrderById = (orderId) => api.get(`/orders/${orderId}`);