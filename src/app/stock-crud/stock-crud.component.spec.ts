import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCrudComponent } from './stock-crud.component';

describe('StockCrudComponent', () => {
  let component: StockCrudComponent;
  let fixture: ComponentFixture<StockCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
