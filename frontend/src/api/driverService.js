import api from './axiosConfig';

export const getDriverOrders = () => api.get('/driver/orders');
export const updateStatus = (id, status) =>
  api.patch(`/order/${id}/status`, { status });