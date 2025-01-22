import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { MatExpansionModule } from '@angular/material/expansion'; // For MatAccordion
import { FormsModule } from '@angular/forms'; // For ngModel
import { MatCheckboxModule } from '@angular/material/checkbox'; // For mat-checkbox
import { MatIconModule } from '@angular/material/icon'; // For mat-icon

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      imports: [
        MatExpansionModule, // For MatAccordion
        FormsModule, // For ngModel and two-way data binding
        MatCheckboxModule, // For mat-checkbox used in the template
        MatIconModule, // For mat-icon used in the template
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ensure change detection is run
  });

  it('should create the CategoriesComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should bind the search term to the input field', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'Test Search';
    inputElement.dispatchEvent(new Event('input'));
    expect(component.searchTerm).toBe('Test Search');
  });
  
  it('should expand and collapse category panels', () => {
    const panel = fixture.nativeElement.querySelector('mat-expansion-panel');
    const header = panel.querySelector('mat-expansion-panel-header');
    header.click();
    fixture.detectChanges();
    expect(panel.classList).toContain('mat-expanded');
    header.click();
    fixture.detectChanges();
    expect(panel.classList).not.toContain('mat-expanded');
  });

  it('should display sorting controls when showSortMenu is true', () => {
    component.showSortMenu = true;
    fixture.detectChanges();
    const sortMenu = fixture.nativeElement.querySelector('.mb-3');
    expect(sortMenu).toBeTruthy();
  });

  it('should disable the "Previous" button on the first page', () => {
    component.page = 1;
    fixture.detectChanges();
    const prevButton = fixture.nativeElement.querySelector('button[disabled]');
    expect(prevButton.textContent).toContain('Previous');
  });

  it('should disable the "Next" button on the last page', () => {
    // Set the current page and total pages
    component.page = 5; // Set this to the last page number
    component.totalPages = 5; // Set the total number of pages
    fixture.detectChanges(); // Trigger change detection
  
    const nextButton = fixture.nativeElement.querySelector('button[disabled]');
    
    // Ensure the "Next" button is disabled
    expect(nextButton.textContent).toContain('Next');
  });
  

  it('should show "Out of Stock" for items with quantity 0', () => {
    component.paginatedItems = [
      { name: 'Out of Stock Item', points: 10, quantity: 0, valid_until: new Date() }
    ];
    fixture.detectChanges();
    const outOfStock = fixture.nativeElement.querySelector('.text-danger');
    expect(outOfStock).toBeTruthy();
    expect(outOfStock.textContent).toContain('Out of Stock');
  });

  it('should show "ON High Demand" for items with low quantity', () => {
    component.paginatedItems = [
      { name: 'High Demand Item', points: 10, quantity: 3, low_quantity: 5, valid_until: new Date() }
    ];
    fixture.detectChanges();
    const highDemand = fixture.nativeElement.querySelector('.text-warning');
    expect(highDemand).toBeTruthy();
    expect(highDemand.textContent).toContain('ON High Demand');
  });

  it('should display the "Valid Until" date in the correct format', () => {
    const item = { name: 'Item', points: 10, quantity: 5, valid_until: new Date('2025-12-31') };
    component.paginatedItems = [item];
    fixture.detectChanges();
    const dateElement = fixture.nativeElement.querySelector('.text-muted');
    expect(dateElement.textContent).toContain('2025');
  });

  it('should remove a category filter when the remove button is clicked', () => {
    component.selectedCategories = { 'Category1': true, 'Category2': false };
    fixture.detectChanges();
    const removeButton = fixture.nativeElement.querySelector('button .fa-times');
    removeButton.click();
    fixture.detectChanges();
    expect(component.selectedCategories['Category1']).toBe(false);
  });
});
