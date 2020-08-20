export default {
  jwt: {
    secret: String(process.env.AUTH_SECRET),
    expiresIn: '4d',
  },
};
