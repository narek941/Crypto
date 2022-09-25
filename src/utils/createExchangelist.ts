import { BinanceSpotIcon } from 'assets/icons';

const createExchangeList = (data: any[]) => {
  data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      Icon: BinanceSpotIcon,
    };
  });
};

export default createExchangeList;
