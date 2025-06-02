import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = "http://localhost:9091/event/fetch-all";

  constructor(private http:HttpClient) { }

  getAllEvents():Observable<HttpResponse<any>>{
    return this.http.get(this.apiUrl,{observe:'response'})
  }
}
