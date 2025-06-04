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
    quantityToBook: number = 1;

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

    bookEvent(event:Event){
      console.log("Booking details");
      const bookingData = {
        eventId:event.id,
        userId:this.authService.getUserId(),
        noOfTickets:this.quantityToBook
      }
      console.log(event);
      this.service.bookEvent(bookingData).subscribe({
        next:(res)=>console.log(res),
        error:(error)=>console.log(error)
      })
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
      this.quantityToBook = 1;

      if (this.selectedEvent.ticketCount < this.quantityToBook) {
          this.quantityToBook = this.selectedEvent.ticketCount;
      }
      if (this.quantityToBook > 10) {
          this.quantityToBook = 10;
      }
      if (this.selectedEvent.ticketCount === 0) { 
          this.quantityToBook = 0;
      }
    }

    onQuantityChange(): void {
      
      console.log("Selected quantity:", this.quantityToBook);  
       const maxAllowed = Math.min(10, this.selectedEvent?.ticketCount || 1);
      if (this.quantityToBook > maxAllowed) {
          this.quantityToBook = maxAllowed;
      }
      if (this.quantityToBook < 1 && (this.selectedEvent?.ticketCount || 0) > 0) {
          this.quantityToBook = 1; 
      }
      if (this.selectedEvent && this.selectedEvent.ticketCount === 0) {
          this.quantityToBook = 0; 
      }
  }

    navigateToLogin(){
      this.route.navigate(["/login"]);
    }

  }
