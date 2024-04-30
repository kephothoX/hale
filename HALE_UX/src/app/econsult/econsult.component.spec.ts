import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconsultComponent } from './econsult.component';

describe('EconsultComponent', () => {
  let component: EconsultComponent;
  let fixture: ComponentFixture<EconsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EconsultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EconsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
