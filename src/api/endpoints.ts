const endpoints = {
  AuthService: {
    signIn: (): string => '/signIn',
    signOut: (): string => '/signOut',
  },
  UserService: {
    addNewUser: (): string => '/users',
  },
  AccountService: {
    getAccountList: (): string => '/accounts',
  },
};

export default endpoints;
