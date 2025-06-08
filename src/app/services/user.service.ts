import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private getUserByIdUrl = "http://localhost:9091/user/fetch-by-id/";
  private updateUserUrl = "http://localhost:9091/user/update/";

  constructor(private http:HttpClient) { }

  getUserById(id:number):Observable<HttpResponse<any>>{
    return this.http.get(this.getUserByIdUrl+id,{observe:'response'});
  }

  updateUser(id:number,user:any):Observable<HttpResponse<any>>{
    return this.http.put(this.updateUserUrl+id,user,{observe:'response'});
  }

}
