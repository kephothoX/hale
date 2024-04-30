import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegistrantComponent } from './edit-registrant.component';

describe('EditRegistrantComponent', () => {
  let component: EditRegistrantComponent;
  let fixture: ComponentFixture<EditRegistrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRegistrantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditRegistrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
