import {afterAll, beforeAll, beforeEach, describe, expect, it} from "vitest";
import {DB_CONFIG} from "../config";
import {connectToDb, disconnectFromDB, dropDatabase} from "./db";
import {RecipesService} from "./recipes.service";
import {Recipe} from "../models/recipe.model";

beforeAll(async () => {
    DB_CONFIG.name = 'testDB';

    await connectToDb();
});

beforeEach(async () => {
    await dropDatabase(DB_CONFIG.name);
});

afterAll(async () => {
    await dropDatabase(DB_CONFIG.name);
    await disconnectFromDB();
});

describe('recipes.service', () => {
    describe('findRecipes', () => {
        it('should return all existing recipes', async () => {
            // Arrange
            const names = ['r1', 'r2'];
            for (const name of names) {
                const recipe = new Recipe(
                    {
                        name,
                        description: 'description',
                        imagePath: 'https://google.com/image',
                        ingredients: [{
                            name: 'name1',
                            amount: 1,
                        }],
                    }
                );

                await recipe.save();
            }
            const expectedLength = names.length;

            // Act
            const recipes = await RecipesService.findRecipes();

            // Assert
            expect(recipes.length).toEqual(expectedLength);
        });
    });

    describe('createRecipe', () => {
        it('should create a recipe', async () => {
            // Arrange
            const recipe = await RecipesService.createRecipe(
                'recipe1',
                'description',
                'imagePath',
                [{
                    name: 'name1',
                    amount: 1,
                }],
            );
            const expectedLength = 1;

            // Act
            const recipes = await RecipesService.findRecipes();

            // Assert
            expect(recipes.length).toEqual(expectedLength);
        });
    });

    describe('replaceRecipes', () => {
        it('should replace new array of recipes', async () => {
            // Arrange
            const recipe = new Recipe({
                name: 'prev-recipe1',
                description: 'prev-description',
                imagePath: 'prev-imagePath',
                ingredients: [{
                    name: 'prev-name1',
                    amount: 1,
                }],
            });
            await recipe.save();

            const newRecipes = [
                {
                    name: 'recipe1',
                    description: 'description',
                    imagePath: 'imagePath',
                    ingredients: [{
                        name: 'name',
                        amount: 1,
                    }],
                },
                {
                    name: 'recipe1',
                    description: 'description',
                    imagePath: 'imagePath',
                    ingredients: [{
                        name: 'name',
                        amount: 1,
                    }],
                },
            ];

            // Act
            const result = await RecipesService.replaceRecipes(newRecipes);

            // Assert
            expect(result.length).toEqual(newRecipes.length);
        });
    });
});
