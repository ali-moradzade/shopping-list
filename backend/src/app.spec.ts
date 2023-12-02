import {app} from "./app";
import {afterAll, beforeAll, beforeEach, describe, expect, it,} from "vitest";
import request from 'supertest';
import {connectToDb, disconnectFromDB, dropDatabase} from "./services/db";
import {DB_CONFIG} from "./config";
import {User} from "./models/user.model";
import {Recipe} from "./models/recipe.model";

beforeAll(async () => {
    DB_CONFIG.name = 'test';

    await connectToDb();
    await dropDatabase(DB_CONFIG.name);
});

afterAll(async () => {
    await dropDatabase(DB_CONFIG.name);
    await disconnectFromDB();
});

function generateUserData() {
    return {
        email: 'email@email.com',
        password: 'password'
    };
}

function generateRecipes(recipesNum = 1) {
    const recipes = [];
    for (let i = 0; i < recipesNum; i++) {
        const name = `Recipe ${i}`;
        recipes.push({
            name,
            description: 'description',
            imagePath: 'https://www.googe.com/image',
            ingredients: [
                {
                    name: 'Meat',
                    amount: 1,
                },
                {
                    name: 'French Fries',
                    amount: 1,
                }
            ]
        });
    }

    return recipes;
}

describe('app', () => {
    describe('signup&Login', () => {
        beforeEach(async () => {
            // Add our initial data
            const user = new User(generateUserData());
            await user.save();
        });

        describe('/auth/signup', () => {
            it('should sign up a new user', async () => {
                // Arrange
                const body = {
                    email: 'newEmail@test.com',
                    password: 'newPassword',
                }

                // Act
                const res = await request(app)
                    .post('/auth/signup')
                    .send(body);
                const result = res.body;

                // Assert
                expect(result.status).toEqual(200);
                expect(result.message).toEqual('Signup success');
            });
        });

        describe('/auth/login', () => {
            describe('/auth/login', () => {
                it('should login the previously registered user', async () => {
                    // Arrange
                    const {email, password} = generateUserData();
                    const body = {
                        email,
                        password,
                    };

                    // Act
                    const res = await request(app)
                        .post('/auth/login')
                        .send(body);
                    const result = res.body;

                    // Assert
                    expect(result.status).toEqual(200);
                    expect(result.message).toEqual('Login success');
                });
            });
        });
    });

    describe('/recipes', () => {
        it('GET /recipes', async () => {
            // Arrange
            const recipe = new Recipe(generateRecipes()[0]);

            await recipe.save();

            // Act
            const res = await request(app)
                .get('/recipes');
            const result = res.body;

            expect(result.status).toEqual(200);
            expect(result.recipes?.length).toEqual(1);
        });

        it('POST /recipes', async () => {
            // Arrange
            const body = generateRecipes()[0];

            // Arrange
            const res = await request(app)
                .post('/recipes')
                .send(body);
            const result = res.body;

            // Assert
            expect(result.status).toEqual(200);
            expect(result.recipe).toBeDefined();
        });

        it('PUT /recipes', async () => {
            // Arrange
            const body = generateRecipes(3);

            // Arrange
            const res = await request(app)
                .put('/recipes')
                .send(body);
            const result = res.body;

            // Assert
            expect(result.status).toEqual(200);
            expect(result.recipes).toBeDefined();
            expect(result.recipes.length).toEqual(body.length);
        });
    });
});
