import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => {
  return {};
});
