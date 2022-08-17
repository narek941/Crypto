export const parseChartLabels = (data: any, key: string, value: string) => {
  let others = 0;
  const label = [];

  data.map((asset: any) => {
    if (asset[value] >= 1) {
      label.push({
        key: asset[key],
        value: Number(asset[value]).toFixed(3),
      });
    } else {
      others = others + Number(asset[value]);
    }
  });
  label.push({ key: 'others', value: others.toFixed(3) });
  return label;
};
