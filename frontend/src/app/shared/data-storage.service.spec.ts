import {TestBed} from "@angular/core/testing";
import {DataStorageService, GetRecipesResponse, recipesUrl} from "./data-storage.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('data-storage.service', () => {
  describe('mock-server', () => {
    let recipesService: any;
    let dataStorageService: DataStorageService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
      recipesService = jasmine.createSpyObj('RecipeService', ['getRecipes', 'setRecipes']);

      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
        ],
        providers: [
          DataStorageService, {
            provide: RecipeService,
            useValue: recipesService,
          }
        ]
      });

      dataStorageService = TestBed.inject(DataStorageService);
      httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should fetch recipes array', () => {
      // Arrange
      const body: {
        status: number;
        recipes: Recipe[];
      } = {
        status: 200,
        recipes: [
          {
            name: '1',
            description: 'description',
            imagePath: 'https://www.google.com/image',
            ingredients: [
              {
                name: 'name',
                amount: 1
              }
            ],
          },
        ]
      };

      // Act
      dataStorageService.fetchRecipes().subscribe((recipes: Recipe[]) => {
        // Assert
        expect(recipes).toBeDefined();
        expect(recipes.length).toEqual(1);
      });

      // Act
      const req = httpTestingController.expectOne(recipesUrl);
      req.flush(body);
    });
  });

  /**
   * Just enable these tests for when you think there is a breaking change in backed API
   * Disable thereafter because of heavy load in test time & resources
   */
  xdescribe('real-server', () => {
    let httpClient: HttpClient;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientModule,
        ],
      });

      httpClient = TestBed.inject(HttpClient);
    });

    describe('GET /recipes', () => {
      it('should match the format of response', (done) => {
        // Arrange
        const expectedResult: GetRecipesResponse = {
          status: 200,
          recipes: [],
        };

        // Act & Assert
        httpClient.get<GetRecipesResponse>(recipesUrl)
          .subscribe(result => {
            expect(result).toBeDefined();
            expect(result.status).toEqual(expectedResult.status);
            expect(result.recipes).toBeDefined();
            done();
          });
      });
    });
  });
});
