  // import { Injectable } from '@angular/core';
  import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { AuthService } from '../services/auth.service';

  @Injectable()
  export class JwtInterceptor implements HttpInterceptor {


    private excludedUrls = [
      '/auth/authenticate',
      '/auth/new',
      // '/user/signup'
    ];

    constructor(private authService: AuthService) {
    // console.log('JwtInterceptor constructor invoked!');
      
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if (this.isExcluded(request.url)) {
        return next.handle(request);
      }
      const token = this.authService.getToken();
      // console.log("token : "+token);

      if (token) {
        // Clone the request and add the Authorization header
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }  
        });
        // console.log(`Interceptor: Token added to request for URL: ${request.url}`); 
      }

      return next.handle(request);
    }
    private isExcluded(url: string): boolean {
      return this.excludedUrls.some(excludedUrl => url.includes(excludedUrl));
    }
  }