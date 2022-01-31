import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  getAllUser():Observable<User[]>
  {
    return this.httpClient.get<User[]>("https://localhost:44370/api/user/GetAllUsers");
  }
  
}
