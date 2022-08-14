import { AlertsTypeOptions } from 'utils/filterHelper';

import { FormField } from '../../../forms/types';

import { FilterFormShape } from './types';

export const filterFormFields: FormField<keyof FilterFormShape> = {
  alertCreationDate: {
    name: 'selectAlertCreationDate',
    id: 'filterForm.alertCreationDate',
    placeholder: 'Select Creation Time',
  },

  alertType: {
    name: 'alertType',
    type: 'Select',
    id: 'filterForm.alertType',
    placeholder: 'Alert Type',
    options: AlertsTypeOptions,
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
