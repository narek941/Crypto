import { useMemo } from 'react';

interface IOptionData {
  id: number;
  name: string;
}

export const createOptions = (data: IOptionData[]): any => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const options = useMemo(
    () =>
      data.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    [data],
  );
  return options;
};
