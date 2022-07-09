import {SWRConfiguration, SWRResponse} from 'swr';
import {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';

export type GetRequest = AxiosRequestConfig | null;

export interface IUseRequestReturn<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'error' | 'mutate'
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
}

export interface IConfig<Data = unknown, Error = unknown>
  extends Omit<
    SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
    'fallbackData'
  > {
  fallbackData?: Data;
}
