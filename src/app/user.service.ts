import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { LoginVM } from './login-vm';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserName:any="";
  useremail:any="";
  constructor(private httpClient:HttpClient,private router:Router) { }
  getAllUser():Observable<User[]>
  {
    return this.httpClient.get<User[]>("https://localhost:44370/api/user/GetAllUsers");
  }
  loginUser(loginVM:LoginVM):Observable<LoginVM>
  {
    debugger;
    return this.httpClient.post<LoginVM>("https://localhost:44370/api/User/Login",loginVM)
    .pipe(map(u=>{
      if(u)
      {
        this.currentUserName=u.email;
        sessionStorage['currentUser']=JSON.stringify(u);
      }
      return u;
    }))
  }
  logOut()
  {
    this.currentUserName="";
    sessionStorage.removeItem('currentUser');
    this.router.navigateByUrl("/login");
  }
  registerUser(user:User):Observable<User>
  {
    return this.httpClient.post<User>("https://localhost:44370/api/user/Register",user);

    // .pipe(map(u=>{
    //   if(u)
    //   {
    //     this.CurrentUser=(new Date()).getTime();
    //     sessionStorage['CurrentUser']=this.CurrentUser;
    //   }
    //   return u;
    // }))
  }
  isUniqueUser(emailVM:String):Observable<any>
  {
    return this.httpClient.get<any>("https://localhost:44370/api/user/IsUniqueUser?email="+emailVM);
  }
	isUniqueUserName(userName:string):Observable<any>
  {
    return this.httpClient.get<any>("https://localhost:44370/api/user/IsUniqueUserName?userName="+userName);
  }
  emailConfirmation(userId:number):Observable<any>
  {
    return this.httpClient.get<any>("https://localhost:44370/api/User/ConfirmUrl?userId="+userId);
  }
}
