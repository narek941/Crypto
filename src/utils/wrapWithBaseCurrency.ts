const wrapWithBaseCurrency = (value: string, baseCurrency = 'USDT') => `${value}, ${baseCurrency}`;

export default wrapWithBaseCurrency;
