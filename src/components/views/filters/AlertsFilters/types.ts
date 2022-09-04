import { SubmitHandler } from 'react-hook-form';

export type FilterFormShape = {
  alertType: any;
  alertID: any;
  alertMessage: any;
  alertCreationDate: any;
  alertName: any;
};

export interface IFilterForm {
  onClick: SubmitHandler<FilterFormShape>;
}

export interface IAlertsFilterValue {
  minCreatedAt: any | null;
  maxCreatedAt: any | null;
}
