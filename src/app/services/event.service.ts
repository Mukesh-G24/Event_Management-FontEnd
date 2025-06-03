import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event';


@Injectable({
  providedIn: 'root'
})

export class EventService {

  private fetchAllUrl = "http://localhost:9091/event/fetch-all";
  private updateEvnetUrl = "http://localhost:9091/event/update/";
  private deleteEventUrl = "http://localhost:9091/event/delete/";

  constructor(private http:HttpClient) { }

  getAllEvents():Observable<HttpResponse<any>>{
    return this.http.get(this.fetchAllUrl,{observe:'response'});
  }

  updateEvent(event:Event):Observable<HttpResponse<any>>{
    return this.http.put<HttpResponse<any>>(this.updateEvnetUrl+ event.id , event,{observe:'response'});
  }

  deleteEvent(id:number):Observable<HttpResponse<any>>{
    return this.http.delete(this.deleteEventUrl+id,{observe:'response'});
  }
}
