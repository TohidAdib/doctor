import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeVisitFormComponent } from './take-visit-form.component';

describe('TakeVisitFormComponent', () => {
  let component: TakeVisitFormComponent;
  let fixture: ComponentFixture<TakeVisitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakeVisitFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TakeVisitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
