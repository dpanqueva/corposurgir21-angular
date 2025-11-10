import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageTableComponent } from './front-page-table.component';

describe('FrontPageTableComponent', () => {
  let component: FrontPageTableComponent;
  let fixture: ComponentFixture<FrontPageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontPageTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontPageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
