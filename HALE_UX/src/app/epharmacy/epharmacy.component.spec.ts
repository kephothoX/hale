import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpharmacyComponent } from './epharmacy.component';

describe('EpharmacyComponent', () => {
  let component: EpharmacyComponent;
  let fixture: ComponentFixture<EpharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpharmacyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
