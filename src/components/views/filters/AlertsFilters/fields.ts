import { AlertsTypeOptions } from 'utils/filterHelper';

import { FormField } from '../../../forms/types';

import { FilterFormShape } from './types';

export const filterFormFields: FormField<keyof FilterFormShape> = {
  alertCreationDate: {
    name: 'selectAlertCreationDate',
    id: 'filterForm.alertCreationDate',
    placeholder: 'Select Alert time',
  },

  alertType: {
    name: 'alertType',
    type: 'select',
    id: 'filterForm.alertType',
    placeholder: 'Select Alerts Trigger',
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
  alertName: {
    name: 'alertName',
    type: 'Search',
    id: 'filterForm.alertName',
    placeholder: 'Enter Name',
  },
};

export const filterSchemaKeys = Object.keys(filterFormFields) as (keyof FilterFormShape)[];
