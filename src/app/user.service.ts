import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginVM } from './login-vm';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
CurrentUser:any="";
  constructor(private httpClient:HttpClient) { }
  getAllUser():Observable<User[]>
  {
    return this.httpClient.get<User[]>("https://localhost:44370/api/user/GetAllUsers");
  }
  loginUser(loginVM:LoginVM):Observable<LoginVM>
  {
    return this.httpClient.post<LoginVM>("https://localhost:44370/api/user/Login",loginVM);
    // .pipe(map(u=>{
    //   if(u)
    //   {
    //     this.CurrentUser=u.email;
    //     sessionStorage['CurrentUser']=json.stringify
    //   }
    //   return u;
    // }))
  }
  registerUser(user:User):Observable<User>
  {
    return this.httpClient.post<User>("https://localhost:44370/api/user/Register",user);
  }
}
