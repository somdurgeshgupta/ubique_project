import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { RegisterComponent } from './register.component';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs'; // Mock API responses

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>; // Spy on AuthService

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['registration', 'isLoggedIn', 'loginWithGoogle', 'login']);
    authServiceSpy.isLoggedIn.and.returnValue(false); // Simulate user not logged in

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        RouterTestingModule, // For routing
        HttpClientTestingModule, // For HttpClient
        ReactiveFormsModule, // For formGroup and formControlName
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create the register component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.registerForm.value).toEqual({
      name: '',
      email: '',
      password: ''
    });
  });

  it('should have a form with name, email, and password controls', () => {
    expect(component.registerForm.contains('name')).toBeTrue();
    expect(component.registerForm.contains('email')).toBeTrue();
    expect(component.registerForm.contains('password')).toBeTrue();
  });



  it('should mark the email field as invalid if it is empty and touched', () => {
    const emailControl = component.registerForm.get('email');
    emailControl?.setValue('');
    emailControl?.markAsTouched();
    fixture.detectChanges();

    expect(emailControl?.invalid).toBeTrue();
    const errorMsg = fixture.nativeElement.querySelector('small');
    expect(errorMsg.textContent).toContain('Email is required.');
  });

  it('should mark the email field as invalid if it has an invalid format', () => {
    const emailControl = component.registerForm.get('email');
    emailControl?.setValue('invalid-email');
    emailControl?.markAsTouched();
    fixture.detectChanges();

    expect(emailControl?.invalid).toBeTrue();
    const errorMsg = fixture.nativeElement.querySelector('small');
    expect(errorMsg.textContent).toContain('Invalid email format.');
  });

  it('should mark the password field as invalid if it is empty and touched', () => {
    const passwordControl = component.registerForm.get('password');
    passwordControl?.setValue('');
    passwordControl?.markAsTouched();
    fixture.detectChanges();

    expect(passwordControl?.invalid).toBeTrue();
    const errorMsg = fixture.nativeElement.querySelector('small');
    expect(errorMsg.textContent).toContain('Password is required.');
  });

  it('should mark the password field as invalid if it is shorter than 6 characters', () => {
    const passwordControl = component.registerForm.get('password');
    passwordControl?.setValue('123');
    passwordControl?.markAsTouched();
    fixture.detectChanges();

    expect(passwordControl?.invalid).toBeTrue();
    const errorMsg = fixture.nativeElement.querySelector('small');
    expect(errorMsg.textContent).toContain('Password must be at least 6 characters long.');
  });

  it('should disable the register button if form is invalid', () => {
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBe(true); // Initially disabled due to form being invalid
  });

  it('should enable the register button if form is valid', () => {
    component.registerForm.controls['name'].setValue('John Doe');
    component.registerForm.controls['email'].setValue('john.doe@example.com');
    component.registerForm.controls['password'].setValue('password123');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBe(false); // Enabled if form is valid
  });

  it('should call the registration method when the form is valid and submitted', () => {
    const mockResponse = { token: 'mockToken' };
    authService.registration.and.returnValue(of(mockResponse));

    component.registerForm.controls['name'].setValue('John Doe');
    component.registerForm.controls['email'].setValue('john@example.com');
    component.registerForm.controls['password'].setValue('password123');
    fixture.detectChanges();

    const registerButton = fixture.nativeElement.querySelector('button');
    registerButton.click();
    fixture.detectChanges();

    expect(authService.registration).toHaveBeenCalledWith(component.registerForm.value);
    expect(authService.login).toHaveBeenCalledWith(mockResponse.token);
  });



  it('should call registerWithGoogle when google button is clicked', () => {
    const googleBtn = fixture.nativeElement.querySelector('#google-btn');
    googleBtn.click();
    fixture.detectChanges();

    expect(authService.loginWithGoogle).toHaveBeenCalled();
  });


});
