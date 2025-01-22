declare var google:any;
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Import HttpClientTestingModule and HttpTestingController
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockToken = 'fake-jwt-token';
  const mockResponse = { token: mockToken };

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return token from localStorage', () => {
    localStorage.setItem('authToken', mockToken);

    const token = service.getToken();
    expect(token).toBe(mockToken);
  });

  it('should auto login if token and expiration time are valid', () => {
    const currentTime = Date.now();
    const expirationTime = currentTime + 3600000; // 1 hour later
    localStorage.setItem('authToken', mockToken);
    localStorage.setItem('tokenExpiration', expirationTime.toString());

    spyOn(service, 'startLogoutCountdown'); // Spy on the logout timer

    service.autoLogin();

    expect(service.startLogoutCountdown).toHaveBeenCalled();
  });

  it('should logout if the token has expired', () => {
    const expiredTime = Date.now() - 3600000; // 1 hour ago
    localStorage.setItem('authToken', mockToken);
    localStorage.setItem('tokenExpiration', expiredTime.toString());

    spyOn(service, 'logout'); // Spy on logout

    service.autoLogin();

    expect(service.logout).toHaveBeenCalled();
  });

  it('should call the backend registration API and return a response', () => {
    const mockRegistrationData = { username: 'test', email: 'test@example.com', password: 'password123' };

    service.registration(mockRegistrationData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.API_URL + 'users/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call the backend login API and return a response', () => {
    const loginData = { email: 'test@example.com', password: 'password123' };

    service.loginUser(loginData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.API_URL + 'users/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call the forgot password API', () => {
    const mockForgotPasswordData = { email: 'test@example.com' };

    service.forgotpassword(mockForgotPasswordData).subscribe();

    const req = httpMock.expectOne(environment.API_URL + 'users/forgetpassword');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });
});
