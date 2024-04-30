import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchPayComponent } from './ach-pay.component';

describe('AchPayComponent', () => {
  let component: AchPayComponent;
  let fixture: ComponentFixture<AchPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchPayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AchPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
