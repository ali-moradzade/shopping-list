import {describe, expect, it} from "vitest";
import {replaceRecipesValidator} from "./recipes.validator";
import {ValidationChain} from "express-validator";

function testCheckerUtil(message: string, body: any, validator: ValidationChain) {
    it(message, async () => {
        // Arrange
        const req = {
            body,
        };

        // Act
        const result = await validator.run(req);

        // Assert
        expect(result.context.errors.length).not.toEqual(0);
    });
}

describe('recipes.validator', () => {
    const recipesValidator = replaceRecipesValidator[0];
    const recipesNameValidator = replaceRecipesValidator[1];
    const recipesDescriptionValidator = replaceRecipesValidator[2];
    const recipesImagePathValidator = replaceRecipesValidator[3];
    const recipesIngredientsValidator = replaceRecipesValidator[4];
    const recipesIngredientsNameValidator = replaceRecipesValidator[5];
    const recipesIngredientsAmountValidator = replaceRecipesValidator[6];

    describe('recipes', () => {
        testCheckerUtil(
            'recipes should be an array',
            {
                recipes: 'hello!',
            },
            recipesValidator,
        );
    });

    describe('recipes.*.name', () => {
        testCheckerUtil(
            'recipes.*.name should not be empty',
            {
                recipes: [
                    {
                        name: '',
                    }
                ],
            },
            recipesNameValidator,
        );
    });

    describe('recipes.*.description', () => {
        testCheckerUtil(
            'recipes.*.description should not be empty',
            {
                recipes: [
                    {
                        description: '',
                    }
                ],
            },
            recipesDescriptionValidator,
        );
    });

    describe('recipes.*.imagePath', () => {
        testCheckerUtil(
            'recipes.*.imagePath should be a valid url',
            {
                recipes: [
                    {
                        imagePath: 'invalid-url',
                    }
                ],
            },
            recipesImagePathValidator,
        );
    });

    describe('recipes.*.ingredients', () => {
        testCheckerUtil(
            'recipes.*.ingredients should be an array',
            {
                recipes: [
                    {
                        ingredients: 'hello world!',
                    }
                ],
            },
            recipesIngredientsValidator,
        );
    });

    describe('recipes.*.ingredients.*.name', () => {
        testCheckerUtil(
            'recipes.*.ingredients.*.name should not be empty',
            {
                recipes: [
                    {
                        ingredients: [
                            {
                                name: '',
                            },
                        ],
                    },
                ],
            },
            recipesIngredientsNameValidator,
        );
    });

    describe('recipes.*.ingredients.*.amount', () => {
        testCheckerUtil(
            'recipes.*.ingredients.*.amount should be a number',
            {
                recipes: [
                    {
                        ingredients: [
                            {
                                amount: 'hello world',
                            },
                        ],
                    },
                ],
            },
            recipesIngredientsAmountValidator,
        );
    });
});
