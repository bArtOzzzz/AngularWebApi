import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllFridgesComponent } from './list-all-fridges.component';

describe('ListAllFridgesComponent', () => {
  let component: ListAllFridgesComponent;
  let fixture: ComponentFixture<ListAllFridgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllFridgesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllFridgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
