import {body, ValidationChain} from 'express-validator';

export const loginValidator: ValidationChain[] = [
    body('email', 'Email should not be empty')
        .not()
        .isEmpty(),

    body('password', 'The minimum password length is 6 characters')
        .not()
        .isEmpty()
        .isLength({min: 6}),
];

export const signupValidator: ValidationChain[] = [
    body('email', 'Invalid email')
        .not()
        .isEmpty()
        .isEmail(),

    body('password', 'The minimum password length is 6 characters')
        .not()
        .isEmpty()
        .isLength({min: 6}),
];
