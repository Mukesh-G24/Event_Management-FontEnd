import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../services/bookings.service';
import { Ticket } from '../models/ticket';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';
import { CancelTicket } from '../models/cancel-ticket';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mybookings',
  imports: [CommonModule],
  templateUrl: './mybookings.component.html',
  styleUrl: './mybookings.component.css'
})
export class MybookingsComponent implements OnInit {
  
  userTickets:Ticket[]=[];
  completedEvents:CancelTicket[]=[];
  upcomingEvents:CancelTicket[]=[];
  
  constructor(private bookingService:BookingsService,private eventService:EventService,private route:Router){}

  ngOnInit(): void {
    this.getMyTickets();
  }

  getMyTickets(){
    this.bookingService.getMyTickets().subscribe({
      next:(res)=>{
        this.userTickets=res.body;
        for(let ticket of this.userTickets){
          this.eventService.getEventById(ticket.eventId).subscribe({
            next:(res)=>{

              if(ticket.ticketStatus === 'BOOKED'){
                let curEventDate = res.body.eventDate;
                
                if(typeof curEventDate === 'string'){
                  curEventDate = new Date(curEventDate);
                }
                let today = new Date();         
                if(curEventDate >= today){
                  let a={...res.body,ticketId:ticket.ticketId};
                  // console.log("Upcoming events : ",a);
                  this.upcomingEvents.push(a);              
                }
                else{
                  let a={...res.body,ticketId:ticket.ticketId};
                  // console.log("completed evetns: ",a);
                  this.completedEvents.push(a);
                }
              } 
            }
          })
        }        
      },
      error:(error)=>console.log(error)   
    })
  }

  cancelTicket(ticketId:number){
    this.bookingService.cancelTicket(ticketId).subscribe({
      next:(res)=>{
        console.log(res);
        
        console.log("cancelled");
        alert("Ticket cancelled successfully");
        
        this.getMyTickets()
      },
      error:(error)=>{
        console.log("error message ",error.status);
        if(error.status == 200){
          
          alert("Ticket Cancelled Successfully");
        }
      }
    })
  }
  
  navigateTo(eventId:number){
    this.route.navigate(["/submit-feedback",eventId]);
  }
}