import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule for routing
import { AuthService } from '../services/auth.service'; // Import AuthService
import { of } from 'rxjs'; // For mocking observables
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule, // Add ReactiveFormsModule here
        HttpClientTestingModule, // Add HttpClientTestingModule
        RouterTestingModule // For testing routes
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: jasmine.createSpy().and.returnValue(false), // Mock the login status
            loginUser: jasmine.createSpy().and.returnValue(of({ token: 'fake-token' })), // Mock loginUser
            login: jasmine.createSpy(), // Mock login method
            loginWithGoogle: jasmine.createSpy() // Mock Google login method
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with email and password controls', () => {
    expect(component.loginForm.contains('email')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });

  it('should be invalid if email or password is empty', () => {
    const email = component.loginForm.controls['email'];
    const password = component.loginForm.controls['password'];

    email.setValue('');
    password.setValue('');
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should be valid if email and password are correctly filled', () => {
    const email = component.loginForm.controls['email'];
    const password = component.loginForm.controls['password'];

    email.setValue('test@example.com');
    password.setValue('123456');
    expect(component.loginForm.valid).toBeTrue();
  });

});
