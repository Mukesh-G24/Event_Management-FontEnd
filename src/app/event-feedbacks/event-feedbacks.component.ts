import { Component } from '@angular/core';
import { Event } from '../models/event';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from '../models/feedback';
import { FeedbackService } from '../services/feedback.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';


@Component({
  selector: 'app-event-feedbacks',
  imports: [CommonModule],
  templateUrl: './event-feedbacks.component.html',
  styleUrl: './event-feedbacks.component.css'
})
export class EventFeedbacksComponent {

  event:Event;
  eventId:number;
  eventFeedbacks:any;
  users:User[]=[];
  avgRating:number;


  constructor(private eventService:EventService,private route:ActivatedRoute,private feedbackService:FeedbackService,
    private userService:UserService){
    this.eventId = + this.route.snapshot.paramMap.get('eventId');    
    this.getEvent(this.eventId);
    this.getFeedbackByEventId(this.eventId); 
    this.getAvgRating(this.eventId); 
  }

  getEvent(id:number){
    this.eventService.getEventById(id).subscribe({
      next:(res)=>{
        this.event=res.body;
      },
      error:(error)=>console.log(error)
    })
  }

  getFeedbackByEventId(id:number){
    this.feedbackService.getFeedbackByEventId(id).subscribe({
      next:(res)=>{
        this.eventFeedbacks = res.body;
        console.log("feedbacks ",res);
        
        for(let feedback of this.eventFeedbacks){
          this.userService.getUserById(feedback.userId).subscribe({
            next:(res)=>{
              this.users.push(res.body);
              feedback.userName=res.body.userName;
            },
            error:(error)=>console.log(error)            
          })
        }
        console.log("Feedback ",this.eventFeedbacks);
        console.log("User ",this.users); 
        console.log(this.eventFeedbacks);
      },
      error:(error)=>console.log(error)
    })
  }

  getStarArrys(count:number):any[]{
    return new Array(count);
  }

  getAvgRating(id:number){
    this.feedbackService.getAvgRating(id).subscribe({
      next:(res)=>this.avgRating=res.body,
      error:(error)=>console.log(error)
    })
  }

  
  


}
