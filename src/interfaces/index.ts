export type RATING = 1 | 2 | 3 | 4 | 5;
export type DIFFICULT = 1 | 2 | 3 | 4 | 5;
export type UNIT = 'kg' | 'g' | 'ml' | 'l' | 'cup' | 'tbsp' | 'tsp' | 'pcs';

// export interface IUser {
//   _id: string;
//   email: string;
//   password: string;
//   isActive: boolean;
//   username?: string;
//   avatar?: string;
//   bio?: string;
//   createAt?: Date;
// }

// export interface IGroup {
//   _id: string;
//   admin: IUser;
//   name: string;
//   description: string;
//   memberList: IUser[];
//   createAt?: Date;
// }

// export interface IComment {
//   _id: string;
//   user: IUser;
//   isParent: boolean;
//   parentId: string; // Empty if isParent = true
//   content: string;
//   createAt?: Date;
// }

// export interface IReaction {
//   _id: string;
//   user: IUser;
//   status: boolean;
//   createAt?: Date;
// }

// export interface IRecipePost {
//   _id: string;
//   user: IUser;
//   title: string;
//   recipeList: IRecipe[];
//   description: string;
//   commentList: IComment[];
//   reactionList: IReaction[];
//   createAt?: Date;
// }

// export interface IRecipe {
//   _id: string;
//   userId: string;
//   title: string;
//   timeCook: number;
//   difficult: DIFFICULT;
//   ingredientList: IIngredient[];
//   ratingList: IRating[];
//   stepList: IStep[];
//   caloTotal: number;
//   description?: string;
//   img?: string;
//   createAt?: Date;
// }

// export interface IIngredient {
//   _id: string;
//   img: string;
//   name: string;
//   calo: number;
//   unit: UNIT;
//   createAt?: Date;
// }

// export interface IRating {
//   _id: string;
//   userId: string;
//   user?: IUser;
//   recipePostId: string;
//   rating: RATING;
//   createAt?: Date;
// }

// export interface IStep {
//   _id: string;
//   source: string;
//   stepNumber: number;
//   instruction: string;
// }
