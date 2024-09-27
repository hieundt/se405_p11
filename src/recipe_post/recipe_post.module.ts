import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { RecipePost, RecipePostSchema } from './schema/recipe_post.schema';
import { RecipePostController } from './recipe_post.controller';
import { RecipePostService } from './recipe_post.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RecipePost.name, schema: RecipePostSchema },
    ]),
  ],
  controllers: [RecipePostController],
  providers: [RecipePostService],
})
export class RecipePostModule {}
