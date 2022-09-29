import { useMemo } from 'react';

import { IOptionData, IOptionList } from 'types';

import { parsePlatformName } from './errorConverter';

export const createOptions = (data: IOptionData[]): IOptionList[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const options = useMemo(
    () =>
      data.map((item) => ({
        label: parsePlatformName(item.name),
        value: item.id,
      })),
    [data],
  );
  return options;
};
