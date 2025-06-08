import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map, catchError, throwError } from 'rxjs';
import { AuthUser } from '../models/auth-user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiGatewayUrl = 'http://localhost:9091';
  private tokenKey = 'jwt_token';
  private authUser : AuthUser;
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private userRoleSubject = new BehaviorSubject<string>('');
  userRole$ = this.userRoleSubject.asObservable();



  private role:Observable<AuthUser>;

  login(credentials: any): Observable<string> { 
    return this.http.post(`${this.apiGatewayUrl}/auth/authenticate`, credentials, { responseType: 'text' })
      .pipe(
        tap((token: string) => { 
          console.log("Received token:", token);
          this.setToken(token); 
          this.isAuthenticatedSubject.next(true); 
          console.log(this.isAuthenticated$);
          this.role = this.http.get<AuthUser>("http://localhost:9091/auth/getroles/"+credentials.username);
          this.role.subscribe({
           next: (data:AuthUser)=>{
              console.log("user role:");
              console.log(data)
              this.setRole(data.roles);
              this.setUserName(data.name);
              this.setUserId(data.id);
              this.userRoleSubject.next(data.roles);
              console.log(this.userRole$);
            }
          })

        }),
        catchError(this.handleError) 
      );
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.removeToken();
    this.removeUserId();
    this.removeRole();
    this.removeUserName();
  }

  public emitUserRole(){
    this.userRoleSubject.next(this.getRole());
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  private setRole(role:string):void{
    localStorage.setItem("role",role);
  }

  public getRole():string{
    return localStorage.getItem("role");
  }

  private removeRole(){
    localStorage.removeItem("role");
  }

  private setUserName(username:string){
    localStorage.setItem('username',username);
  }

  public getUserName():string{
    return localStorage.getItem('username');
  }

  private removeUserName(){
    localStorage.removeItem("username");
  }

  private setUserId(id:number){
    localStorage.setItem("id",id.toString());
  }

  public getUserId():number{    
    return Number(localStorage.getItem("id"));
  }

  private removeUserId(){
    localStorage.removeItem("id");
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && typeof error.error === 'string') {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`; 
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}