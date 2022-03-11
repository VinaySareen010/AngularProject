import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtinterceptorService implements HttpInterceptor {

  constructor() { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var currentUser={token:""};
    var currentUserSession=sessionStorage.getItem("currentUser");    //session Read
    if(currentUserSession!=null)
    {
      currentUser=JSON.parse(currentUserSession);
    }
    req=req.clone({
      setHeaders:{
       Authorization:"Bearer "+currentUser.token
      }
    })
    return next.handle(req);
  }  
}
