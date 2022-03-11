import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductguardService implements CanActivate{
local:string="";
  constructor(public router:Router) { }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const currentUser = sessionStorage.getItem("currentUser");
if (currentUser==null)  {
alert('You are not allowed to view this page,Please Login First');
this.router.navigateByUrl('/login');
return false;
}
return true;
}}
