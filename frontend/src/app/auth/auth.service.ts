import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from "./user";
import {Router} from "@angular/router";
import {APP_CONFIG} from "../../config";

export const signupUrl = `${APP_CONFIG.backendUrl}${APP_CONFIG.signup}`;
export const loginUrl = `${APP_CONFIG.backendUrl}${APP_CONFIG.login}`;

const storageKey = APP_CONFIG.storageKey;

export interface AuthResponseData {
    status: number;
    message: string;
    user: {
        id: string;
    },
    token: string;
    expiresIn: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user = new BehaviorSubject<User | null>(null);
    private tokenExpirationTimer: any = null;

    constructor(
        private httpClient: HttpClient,
        private router: Router,
    ) {
    }

    signup(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>(`${signupUrl}`, {
            email,
            password,
        })
            .pipe(
                catchError(this.handleError),
                tap((resData: AuthResponseData) => this.handleAuthentication(email, resData)),
            );
    }

    login(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>(`${loginUrl}`, {
            email,
            password,
        })
            .pipe(
                catchError(this.handleError),
                tap((resData: AuthResponseData) => this.handleAuthentication(email, resData)),
            );
    }

    autoLogin() {
        const userData = JSON.parse(localStorage.getItem(storageKey)!) as {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        };

        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);

            const expirationDuration =
                new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']).then();

        localStorage.removeItem(storageKey);

        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, resData: AuthResponseData) {
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        const user = new User(email, resData.user.id, resData.token, expirationDate);

        this.user.next(user);
        // TODO: enable this after debugging
        // this.autoLogout(parseInt(resData.expiresIn) * 1000);
        localStorage.setItem(storageKey, JSON.stringify(user));
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage;
        // TODO: change based of our backend
        switch (error?.error?.error?.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct';
                break;
            default:
                errorMessage = 'Something wrong happened!';
                break;
        }

        return throwError(errorMessage);
    }
}
