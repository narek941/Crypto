import { client } from 'api';

export const alertListRequest = (params: any) => client.get('/alerts', { params });

export const alertsFilterValuesRequest = () => client.get(`alerts/filter-values`);
