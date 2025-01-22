import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';
import { BehaviorSubject } from 'rxjs';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have loader state as false', (done) => {
    service.loaderState.subscribe((state) => {
      expect(state).toBe(false);
      done();
    });
  });

  it('should set loader state to true when show() is called', (done) => {
    service.loaderState.subscribe((state) => {
      if (state) {
        expect(state).toBe(true);
        done();
      }
    });

    service.show(); // Calling show() should set the loader state to true
  });


});
