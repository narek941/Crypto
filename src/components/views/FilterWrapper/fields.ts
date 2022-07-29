import { HandIcon, PercentIcon } from 'assets/icons';

import { FormField } from '../../forms/types';

import { FilterFormShape } from './types';

export const filterFormFields: FormField<keyof FilterFormShape> = {
  creationDate: {
    name: 'creationDate',
    type: 'DatePicker',
    id: 'filterForm.creationDate',
    placeholder: 'Choose creation date',
  },

  selectPair: {
    name: 'selectPair',
    type: 'DualSelect',
    id: 'filterForm.selectPair',
    placeholder: 'Select pairs',
  },

  selectSide: {
    name: 'selectSide',
    type: 'Select',
    id: 'filterForm.selectSide',
    placeholder: 'Select Side',
    options: [
      { label: 'BUY', value: 'BUY' },
      { label: 'SELL', value: 'SELL' },
    ],
  },
  selectValue: {
    name: 'selectValue',
    type: 'search',
    id: 'filterForm.selectValue',
    placeholder: 'Select Value',
  },

  searchID: {
    name: 'searchID',
    type: 'Search',
    id: 'filterForm.searchID',
    placeholder: 'Search BY ID',
  },

  creationTime: {
    name: 'creationTime',
    type: 'Calendar',
    id: 'filterForm.creationTime',
    placeholder: 'Search Created Time',
  },
  selectValueInBaseCurrency: {
    name: 'selectValueInBaseCurrency',
    type: 'select',
    id: 'filterForm.selectValueInBaseCurrency',
    placeholder: 'Select value, USDT',
  },
  searchReceived: {
    name: 'searchReceived',
    type: 'Search',
    id: 'filterForm.searchReceived',
    placeholder: 'Select Received',
  },
  searchReceivedInBaseCurrency: {
    name: 'searchReceivedInBaseCurrency',
    type: 'Search',
    id: 'filterForm.searchReceivedInBaseCurrency',
    placeholder: 'Select Received, USDT',
  },
  selectFee: {
    name: 'selectFee',
    type: 'select',
    id: 'filterForm.selectFee',
    placeholder: 'Select Fee',
    Icon: HandIcon,
  },
  selectFeeInBaseCurrency: {
    name: 'selectFeeInBaseCurrency',
    type: 'select',
    id: 'filterForm.selectFeeInBaseCurrency',
    placeholder: 'Select Fee, USDT',
    Icon: HandIcon,
  },
  selectShare: {
    name: 'selectShare',
    type: 'select',
    id: 'filterForm.selectShare',
    placeholder: 'Select Share',
    Icon: PercentIcon,
  },
  updateTime: {
    name: 'updateTime',
    type: 'Calendar',
    id: 'filterForm.updateTime',
    placeholder: 'Select updated time',
  },
  selectPairEnd: {
    name: 'selectPairEnd',
    type: 'select',
    id: 'filterForm.selectPairEnd',
    placeholder: 'Select ',
  },
  selectPairStart: {
    name: 'selectPairStart',
    type: 'select',
    id: 'filterForm.selectPairStart',
    placeholder: 'Select ',
  },
};

export const filterSchemaKeys = Object.keys(filterFormFields) as (keyof FilterFormShape)[];
