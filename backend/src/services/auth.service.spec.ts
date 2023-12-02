import {afterAll, beforeAll, beforeEach, describe, expect, it} from "vitest";
import {DB_CONFIG} from "../config";
import {connectToDb, disconnectFromDB, dropDatabase} from "./db";
import {User} from "../models/user.model";
import {AuthService} from "./auth.service";

beforeAll(async () => {
    DB_CONFIG.name = 'sampleTest';

    await connectToDb();
});

beforeEach(async () => {
    await dropDatabase(DB_CONFIG.name);
});

afterAll(async () => {
    await dropDatabase(DB_CONFIG.name);
    await disconnectFromDB();
});

describe('auth.service', () => {
    describe('findUser', () => {
        it('should successfully find an existing user and return it', async () => {
            // Arrange
            const email = 'test@testing.com';
            const user = new User({
                username: 'thisIsAUsername',
                email,
                password: 'newPassword',
            });

            await user.save();

            // Act
            const result = await AuthService.findUser(email);

            // Assert
            expect(result).toBeDefined();
            expect(result?.email).toEqual(email);
        });

        it('should return undefined if there is no user with that username', async () => {
            // Arrange
            const username = 'noUsername';

            // Act
            const result = await AuthService.findUser(username);

            // Assert
            expect(result).toBeNull();
        });
    });

    describe('saveUser', () => {
        it('should successfully save a user and return it', async () => {
            // Arrange
            const email = 'email@email.com';
            const password = 'password';

            // Act
            const result = await AuthService.saveUser(email, password);
            const expectedResult = await AuthService.findUser(email);

            // Assert
            expect(result).toBeDefined();
            expect(result.id).toEqual(expectedResult?.id);
        });
    });

    describe('createJWT, parseJWT', () => {
        it('should create json web token from id, email, username', () => {
            // Arrange
            const id = 'id';
            const email = 'email';

            // Act
            const token = AuthService.createJWT(id, email);
            const parsed = AuthService.parseJWT(token);

            // Assert
            expect(parsed).toBeDefined();
            expect(parsed.id).toEqual(id);
        });
    });
});
