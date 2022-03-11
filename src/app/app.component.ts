import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'Assignment2UserLogin';
  
  messageReceived: any;
  subscriptionName!: Subscription; //important to create a subscription
  constructor(private router:Router,public userService:UserService) { }
  ngOnInit(): void {

    var currentUser:any=sessionStorage.getItem('currentUser');
    var userDetail:any=JSON.parse(currentUser);
    this.userService.currentUserName!=userDetail.email;
      //this.currentUserEmail=sessionStorage.getItem('currentUserEmail');
  }
  logOutClick()
  {
    this.userService.logOut();
  }
 
}
