import { Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MybookingsComponent } from './mybookings/mybookings.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"events",component:EventsComponent},
    {path:"login",component:LoginComponent},
    {path:"registration",component:RegistrationComponent},
    {path:"myBookings",component:MybookingsComponent}
];
