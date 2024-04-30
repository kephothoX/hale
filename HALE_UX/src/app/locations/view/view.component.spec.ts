import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComponent } from './view.component';

describe('ViewComponent', () => {
  const component: ViewComponent;
  const fixture: ComponentFixture<ViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
