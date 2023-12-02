import {Recipe} from "../models/recipe.model";

export class RecipesService {
    static async createRecipe(
        name: string,
        description: string,
        imagePath: string,
        ingredients: {
            name: string,
            amount: number,
        }[],
    ) {
        const recipe = new Recipe({
            name,
            description,
            imagePath,
            ingredients,
        });

        await recipe.save();

        return recipe.toJSON();
    }

    static async findRecipes() {
        const recipes = await Recipe.find({});

        return recipes.map(recipe => recipe.toJSON());
    }

    static async replaceRecipes(
        recipes: {
            name: string;
            description: string;
            imagePath: string;
            ingredients: {
                name: string;
                amount: number;
            }[]
        }[]
    ) {
        await Recipe.deleteMany({});

        const newRecipes = await Recipe.insertMany(recipes);
        return newRecipes.map(recipe => recipe.toJSON());
    }
}
