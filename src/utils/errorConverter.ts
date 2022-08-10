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

export const parseAddUserError = (message: string): any => {
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
