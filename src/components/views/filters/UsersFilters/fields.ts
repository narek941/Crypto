import { FormField } from '../../../forms/types';

import { FilterFormShape } from './types';

export const filterFormFields: FormField<keyof FilterFormShape> = {
  userName: {
    name: 'userName',
    type: 'Search',
    id: 'filterForm.userName',
    placeholder: 'Enter Name',
  },

  userType: {
    name: 'userType',
    type: 'select',
    id: 'filterForm.userType',
    placeholder: 'Select Type',
  },
  userStatus: {
    name: 'userStatus',
    type: 'select',
    id: 'filterForm.userStatus',
    placeholder: 'Select Status',
  },

  userId: {
    name: 'userId',
    type: 'Search',
    id: 'filterForm.userId',
    placeholder: 'Enter ID',
  },

  userEmail: {
    name: 'userEmail',
    type: 'Search',
    id: 'filterForm.userEmail',
    placeholder: 'Enter Email',
  },
};

export const filterSchemaKeys = Object.keys(filterFormFields) as (keyof FilterFormShape)[];
