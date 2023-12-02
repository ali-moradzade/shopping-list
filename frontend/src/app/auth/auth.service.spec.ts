import {AuthResponseData, AuthService, loginUrl, signupUrl} from "./auth.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClient, HttpClientModule} from "@angular/common/http";

const customTimeout = 10000;

describe('auth.service', () => {
  describe('mock-server', () => {
    let authService: AuthService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule.withRoutes([]),
        ],
        providers: [
          AuthService,
        ],
      });

      authService = TestBed.inject(AuthService);
      httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should login', () => {
      // Arrange
      const email = 'test@test.com';
      const password = 'securePassword';

      const body: AuthResponseData = {
        status: 200,
        message: 'success',
        user: {
          id: 'id',
        },
        token: 'token',
        expiresIn: '1d',
      };

      // Act
      authService.login(email, password)
        .subscribe(result => {
          // Assert
          expect(result).toBeDefined();
          expect(result.status).toEqual(body.status);
        });

      const req = httpTestingController.expectOne(loginUrl);
      req.flush(body);
    });

    it('should signup', () => {
      // Arrange
      const email = 'test@test.com';
      const password = 'securePassword';

      const body: AuthResponseData = {
        status: 200,
        message: 'success',
        user: {
          id: 'id',
        },
        token: 'token',
        expiresIn: '1d',
      };

      // Act
      authService.signup(email, password)
        .subscribe(result => {
          // Assert
          expect(result).toBeDefined();
          expect(result.status).toEqual(body.status);
        });

      const req = httpTestingController.expectOne(signupUrl);
      req.flush(body);
    });

    // TODO: Add test for autoLogin
  });

  /**
   * Just enable these tests for when you think there is a breaking change in backed API
   * Disable thereafter because of heavy load in test time & resources
   */
  xdescribe('real-server', () => {
    let httpClient: HttpClient;

    const email = 'test@test.com';
    const password = 'securePassword';

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientModule,
        ],
      });

      httpClient = TestBed.inject(HttpClient);
    });

    describe('POST /signup', () => {
      it('should match the format of response', (done) => {
        // Arrange
        const body = {
          email,
          password,
        };

        const expectedResult: AuthResponseData = {
          status: 200,
          message: 'Signup success',
          user: {
            id: 'id',
          },
          token: 'token',
          expiresIn: '1d',
        };

        // Act & Assert
        httpClient.post<AuthResponseData>(signupUrl, body)
          .subscribe((result: AuthResponseData) => {
            expect(result).toBeDefined();
            expect(result.status).toEqual(expectedResult.status);
            expect(result.message).toEqual(expectedResult.message);
            done();
          });
      }, customTimeout);
    });

    describe('POST /login', () => {
      it('should match the format of req&res and successfully login a previously signed up user',
        (done) => {
          // Arrange
          const body = {
            email,
            password,
          };

          const expectedResult: AuthResponseData = {
            status: 200,
            message: 'Login success',
            user: {
              id: 'id',
            },
            token: 'token',
            expiresIn: '1d',
          };

          // Act & Arrange
          httpClient.post<AuthResponseData>(loginUrl, body)
            .subscribe((result: AuthResponseData) => {
              expect(result).toBeDefined();
              expect(result.status).toEqual(expectedResult.status);
              expect(result.message).toEqual(expectedResult.message);
              done();
            });
        }, customTimeout);
    });
  });
});
