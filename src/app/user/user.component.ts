import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
users:User[]=[];

displayedColumns: string[] = ['userName', 'email', 'registerDateTime','image'];
  constructor(private userservice:UserService) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll()
  {
    this.userservice.getAllUser().subscribe(
      (response)=>{
        this.users=response;
        console.log(response);
      },
      (error)=>{
        console.log()
      }
    );
  }
  loginClick()
  {

  }

}
