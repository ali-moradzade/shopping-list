import {body, ValidationChain} from "express-validator";

export const createRecipeValidator: ValidationChain[] = [
    body('name', 'name should not be empty')
        .not()
        .isEmpty(),

    body('description', 'description should not be empty')
        .not()
        .isEmpty(),

    body('imagePath', 'imagePath should be a valid url')
        .not()
        .isEmpty()
        .isURL(),

    body('ingredients').isArray(),

    body('ingredients.*.name', 'ingredient name should not be empty')
        .not()
        .isEmpty(),

    body('ingredients.*.amount', 'ingredient amount should be a number').isNumeric(),
];

export const replaceRecipesValidator: ValidationChain[] = [
    body('recipes').isArray(),
    body('recipes.*.name', 'name should not be empty')
        .not()
        .isEmpty(),

    body('recipes.*.description', 'description should not be empty')
        .not()
        .isEmpty(),

    body('recipes.*.imagePath', 'imagePath should be a valid url')
        .not()
        .isEmpty()
        .isURL(),

    body('recipes.*.ingredients').isArray(),

    body('recipes.*.ingredients.*.name', 'ingredient name should not be empty')
        .not()
        .isEmpty(),

    body('recipes.*.ingredients.*.amount', 'ingredient amount should be a number')
        .isNumeric(),
];

