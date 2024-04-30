import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegistrantComponent } from './new-registrant.component';

describe('NewRegistrantComponent', () => {
  let component: NewRegistrantComponent;
  let fixture: ComponentFixture<NewRegistrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRegistrantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewRegistrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
