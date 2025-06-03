import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiGatewayUrl = 'http://localhost:9091';
  private tokenKey = 'jwt_token';

  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private userRoleSubject = new BehaviorSubject<string>('');
  userRole$ = this.userRoleSubject.asObservable();



  private role:Observable<string>;

  login(credentials: any): Observable<string> { 
    return this.http.post(`${this.apiGatewayUrl}/auth/authenticate`, credentials, { responseType: 'text' })
      .pipe(
        tap((token: string) => { 
          console.log("Received token:", token);
          this.setToken(token); 
          this.isAuthenticatedSubject.next(true); 
          console.log(this.isAuthenticated$);
          this.role = this.http.get("http://localhost:9091/auth/getroles/"+credentials.username,{responseType:'text'});
          this.role.subscribe({
           next: (data:string)=>{
              console.log("user role:");
              console.log(data)
              this.setRole(data);
              this.userRoleSubject.next(data);
              console.log(this.userRole$);
            }
          })

        }),
        catchError(this.handleError) 
      );
  }

  logout(): void {
    this.removeToken();
    this.isAuthenticatedSubject.next(false);
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