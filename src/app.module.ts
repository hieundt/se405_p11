import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfig, jwtConfig, mongoConfig, swaggerConfig } from './config';
import { UserAccountModule } from './user_account/user_account.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    RecipeModule,
    UserAccountModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig, swaggerConfig, mongoConfig],
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get('mongo.host');
        const dbname = configService.get('mongo.dbname');
        const username = configService.get('mongo.username');
        const password = configService.get('mongo.password');
        return {
          uri: `mongodb+srv://${username}:${password}@${host}`,
          dbName: dbname,
        };
      },
    }),
  ],
})
export class AppModule {}
