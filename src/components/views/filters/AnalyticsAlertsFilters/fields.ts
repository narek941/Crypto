import { AlertsTypeOptions } from 'utils/filterHelper';

import { FormField } from '../../../forms/types';

import { FilterFormShape } from './types';

export const filterFormFields: FormField<keyof FilterFormShape> = {
  alertCreationDate: {
    name: 'selectAlertCreationDate',
    id: 'filterForm.alertCreationDate',
    placeholder: 'Select Alert Time',
    tooltip: 'alert_time',
  },

  alertType: {
    name: 'alertType',
    type: 'Select',
    id: 'filterForm.alertType',
    placeholder: 'Select Alerts Trigger',
    options: AlertsTypeOptions,
    tooltip: 'alert_type',
  },

  alertID: {
    name: 'alertID',
    type: 'Search',
    id: 'filterForm.alertID',
    placeholder: 'Enter ID',
    tooltip: 'id',
  },
  alertMessage: {
    name: 'alertMessage',
    type: 'Search',
    id: 'filterForm.alertMessage',
    placeholder: 'Enter Message',
    tooltip: 'alert_message',
  },
};

export const filterSchemaKeys = Object.keys(filterFormFields) as (keyof FilterFormShape)[];
