import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakevisitshowComponent } from './takevisitshow.component';

describe('TakevisitshowComponent', () => {
  let component: TakevisitshowComponent;
  let fixture: ComponentFixture<TakevisitshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakevisitshowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TakevisitshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
