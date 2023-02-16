import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInfoTableComponent } from './company-info-table.component';

describe('CompanyInfoTableComponent', () => {
  let component: CompanyInfoTableComponent;
  let fixture: ComponentFixture<CompanyInfoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyInfoTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInfoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
