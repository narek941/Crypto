import { client } from 'api';

export const addNewUserRequest = (newUser: any) => client.post('/users', newUser);
