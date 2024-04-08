export default () => ({
  jwt: {
    accessToken: {
      secretKey: process.env.AUTH_JWT_ACCESS_TOKEN_SECRET_KEY,
      expiresIn: '1h',
    },
    refreshToken: {
      secretKey: process.env.AUTH_JWT_REFRESH_TOKEN_SECRET_KEY,
      expiresIn: '7d',
    },
  },
});
