import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs";
import {APP_CONFIG} from "../../config";

export const recipesUrl = `${APP_CONFIG.backendUrl}${APP_CONFIG.recipes}`;

export interface GetRecipesResponse {
  status: number;
  recipes: Recipe[];
}

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipesService: RecipeService,
  ) {
  }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.httpClient
      .put(recipesUrl, recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.httpClient.get<GetRecipesResponse>(recipesUrl)
      .pipe(
        map(response => {
          const {recipes} = response;

          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap(recipes => {
          this.recipesService.setRecipes(recipes);
        })
      );
  }
}
