import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakevisitedshowComponent } from './takevisitedshow.component';

describe('TakevisitedshowComponent', () => {
  let component: TakevisitedshowComponent;
  let fixture: ComponentFixture<TakevisitedshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakevisitedshowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TakevisitedshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
