import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFridgeComponent } from './edit-fridge.component';

describe('EditFridgeComponent', () => {
  let component: EditFridgeComponent;
  let fixture: ComponentFixture<EditFridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFridgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
