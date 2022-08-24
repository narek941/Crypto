export const parseChartLabels = (data: any, key: string, value: string) => {
  let others = 0;
  const label = [];
  const othersID = [];

  data.map((asset: any) => {
    if (asset[value] >= 1) {
      label.push({
        id: asset['id'],
        key: asset[key],
        value: Number(asset[value]).toFixed(0),
      });
    } else {
      others = others + Number(asset[value]);
      othersID.push(asset.id);
    }
  });
  label.push({ key: 'Others', value: others.toFixed(0) });
  return label;
};
