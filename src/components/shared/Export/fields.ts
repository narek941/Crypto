import { FormField } from '../../forms/types';

import { ExportFormShape } from './types';

export const exportFormFields: FormField<keyof ExportFormShape> = {
  exportDateEnd: {
    name: 'exportDateEnd',
    id: 'addUser.exportDateEnd',
  },
  exportDateStart: {
    name: 'exportDateStart',
    id: 'addUser.exportDateStart',
  },
  exportDate: {
    name: 'exportDate',
    id: 'addUser.exportDate',
  },
};

export const exportSchemaKeys = Object.keys(exportFormFields) as (keyof ExportFormShape)[];
