import {RecipeEditComponent} from "./recipe-edit.component";
import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {DebugElement, NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Recipe} from "../recipe.model";
import {RecipesModule} from "../recipes.module";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";

describe('recipe-edit.component', () => {
    let recipeService: any;

    let component: RecipeEditComponent;
    let fixture: ComponentFixture<RecipeEditComponent>;
    let el: DebugElement;
    let router: Router;
    let route: ActivatedRoute;

    const idParam = 123;
    const recipe = new Recipe(
        'recipe',
        'description',
        'https://www.google.com/image',
        [{
            name: 'ingredient',
            amount: 1,
        }],
    );

    beforeEach(waitForAsync(() => {
        recipeService = jasmine.createSpyObj('RecipeService', [
            'updateRecipe',
            'addRecipe',
            'getRecipe',
        ]);

        TestBed.configureTestingModule({
            imports: [
                RecipesModule,
                RouterTestingModule.withRoutes([]),
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                RecipeEditComponent,
                {
                    provide: RecipeService,
                    useValue: recipeService,
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({id: idParam}),
                    }
                }
            ]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(RecipeEditComponent);
                component = fixture.componentInstance;
                el = fixture.debugElement;
                router = TestBed.inject(Router);
                route = TestBed.inject(ActivatedRoute);
            });
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should set the id attribute properly based on id param', () => {
        // Arrange
        recipeService.getRecipe.and.returnValue(recipe);

        // Act
        fixture.detectChanges();

        // Assert
        expect(component.id).toEqual(idParam);
    });

    describe('should display the edit-recipes component properly', () => {
        it('recipeName, description, imagePath, ingredients->name&amount', () => {
            // Arrange
            recipeService.getRecipe.and.returnValue(recipe);

            // Act
            fixture.detectChanges();
            const recipeName = el.query(By.css('#recipeName')).nativeElement.value;
            const description = el.query(By.css('#description')).nativeElement.value;
            const imagePath = el.query(By.css('#imagePath')).nativeElement.value;
            const name = el.query(By.css('#name')).nativeElement.value;
            const amount = el.query(By.css('#amount')).nativeElement.value;

            // Assert
            expect(recipeName).toEqual(recipe.name);
            expect(description).toEqual(recipe.description);
            expect(imagePath).toEqual(recipe.imagePath);
            expect(name).toEqual(recipe.ingredients[0].name);
            expect(parseInt(amount)).toEqual(recipe.ingredients[0].amount);
        });
    });
});
