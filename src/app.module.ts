/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfig, jwtConfig, mongoConfig, swaggerConfig, emailConfig } from './config';
import { RecipeModule } from './api/recipe/recipe.module';
import { IngredientModule } from './api/ingredient/ingredient.module';
import { StepModule } from './api/step/step.module';
import { RecipePostModule } from './api/recipe_post/recipe_post.module';
import { RatingModule } from './api/rating/rating.module';
import { ReactionModule } from './api/reaction/reaction.module';
import { CommentModule } from './api/comment/comment.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig, swaggerConfig, mongoConfig, emailConfig],
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
          uri: `mongodb+srv://${username}:${password}@${host}/?retryWrites=true&w=majority&appName=Cluster0`,
          dbName: dbname,
        };
      },
    }),
    UserModule,
    RatingModule,
    IngredientModule,
    StepModule,
    RecipePostModule,
    ReactionModule,
    RecipeModule,
    CommentModule,
    // TODO: UNCOMMENT MODULES
  ],
})
export class AppModule {}
