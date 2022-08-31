import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFridgeComponent } from './view-fridge.component';

describe('ViewFridgeComponent', () => {
  let component: ViewFridgeComponent;
  let fixture: ComponentFixture<ViewFridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFridgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
