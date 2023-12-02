import {TestBed} from "@angular/core/testing";
import {ShoppingListService} from "./shopping-list.service";
import {Ingredient} from "../shared/ingredient.model";

describe('shopping-list.service', () => {
    let shoppingListService: ShoppingListService;
    const mockIngredient = new Ingredient('ingredient', 1);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ShoppingListService,
            ],
        });

        shoppingListService = TestBed.inject(ShoppingListService);
    });

    it('should get ingredients', () => {
        // Arrange & Act
        const ingredients = shoppingListService.getIngredients();

        // Assert
        expect(ingredients.length).toEqual(0);
    });

    it('should add ingredient', () => {
        // Arrange & Act
        shoppingListService.addIngredient(mockIngredient);
        const ingredients = shoppingListService.getIngredients();

        // Assert
        expect(ingredients.length).toEqual(1);
    });

    it('should update ingredient', () => {
        // Arrange
        const newIngredient = new Ingredient('updatedIngredient', 2);

        // Act
        shoppingListService.addIngredient(mockIngredient);
        shoppingListService.updateIngredient(0, newIngredient);
        const result = shoppingListService.getIngredient(0);

        // Assert
        expect(result).toBeDefined();
        expect(result.name).toEqual(newIngredient.name);
        expect(result.amount).toEqual(newIngredient.amount);
    });

    it('should delete an ingredient', () => {
        // Arrange
        const ingredient = new Ingredient('ingredient', 1);

        // Act
        shoppingListService.addIngredient(ingredient);
        shoppingListService.deleteIngredient(0);
        const result = shoppingListService.getIngredients();

        // Assert
        expect(result.length).toEqual(0);
    });
});
