import { registerAs } from '@nestjs/config';

// This kind of data is usually stored in a .env file
// For the sake of simplicity, we are hardcoding the values here
// In a real-world scenario, you should always use environment variables

const ONE_HOUR = 3600;

export default registerAs('jwt', () => {
  return {
    secret: 'YOU_SECRET_KEY',
    audience: 'localhost:3000',
    issuer: 'localhost:3000',
    accessTokenTtl: ONE_HOUR,
  };
});
