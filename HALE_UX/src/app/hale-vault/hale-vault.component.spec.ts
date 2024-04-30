import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaleVaultComponent } from './hale-vault.component';

describe('HaleVaultComponent', () => {
  let component: HaleVaultComponent;
  let fixture: ComponentFixture<HaleVaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HaleVaultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HaleVaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
