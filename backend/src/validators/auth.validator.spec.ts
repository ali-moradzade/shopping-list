import {describe, expect, it} from "vitest";
import {loginValidator, signupValidator} from "./auth.validator";
import {ValidationChain} from "express-validator";

function testCheckerUtil(message: string, body: any, validator: ValidationChain) {
    it(message, async () => {
        // Arrange
        const req = {
            body,
        };

        // Act
        const result = await validator.run(req);

        // Assert
        expect(result.context.errors.length).not.toEqual(0);
    });
}

describe('auth.validator', () => {
    describe('loginValidator', () => {
        const emailValidator = loginValidator[0];
        const passwordValidator = loginValidator[1];

        describe('email', () => {
            testCheckerUtil(
                'should ensure email not empty',
                {email: ''},
                emailValidator,
            );
        });

        describe('password', () => {
            testCheckerUtil(
                'should ensure password not empty',
                {password: ''},
                passwordValidator,
            );

            testCheckerUtil(
                'should ensure password length >= 6',
                {password: '12345'},
                passwordValidator,
            );
        });
    });

    describe('signupValidator', () => {
        const emailValidator = signupValidator[0];
        const passwordValidator = signupValidator[1];

        describe('email', () => {
            testCheckerUtil(
                'should ensure valid email',
                {email: 'invalid-email'},
                emailValidator,
            );
        });

        describe('password', () => {
            testCheckerUtil(
                'should ensure password not empty',
                {password: ''},
                passwordValidator,
            );

            testCheckerUtil(
                'should ensure password length >= 6',
                {password: '12345'},
                passwordValidator,
            );
        });
    });
});
