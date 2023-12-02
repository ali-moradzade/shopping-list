import {User} from "../models/user.model";
import jwt from "jsonwebtoken";
import {APP_CONFIG} from "../config";

interface UserType {
    id: string;
    email?: string;
    password?: string;
}

export class AuthService {
    static async findUser(email: string) {
        const user = await User.findOne({email});
        if (user) {
            return user.toJSON() as UserType;
        }

        return null;
    }

    static async saveUser(email: string, password: string) {
        const user = new User({
            email,
            password,
        });

        await user.save();

        return user.toJSON() as UserType;
    }

    static createJWT(id: string, email: string) {
        return jwt.sign(
            {
                id,
                email,
            },
            APP_CONFIG.secretKey,
            {
                expiresIn: APP_CONFIG.expiresIn,
            }
        );
    }

    static parseJWT(token: string) {
        return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    }
}
