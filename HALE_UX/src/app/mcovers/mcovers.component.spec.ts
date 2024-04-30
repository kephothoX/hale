import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McoversComponent } from './mcovers.component';

describe('McoversComponent', () => {
  let component: McoversComponent;
  let fixture: ComponentFixture<McoversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [McoversComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(McoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
