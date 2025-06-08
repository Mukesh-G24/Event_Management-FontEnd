import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerFeedbackComponent } from './organizer-feedback.component';

describe('OrganizerFeedbackComponent', () => {
  let component: OrganizerFeedbackComponent;
  let fixture: ComponentFixture<OrganizerFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
