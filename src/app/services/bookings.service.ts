import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private getTicketByUserUrl = "http://localhost:9091/ticket/fetch-by-user-id/";
  private cancelTicketUrl = "http://localhost:9091/ticket/cancel/";
  

  constructor(private http:HttpClient, private authService:AuthService) { }

  getMyTickets():Observable<HttpResponse<any>>{
    return this.http.get(this.getTicketByUserUrl + this.authService.getUserId(),{observe:'response'});
  }

  cancelTicket(ticketId:number):Observable<HttpResponse<any>>{
    console.log("from cancel service....");
    
    return this.http.delete(this.cancelTicketUrl + ticketId,{observe:'response'});
  }
}
