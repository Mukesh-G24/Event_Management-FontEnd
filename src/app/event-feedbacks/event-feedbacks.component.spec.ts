import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFeedbacksComponent } from './event-feedbacks.component';

describe('EventFeedbacksComponent', () => {
  let component: EventFeedbacksComponent;
  let fixture: ComponentFixture<EventFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventFeedbacksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
