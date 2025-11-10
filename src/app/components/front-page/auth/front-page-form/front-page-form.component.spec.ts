import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageFormComponent } from './front-page-form.component';

describe('FrontPageFormComponent', () => {
  let component: FrontPageFormComponent;
  let fixture: ComponentFixture<FrontPageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontPageFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
