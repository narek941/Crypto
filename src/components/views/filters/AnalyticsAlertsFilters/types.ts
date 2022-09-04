import { SubmitHandler } from 'react-hook-form';

export type FilterFormShape = {
  alertType: any;
  alertID: any;
  alertMessage: any;
  alertCreationDate: any;
};

export interface IFilterForm {
  onClick: SubmitHandler<FilterFormShape>;
}

export interface IAccountAlertsFilterValue {
  minCreatedAt: any | null;
  maxCreatedAt: any | null;
}
