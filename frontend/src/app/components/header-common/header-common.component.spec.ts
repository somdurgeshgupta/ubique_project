import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderCommonComponent } from './header-common.component';

describe('HeaderCommonComponent', () => {
  let component: HeaderCommonComponent;
  let fixture: ComponentFixture<HeaderCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderCommonComponent],
      imports: [RouterTestingModule, HttpClientTestingModule] // Add RouterTestingModule and HttpClientTestingModule
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
