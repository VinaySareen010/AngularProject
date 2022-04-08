import { Component, OnInit,OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
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
loginError!:string;
currentUserEmail:any="";
  constructor( private loginService:UserService,private router:Router,private notifyService:NotificationService) { }

  ngOnInit(): void {
    document.body.className = "selector";
  }
  ngOnDestroy(){
    document.body.className="";
  }
  canActivate(): boolean {    
    // Check weather the route can be activated;    
    return true;     
    // or false if you want to cancel the navigation; 
}
  loginClick()
  {
    this.loginService.loginUser(this.loginVM.value).subscribe(
      (response)=>{
        // this.currentUserEmail=response.email;
        // sessionStorage.setItem('currentUserEmail',this.currentUserEmail);
          this.router.navigateByUrl("/home");
          this.notifyService.showSuccess("Logged In Success");
         //window.location.reload();
      },
      (error)=>{
        console.log(error);
        this.loginError=error.error;
        this.notifyService.showWarning("wrong UserName and Password");
      }
    );
  }
  // logOut()
  // {
  //   sessionStorage.removeItem('curresntUser');
  //   this.route.navigateByUrl("/home");
  // }
}
