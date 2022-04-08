import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class LoginguardService implements CanActivate {
  constructor(private notificationService:NotificationService,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const currentUser = sessionStorage.getItem("currentUser");
    if(currentUser!=null)
    {
      // this.history.back();
      // window.Location
      this.router.navigateByUrl('/home');
      this.notificationService.showInfo("You Are Already Login");
      return false;
    }
    return true;
  }
}
