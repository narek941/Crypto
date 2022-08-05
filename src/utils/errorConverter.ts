export const errorConverter = (message: string): string => {
  switch (message) {
    case 'ACCOUNT_HAS_BEEN_FROZEN':
      return 'Your account has been blocked';
    case 'Unauthorized':
      return '* Incorrect email or password';

    default:
      return message;
  }
};
