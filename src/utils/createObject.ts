interface Obj {
  createdAt: string;
  type: string;
  id: string;
  message: string;
  asset: string;
  value: string;
  valueInBaseCurrency: string;
  creationDate: string;
  pair: string;
  side: string;
  received: string;
  receivedInBaseCurrency: string;
  fee: string;
  feeInBaseCurrency: string;
  share: string;
  updatedTime: string;
  coinsPair: string;
  lastOperationTime: string;
  stopPrice: string;
  limitPrice: string;
  tradeTime: string;
  price: string;
  totalPrice: string;
  amount: string;
  modifiers: string;
  fees: string;
  feesInBaseCurrency: string;
  coin: string;
}

const createObject = (key: string, value: any) => {
  const filter: any = {};

  filter[key as keyof Obj] = value === '' ? undefined : key === 'id' ? Number(value) : value;
  return filter;
};
export default createObject;
