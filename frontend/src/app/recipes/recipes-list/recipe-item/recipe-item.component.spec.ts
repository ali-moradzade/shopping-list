import {RecipeItemComponent} from "./recipe-item.component";
import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {RecipesModule} from "../../recipes.module";
import {Recipe} from "../../recipe.model";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute} from "@angular/router";

// TODO: make the following test work correctly
xdescribe('recipe-item.component', () => {
    let component: RecipeItemComponent;
    let fixture: ComponentFixture<RecipeItemComponent>;
    let el: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                RecipesModule,
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                ActivatedRoute,
            ],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(RecipeItemComponent);
                component = fixture.componentInstance;
                el = fixture.debugElement;
            });
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    xit('should display the recipe item properly', () => {
        // Arrange
        component.recipe = new Recipe(
            'name',
            'description',
            'https://www.google.com/image',
            [
                {
                    name: 'name',
                    amount: 1,
                }
            ]
        );
        component.index = 0;

        // Act
        fixture.detectChanges();
        const recipeName = el.query(By.css('a>div>h4')).nativeElement.textContent;

        // Assert
        console.log(recipeName);
    });
});
