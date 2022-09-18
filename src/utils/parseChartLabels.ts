import { mergeObjects } from 'utils';

const parseChartLabels = (data: any, key: string, value: string) => {
  let all = 0;
  let others = 0;

  const label = [];
  const othersID: any[] = [];

  data.map((asset: any) => {
    if (asset[value] >= 1) {
      label.push({
        id: asset['id'],
        key: asset[key],
        value: Number(asset[value]).toFixed(2),
      });
      all = all + Number(asset[value]);
    } else {
      others = others + Number(asset[value]);
      othersID.push(asset);
    }
  });
  const othersSum = 100.0 - Number(all);
  if (othersSum > 0.01) {
    label.push({ key: 'Others', value: othersSum.toFixed(2) });
  } else if (othersSum > 0) {
    label.push({ key: 'Others', value: 0.01 });
  }
  return {
    label: label,
    others: mergeObjects(othersID),
  };
};
export default parseChartLabels;
