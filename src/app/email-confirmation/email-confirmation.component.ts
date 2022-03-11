import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {
  userId: any = 0;
  confirmationError: string = "";
  loading:boolean=false;
  confirmationSuccess:boolean=false;
  constructor(private userService: UserService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.router.snapshot.queryParamMap.get('userId')
  }
  emailConfirmation() {
   debugger;
    let currentUserSession:any=localStorage.getItem('registerUserTime');
    // const now=(new Date()).getTime();
    const now = new Date();
      //  now.setHours(now.getHours());
    if(currentUserSession > now.toString())
    {
      this.loading=true;
      this.userService.emailConfirmation(this.userId).subscribe(
        (response) => {
          debugger;
          this.loading = false;
         this.confirmationSuccess=true;
        },
        (error) => {
          this.loading = false;
          this.confirmationError = error.error;
          console.log(error);
        }
      );
    }}
  }