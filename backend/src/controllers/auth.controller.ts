import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {AuthService} from "../services/auth.service";
import {APP_CONFIG} from "../config";

export class AuthController {
    static async signup(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({
                status: 400,
                errors: errors.array(),
            });
        }

        const {email, password} = req.body as {
            email: string;
            password: string;
        };

        const user = await AuthService.findUser(email);

        if (user) {
            return res.status(400).json({
                status: 400,
                message: 'Email already in use',
            });
        }

        const newUser = await AuthService.saveUser(
            email,
            password,
        );

        // Delete the password & email fields
        delete newUser.email;
        delete newUser.password;

        const token = AuthService.createJWT(newUser.id.toString(), email);

        res.send({
            status: 200,
            message: 'Signup success',
            user: newUser,
            token,
            expiresIn: APP_CONFIG.expiresIn,
        });
    }

    static async login(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({
                status: 400,
                errors: errors.array(),
            });
        }

        const {email, password} = req.body as {
            email: string;
            password: string;
        };

        const user = await AuthService.findUser(email);

        if (!user) {
            return res.status(404).send({
                status: 404,
                message: 'User not found',
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                status: 401,
                message: 'Invalid credentials',
            });
        }

        const token = AuthService.createJWT(user.id.toString(), email);

        // Delete the password & email fields
        delete user.email;
        delete user.password;

        res.send({
            status: 200,
            message: 'Login success',
            user,
            token,
            expiresIn: APP_CONFIG.expiresIn,
        });
    }
}
