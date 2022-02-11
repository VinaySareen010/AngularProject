import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginVM } from '../login-vm';
import { NotificationService } from '../notification.service';
import { UserService } from '../user.service';
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
// loginVM:LoginVM=new LoginVM();
hide=true;
loginVM=new FormGroup({
email:new FormControl(''),
password:new FormControl('')
});

  constructor( private loginService:UserService,private route:Router,private notifyService:NotificationService) { }

  ngOnInit(): void {
    document.body.className = "selector";
  }
  ngOnDestroy(){
    document.body.className="";
  }
  loginClick()
  {
    console.warn(this.loginVM.value);
    this.loginService.loginUser(this.loginVM.value).subscribe(
      (response)=>{

        this.route.navigateByUrl("/home");
        this.notifyService.showSuccess("Logged In Success");
      },
      (error)=>{
        console.log(error);
        this.notifyService.showWarning("wrong UserName and Password");
      }
      
    );
  }

}
