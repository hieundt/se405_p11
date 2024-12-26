import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => {
  return {
    nodeEnv: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || '3000', 10),
    webSocketPort: parseInt(process.env.WEBSOCKET_PORT || '8080', 10),
    googleApiKey: process.env.GOOGLE_API_KEY,
  };
});
