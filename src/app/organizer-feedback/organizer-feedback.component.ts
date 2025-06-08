import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';
import { Router } from '@angular/router';


@Component({
  selector: 'app-organizer-feedback',
  imports: [CommonModule],
  templateUrl: './organizer-feedback.component.html',
  styleUrl: './organizer-feedback.component.css'
})
export class OrganizerFeedbackComponent {

  allEvents:Event[];
  authService:AuthService;

  constructor(private service:AuthService, private eventService:EventService, private route:Router){
    this.authService=service;
    this.getAllEvents();
    
  }

  getAllEvents(){
    this.eventService.getAllEvents().subscribe({
      next:(res)=>this.allEvents = res.body,
      error:(error)=>console.log(error)  
    })
  }

  getAllFeedbacks(id:number){

    this.route.navigate(["/event-feedbacks",id]);

  }


}
