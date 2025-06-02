import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private url = "http://localhost:9091/user/signup";
  private authUrl = "http://localhost:9091/auth/new";

  constructor(private http:HttpClient) { }

  authRegisteration(body):Observable<HttpResponse<any>>{
    return this.http.post(this.authUrl,body,{
      observe:'response',
      responseType:'text'
    });
  }

  userRegistration(body:User):Observable<HttpResponse<any>>{
    return this.http.post(this.url,body,{
      observe:'response'
    });
  }

}
