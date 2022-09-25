import { useMemo } from 'react';

import { IOptionData, IOptionList } from 'types';

export const createOptions = (data: IOptionData[]): IOptionList[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const options = useMemo(
    () =>
      data.map((item) => ({
        label: item.name.replace('_', ' '),
        value: item.id,
      })),
    [data],
  );
  return options;
};
