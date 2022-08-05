import { FormField } from '../../../forms/types';

import { FilterFormShape } from './types';

export const filterFormFields: FormField<keyof FilterFormShape> = {
  accountName: {
    name: 'accountName',
    type: 'Search',
    id: 'filterForm.accountName',
    placeholder: 'Enter Name',
  },

  accountStatus: {
    name: 'accountStatus',
    type: 'select',
    id: 'filterForm.accountStatus',
    placeholder: 'Select Status',
  },
  accountAVGTrades: {
    name: 'accountAVGTrades',
    type: 'select',
    id: 'filterForm.accountAVGTrades',
    placeholder: 'Enter Avg. Trades',
  },
  accountId: {
    name: 'accountId',
    type: 'Search',
    id: 'filterForm.accountId',
    placeholder: 'Enter ID',
  },

  accountSeed: {
    name: 'accountSeed',
    type: 'select',
    id: 'filterForm.accountSeed',
    placeholder: 'Enter Seed Capital',
  },
  accountCurrentCapital: {
    name: 'accountCurrentCapital',
    type: 'Search',
    id: 'filterForm.accountCurrentCapital',
    placeholder: 'Enter Current Capital',
  },
  accountOpenProfit: {
    name: 'accountOpenProfit',
    type: 'Search',
    id: 'filterForm.accountOpenProfit',
    placeholder: 'Enter Open Profit',
  },
  accountEarnedCapital: {
    name: 'accountEarnedCapital',
    type: 'Search',
    id: 'filterForm.accountEarnedCapital',
    placeholder: 'Enter Earned Capital',
  },
};

export const filterSchemaKeys = Object.keys(filterFormFields) as (keyof FilterFormShape)[];
