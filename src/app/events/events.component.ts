  import { Component, OnInit } from '@angular/core';
  import { RouterLink, RouterOutlet, Router } from '@angular/router';
  import { Event } from '../models/event';
  import { EventService } from '../services/event.service';
  import { CommonModule } from '@angular/common';
  import { AuthService } from '../services/auth.service';
  import { FormsModule } from '@angular/forms';

  @Component({
    selector: 'app-events',
    imports: [CommonModule,FormsModule],
    templateUrl: './events.component.html',
    styleUrl: './events.component.css'
  })
  export class EventsComponent implements OnInit {

    events:Event[];
    // available:Boolean = false;
    selectedEvent:Event;
    eventData:any;

    constructor(private service:EventService, public authService:AuthService, private route:Router){

      this.eventData = {
        eventName:'',
        eventCategory:'',
        eventLocation:'',
        eventDate:null,
        eventOrganizerId:authService.getUserId(),
        ticketCount:0,
        ticketPrice:0
      };
    }

    ngOnInit(): void {
      this.getAllEvents();
      if(this.authService.isAuthenticated$){
        this.authService.emitUserRole();
      }
    }

    addEvent(event){
      console.log("Adding event :");
      this.service.addEvent(event).subscribe({
        next:(res)=>console.log(res),
        error:(error)=>console.log(error)
      });
      this.getAllEvents();
    }

    getAllEvents(){
      this.service.getAllEvents().subscribe({
        next:(data)=>{
          console.log(data.body);
          this.events = data.body;
          // this.available=true;
        },
        error:(error)=>console.log(error)
      })
    }

    updateEvent(event:Event){
      console.log(event);
      this.service.updateEvent(event).subscribe({
        next:(res)=>{
          console.log(res);
          this.getAllEvents();
        },
        error:(error)=>console.log(error)
      });
    }

    deleteEvent(id:number){
      if(confirm("Are you really want to delete this event ?"))
      {
        this.service.deleteEvent(id).subscribe({
          next:(res)=>{
            console.log("deletion success");
            
            console.log(res);
            console.log("fetching all events....");
            
            this.getAllEvents();
          },
          error:(error)=>console.log(error)        
        })
      }
      
    }

    selectEvent(event:Event){
      this.selectedEvent = {...event};
    }

    navigateToLogin(){
      this.route.navigate(["/login"]);
    }

  }
