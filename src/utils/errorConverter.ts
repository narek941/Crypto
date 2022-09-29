export const errorConverter = (message: string): string => {
  switch (message) {
    case 'ACCOUNT_HAS_BEEN_FROZEN':
      return 'Your account has been blocked';
    case 'Unauthorized':
      return '* Incorrect email or password';
    case 'SYNC_NOT_FINISHED':
      return 'Synchronization of account is not finished yet...';
    default:
      return message;
  }
};

export const parseAddUserError = (message: string): string | undefined | Record<string, string> => {
  if (message.includes('already exists')) {
    if (message.includes('email')) {
      return { email: '* User with this email already exists. Choose a different email' };
    } else if (message.includes('name')) {
      return { email: '* User with this name already exists. Choose a different name' };
    } else {
      return message;
    }
  }
};

export const parsePlatformName = (message: string): string => {
  if (message == 'Binance') {
    return 'Binance';
  } else if (message == 'BINANCE_FUTURES_USDTM') {
    return 'Binance USDT-M';
  } else if (message == 'BINANCE_FUTURES_COINM') {
    return 'Binance COIN-M';
  } else {
    return message;
  }
};
