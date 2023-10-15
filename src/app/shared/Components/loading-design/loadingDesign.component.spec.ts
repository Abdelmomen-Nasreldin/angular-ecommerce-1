import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDesignComponent } from './loadingDesign.component';

describe('LoadingDesignComponent', () => {
  let component: LoadingDesignComponent;
  let fixture: ComponentFixture<LoadingDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingDesignComponent]
    });
    fixture = TestBed.createComponent(LoadingDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
