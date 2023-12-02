import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {RecipeService} from "./recipe.service";
import {TestBed} from "@angular/core/testing";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";

describe('recipe.service', () => {
  let recipeService: RecipeService;
  let shoppingListService: ShoppingListService;

  beforeEach(() => {
    shoppingListService = jasmine.createSpyObj('ShoppingListService', ['addIngredients']);

    TestBed.configureTestingModule({
      providers: [
        RecipeService, {
          provide: ShoppingListService,
          useValue: shoppingListService,
        },
      ],
    });

    recipeService = TestBed.inject(RecipeService);
  });

  it('should get recipes', () => {
    // Arrange & Act
    const recipes = recipeService.getRecipes();

    // Assert
    expect(recipes.length).toEqual(0);
  });

  it('should set recipes', () => {
    // Arrange
    const recipes: Recipe[] = [
      {
        name: '1',
        description: 'description',
        imagePath: 'https://www.google.com/image',
        ingredients: [
          {
            name: 'name',
            amount: 1,
          }
        ]
      },
      {
        name: '1',
        description: 'description',
        imagePath: 'https://www.google.com/image',
        ingredients: [
          {
            name: 'name',
            amount: 1,
          }
        ]
      }
    ];

    // Act
    recipeService.setRecipes(recipes);
    const result = recipeService.getRecipes();

    // Assert
    expect(result.length).toEqual(recipes.length);
  });

  it('should add ingredients to shopping list', () => {
    // Arrange
    const ingredients: Ingredient[] = [
      {
        name: '1',
        amount: 1,
      },
      {
        name: '2',
        amount: 2,
      },
    ];

    // Act
    recipeService.addIngredientsToShoppingList(ingredients);

    // Assert
    expect(shoppingListService.addIngredients).toHaveBeenCalledTimes(1);
  });
});
