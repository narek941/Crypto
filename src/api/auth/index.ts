import { client } from 'api';

export const signInRequest = (restCredentials: any) => client.post('/auth/login', restCredentials);
