import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';
import { UserAccount } from './user_account/schema/user_account.schema';
import { Recipe } from './recipe/schema/recipe.schema';
import { Step } from './step/schema/step.schema';
import { RecipePost } from './recipe_post/schema/recipe_post.schema';
import { Comment } from './comment/schema/comment.schema';
import { Reaction } from './reaction/schema/reaction.schema';
import { Rating } from './rating/schema/rating.schema';
import { Ingredient } from './ingredient/schema/ingredient.schema';

function generateUserAccounts(count: number): UserAccount[] {
  return Array.from({ length: count }).map(() => ({
    _id: new Types.ObjectId(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    passwordHash: faker.internet.password(),
    avatar: faker.image.avatar(),
    bio: faker.lorem.sentence(),
    createdAt: faker.date.past(),
  }));
}

function generateRecipes(count: number, userIds: Types.ObjectId[]): Recipe[] {
  return Array.from({ length: count }).map(() => {
    const words = faker.lorem.words(3).split(' ');
    return {
      _id: new Types.ObjectId(),
      userId: faker.helpers.arrayElement(userIds),
      title: words.join(' '),
      description: faker.lorem.sentence(),
      timeCook: faker.number.int({ min: 10, max: 120 }),
      difficult: faker.helpers.arrayElement([
        'easy',
        'normal',
        'medium',
        'hard',
        'expert',
      ]),
      calo: faker.number.int({ min: 100, max: 1000 }),
      status: faker.lorem.word(),
      createdAt: faker.date.past(),
    };
  });
}

function generateSteps(count: number, recipeIds: Types.ObjectId[]): Step[] {
  return Array.from({ length: count }).map(() => ({
    _id: new Types.ObjectId(),
    recipeId: faker.helpers.arrayElement(recipeIds),
    stepNumber: faker.number.int({ min: 1, max: 10 }),
    instruction: faker.lorem.sentence(),
  }));
}

function generateRecipePosts(
  count: number,
  userIds: Types.ObjectId[],
  recipeIds: Types.ObjectId[],
): RecipePost[] {
  return Array.from({ length: count }).map(() => ({
    _id: new Types.ObjectId(),
    userId: faker.helpers.arrayElement(userIds),
    recipeId: faker.helpers.arrayElement(recipeIds),
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past(),
  }));
}

function generateComments(
  count: number,
  userIds: Types.ObjectId[],
  recipePostIds: Types.ObjectId[],
): Comment[] {
  return Array.from({ length: count }).map(() => ({
    _id: new Types.ObjectId(),
    userId: faker.helpers.arrayElement(userIds),
    recipePostId: faker.helpers.arrayElement(recipePostIds),
    parentId: null, // Hoặc một comment khác
    content: faker.lorem.sentence(),
    createdAt: faker.date.past(),
  }));
}

function generateReactions(
  count: number,
  userIds: Types.ObjectId[],
  recipePostIds: Types.ObjectId[],
): Reaction[] {
  return Array.from({ length: count }).map(() => ({
    _id: new Types.ObjectId(),
    userId: faker.helpers.arrayElement(userIds),
    recipePostId: faker.helpers.arrayElement(recipePostIds),
    status: faker.datatype.boolean(),
    createdAt: faker.date.past(),
  }));
}

function generateRatings(
  count: number,
  userIds: Types.ObjectId[],
  recipePostIds: Types.ObjectId[],
): Rating[] {
  return Array.from({ length: count }).map(() => ({
    _id: new Types.ObjectId(),
    userId: faker.helpers.arrayElement(userIds),
    recipePostId: faker.helpers.arrayElement(recipePostIds),
    rate: faker.number.int({ min: 1, max: 5 }),
  }));
}

function generateIngredients(count: number): Ingredient[] {
  return Array.from({ length: count }).map(() => ({
    _id: new Types.ObjectId(),
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    img: 'https://picsum.photos/300/300',
    calo: faker.number.int({ min: 1, max: 100 }),
  }));
}

const userAccounts = generateUserAccounts(10);
const recipes = generateRecipes(
  5,
  userAccounts.map((user) => user._id),
);
const steps = generateSteps(
  10,
  recipes.map((recipe) => recipe._id),
);
const recipePosts = generateRecipePosts(
  3,
  userAccounts.map((user) => user._id),
  recipes.map((recipe) => recipe._id),
);
const comments = generateComments(
  5,
  userAccounts.map((user) => user._id),
  recipePosts.map((post) => post._id),
);
const reactions = generateReactions(
  10,
  userAccounts.map((user) => user._id),
  recipePosts.map((post) => post._id),
);
const ratings = generateRatings(
  5,
  userAccounts.map((user) => user._id),
  recipePosts.map((post) => post._id),
);
const ingredients = generateIngredients(10);

console.log({
  userAccounts,
  recipes,
  steps,
  recipePosts,
  comments,
  reactions,
  ratings,
  ingredients,
});
