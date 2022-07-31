import { FormField } from '../../../forms/types';

import { FilterFormShape } from './types';

export const sideOptions = [
  { label: 'BUY', value: 'BUY' },
  { label: 'SELL', value: 'SELL' },
];

export const filterFormFields: FormField<keyof FilterFormShape> = {
  alertCreationDate: {
    name: 'selectAlertCreationDate',
    id: 'filterForm.alertCreationDate',
    placeholder: 'Select Creation Time',
  },

  alertType: {
    name: 'alertType',
    type: 'Search',
    id: 'filterForm.alertType',
    placeholder: 'Alert Type',
  },

  alertID: {
    name: 'alertID',
    type: 'Search',
    id: 'filterForm.alertID',
    placeholder: 'Enter ID',
  },
  alertMessage: {
    name: 'alertMessage',
    type: 'Search',
    id: 'filterForm.alertMessage',
    placeholder: 'Enter Alert Message',
  },
};

export const filterSchemaKeys = Object.keys(filterFormFields) as (keyof FilterFormShape)[];
