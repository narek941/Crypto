import { client } from 'api';

export const alertListRequest = (params: any) => client.get('/alerts', { params });
