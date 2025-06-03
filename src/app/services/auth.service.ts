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

  // BehaviorSubject to track authentication status
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  login(credentials: any): Observable<string> { // Explicitly define return type as Observable<string>
    console.log("from auth service");
    console.log(credentials);

    // Make the HTTP POST request
    return this.http.post(`${this.apiGatewayUrl}/auth/authenticate`, credentials, { responseType: 'text' })
      .pipe(
        tap((token: string) => { // Use tap to perform side effects (like storing the token)
          console.log("Received token:", token);
          this.setToken(token); // Store the token
          this.isAuthenticatedSubject.next(true); // Update authentication status
          console.log(this.isAuthenticated$);
          
        }),
        catchError(this.handleError) // Add error handling
      );
  }

  logout(): void {
    this.removeToken();
    this.isAuthenticatedSubject.next(false);
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

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && typeof error.error === 'string') {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`; // Backend might return error message directly as text
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}