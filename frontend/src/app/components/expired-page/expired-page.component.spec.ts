import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { ExpiredPageComponent } from './expired-page.component';

describe('ExpiredPageComponent', () => {
  let component: ExpiredPageComponent;
  let fixture: ComponentFixture<ExpiredPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpiredPageComponent],
      imports: [
        RouterTestingModule, // Add RouterTestingModule for routing
        HttpClientTestingModule, // Add HttpClientTestingModule for HttpClient
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpiredPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
