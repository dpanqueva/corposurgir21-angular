import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFeaturesFormComponent } from './category-features-form.component';

describe('CategoryFeaturesFormComponent', () => {
  let component: CategoryFeaturesFormComponent;
  let fixture: ComponentFixture<CategoryFeaturesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryFeaturesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFeaturesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
