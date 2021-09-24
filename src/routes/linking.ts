const config = {
  screens: {
    Splash: {
      path: 'splash/:id',
      parse: {
        id: (id: number) => `${id}`,
      },
    },
    ResetPassword: {
      path: 'reset/password/:token',
      parse: {
        token: (token: string) => `${token}`,
      },
    },
  },
};
const linking = {
  prefixes: ['cherry-go://app'],
  config,
};

export { linking };
