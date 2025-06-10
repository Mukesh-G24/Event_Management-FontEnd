import { Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
import { FeedbackAndRatingComponent } from './feedback-and-rating/feedback-and-rating.component';
import { OrganizerFeedbackComponent } from './organizer-feedback/organizer-feedback.component';
import { EventFeedbacksComponent } from './event-feedbacks/event-feedbacks.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"events",component:EventsComponent},
    {path:"login",component:LoginComponent},
    {path:"registration",component:RegistrationComponent},
    {path:"myBookings",component:MybookingsComponent,canActivate:[AuthGuard]},
    {path:"event-feedbacks/:eventId",component:EventFeedbacksComponent,canActivate:[AuthGuard]},
    {path:"feedbacks",component:OrganizerFeedbackComponent,canActivate:[AuthGuard]},
    {path: "submit-feedback/:eventId", component: FeedbackAndRatingComponent,canActivate:[AuthGuard]},
    {path:"feedback",component:FeedbackAndRatingComponent,canActivate:[AuthGuard]},
    {path:"user-profile/:userId",component:UserProfileComponent,canActivate:[AuthGuard]}
];
