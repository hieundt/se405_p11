import { registerAs } from '@nestjs/config';

export const swaggerConfig = registerAs('swagger', () => {
  return {
    docTitle: process.env.SWAGGER_DOC_TITLE,
    docDescription: process.env.SWAGGER_DOC_DESCRIPTION,
    docVersion: process.env.SWAGGER_DOC_VERSION,
  };
});
