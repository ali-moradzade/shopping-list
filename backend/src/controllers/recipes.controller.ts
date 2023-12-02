import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {RecipesService} from "../services/recipes.service";

export class RecipesController {
    static async getRecipes(req: Request, res: Response) {
        const recipes = await RecipesService.findRecipes();

        res.send({
            status: 200,
            recipes,
        });
    }

    static async createRecipe(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({
                status: 400,
                errors: errors.array(),
            });
        }

        const {
            name,
            description,
            imagePath,
            ingredients
        } = req.body as {
            name: string;
            description: string;
            imagePath: string;
            ingredients: {
                name: string;
                amount: number;
            }[]
        };

        const recipe = await RecipesService.createRecipe(
            name,
            description,
            imagePath,
            ingredients,
        );

        res.send({
            status: 200,
            recipe,
        });
    }

    static async replaceRecipes(req: Request, res: Response) {
        const recipes = req.body as {
            name: string;
            description: string;
            imagePath: string;
            ingredients: {
                name: string;
                amount: number;
            }[]
        }[];

        const result = await RecipesService.replaceRecipes(recipes);

        res.send({
            status: 200,
            recipes: result,
        });
    }
}
