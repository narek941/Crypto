import { typeOptions } from 'utils/filterHelper';

import { FormField } from '../../forms/types';

import { AddInflowFormShape } from './types';

export const addInflowFormFields: FormField<keyof AddInflowFormShape> = {
  transactionType: {
    name: 'transactionType',
    type: 'select',
    label: 'Transaction Type',
    id: 'addInflow.transactionType',
    placeholder: 'Select from dropdown list',
    options: typeOptions,
  },
  coinName: {
    name: 'coinName',
    type: 'select',
    id: 'addInflow.coinName',
    label: 'Coin Name',
    placeholder: 'Select from dropdown list',
  },
  amount: {
    name: 'amount',
    type: 'text',
    label: 'Amount',
    id: 'addInflow.amount',
    placeholder: 'Enter asset amount',
  },

  fees: {
    name: 'fees',
    type: 'text',
    label: 'Fees',
    id: 'addInflow.fees',
    placeholder: 'Enter fees amount',
  },

  time: {
    name: 'time',
    id: 'addInflow.time',
    label: 'Time',
    placeholder: 'Select transaction date and time',
  },
  id: {
    name: 'time',
    id: 'addInflow.time',
    label: 'Time',
    placeholder: 'Select transaction date and time',
  },
  api: {
    name: 'time',
    id: 'addInflow.time',
    label: 'Time',
    placeholder: 'Select transaction date and time',
  },
};

export const addInflowSchemaKeys = Object.keys(addInflowFormFields) as (keyof AddInflowFormShape)[];
