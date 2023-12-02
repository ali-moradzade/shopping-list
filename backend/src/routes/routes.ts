import {Router} from "express";
import {AuthController} from "../controllers/auth.controller";
import {RecipesController} from "../controllers/recipes.controller";
import {loginValidator, signupValidator} from "../validators/auth.validator";
import {createRecipeValidator, replaceRecipesValidator} from "../validators/recipes.validator";

export const router = Router();

router.post('/auth/signup', signupValidator, AuthController.signup);
router.post('/auth/login', loginValidator, AuthController.login);

router.get('/recipes', RecipesController.getRecipes);
router.post('/recipes', createRecipeValidator, RecipesController.createRecipe);
router.put('/recipes', replaceRecipesValidator, RecipesController.replaceRecipes);
