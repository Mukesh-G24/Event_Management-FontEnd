import { Component } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../services/feedback.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-feedback-and-rating',
  imports: [CommonModule,FormsModule],
  templateUrl: './feedback-and-rating.component.html',
  styleUrl: './feedback-and-rating.component.css'
})
export class FeedbackAndRatingComponent {

  eventId:number;
  event:Event;
  avgRating:number;
  comments:string;
  star=[1,2,3,4,5];
  rating = 0;
  changeRating(val:number){
    this.rating=val;
  }

  constructor(private eventService:EventService, private route:ActivatedRoute, private feedbackService:FeedbackService,
  private authService:AuthService){
      this.eventId = + this.route.snapshot.paramMap.get('eventId');
      this.getEventById(this.eventId);
      this.getAvgRating(this.eventId);
  }

  getEventById(eventId){
    this.eventService.getEventById(eventId).subscribe({
      next:(res)=> this.event=res.body,
    })
  }

  getAvgRating(id:number){
    this.feedbackService.getAvgRating(id).subscribe({
      next:(res)=>this.avgRating=res.body,
      error:(error)=>console.log(error)
      
    })
  }

  submitFeedback(){
    let feedBack = {
      userId:this.authService.getUserId(),
      eventId:this.event.id,
      rating:this.rating,
      comments:this.comments
    }

    this.feedbackService.submitFeedback(feedBack).subscribe({
      next:(res)=>console.log(res),
      error:(error)=>console.log(error)
    })
  }







}
