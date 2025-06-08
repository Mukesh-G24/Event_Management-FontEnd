import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient) { }

  private getAvgRatingUrl = "http://localhost:9091/feedbackandrating/fetch-event-avg-rating/";
  private saveFeedbackUrl = "http://localhost:9091/feedbackandrating/save";
  private getFeedbackByEventIdUrl = "http://localhost:9091/feedbackandrating/fetch-by-event-id/";



  getAvgRating(id:number):Observable<HttpResponse<any>>{
    return this.http.get(this.getAvgRatingUrl+id,{observe:'response'});
  }

  submitFeedback(feedback:any):Observable<HttpResponse<any>>{
    return this.http.post(this.saveFeedbackUrl,feedback,{observe:'response'});
  }

  getFeedbackByEventId(id:number):Observable<HttpResponse<any>>{
    return this.http.get(this.getFeedbackByEventIdUrl+id,{observe:'response'});
  }
}
