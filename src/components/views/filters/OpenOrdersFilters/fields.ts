import { HandIcon } from 'assets/icons';
import { sideOptions } from 'utils/filterHelper';

import { FormField } from '../../../forms/types';

import { FilterFormShape } from './types';

export const filterFormFields: FormField<keyof FilterFormShape> = {
  creationDate: {
    name: 'selectCreationDate',
    id: 'filterForm.creationDate',
    placeholder: 'Select Created At',
    tooltip: 'creation_date_and_time',
  },

  updatedTime: {
    name: 'selectUpdatedTime',
    id: 'filterForm.updatedTime',
    placeholder: 'Select Updated',
    tooltip: 'creation_date_and_time',
  },

  selectPair: {
    name: 'selectPair',
    type: 'DualSelect',
    id: 'filterForm.selectPair',
    placeholder: 'Select Pair',
    tooltip: 'coin_pair_name',
  },

  selectSide: {
    name: 'selectSide',
    type: 'Select',
    id: 'filterForm.selectSide',
    placeholder: 'Select Side',
    options: sideOptions,
    tooltip: 'side',
  },
  selectValue: {
    name: 'selectValue',
    id: 'filterForm.selectValue',
    placeholder: 'Select Value',
  },

  searchID: {
    name: 'searchID',
    type: 'Search',
    id: 'filterForm.searchID',
    placeholder: 'Enter ID',
    tooltip: 'id',
  },

  creationTime: {
    name: 'selectCreationTime',
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
    type: 'select',
    id: 'filterForm.searchReceived',
    placeholder: 'Select Received',
    tooltip: 'received',
  },
  searchReceivedInBaseCurrency: {
    name: 'searchReceivedInBaseCurrency',
    type: 'Search',
    id: 'filterForm.searchReceivedInBaseCurrency',
    placeholder: 'Select Received, USDT',
    tooltip: 'received_in_base_currency',
  },
  selectFee: {
    name: 'selectFee',
    type: 'select',
    id: 'filterForm.selectFee',
    placeholder: 'Select Fee',
    Icon: HandIcon,
    tooltip: 'fees',
  },
  selectFeeInBaseCurrency: {
    name: 'selectFeeInBaseCurrency',
    type: 'select',
    id: 'filterForm.selectFeeInBaseCurrency',
    placeholder: 'Select Fee, USDT',
    Icon: HandIcon,
    tooltip: 'fees_in_base_currency',
  },
  selectShare: {
    name: 'selectShare',
    type: 'select',
    id: 'filterForm.selectShare',
    placeholder: 'Select Share',
    tooltip: 'share',
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
