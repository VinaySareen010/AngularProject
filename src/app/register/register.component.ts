
import { Component,OnDestroy, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { UserService } from '../user.service';
import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
 
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit ,OnDestroy{
// user:User=new User();
msg:string="";
emailError:string='';
userNameError:string="";
image:string="";
submitted = false;
passStr:string="";

register=new FormGroup({
userName:new FormControl('', [Validators.required, Validators.minLength(6)]),
email:new FormControl('',{validators:[Validators.required,Validators.email],updateOn:"change"}),
password:new FormControl('',[Validators.minLength(5),Validators.required]),
confirmPassword:new FormControl('',[Validators.required]),
// registerDateTime:new FormControl('')
});
  constructor(private userService:UserService,private notifyService:NotificationService,private route:Router) { }
  ngOnInit(): void {
    document.body.className = "register";
  }
  debounceUserName()
  {
    this.register.get('userName')?.valueChanges.pipe(debounceTime(1000)).subscribe(
      (response)=>{
        if(response.length>=6)
        {
        console.log(this.register.value.userName);
        
        this.uniqueUserName();
        }
        else{
          this.userNameError='';
        }
        this.getErrorMessagename();
      }
    )
  }
  uniqueUserName()
  {
    this.userService.isUniqueUserName(this.register.value.userName).subscribe(
      (response)=>{ 
        this.userNameError='';
      },
      (error)=>{
        this.userNameError=error.error;
      }
    )
  }
debounceEmail()
{
  this.register.get('email')?.valueChanges.pipe(debounceTime(1000)).subscribe(
    (reponse)=>{
     
        console.log(this.register.value.email);
        this.getErrorMessage();
        this.uniqueEmail();
});
}
//email check
uniqueEmail()
{
  this.userService.isUniqueUser(this.register.value.email).subscribe(
    (response)=>{ console.log(response);
      this.emailError='';
   },
   (error)=>{
     this.emailError=error.error;
  }
  );
}
onStrengthChanged(strength: number) {
  (console.log("Password Strength=", strength))
	if ( strength <= 20 ) {
    this.passStr="Poor";
		} else if ( strength <= 40 ) {
      this.passStr="Weak";
		} else if ( strength <= 60 ) {
			this.passStr="Good";
		} else if (strength <= 80 ) {
			this.passStr="Very Good";
		} else {
			this.passStr="Excellent";
		}
}
//validations
getErrorMessage() {
  if (this.register.get('email')?.hasError('required')) {
    return 'You must enter a value';
  }
  return this.register.get('email')?.hasError('email') ? 'Not a valid email' : '';
}
getErrorMessagename()
{
  if (this.register.get('userName')?.hasError('required')) {
    return 'You must enter a value';
  }
  return this.register.get('userName')?.hasError('minlength') ? 'Username too Short' : '';
}
getErrorMessagepassword()
{
  if (this.register.get('password')?.hasError('required')) {
    return 'You must enter a value';
  }
  return this.register.get('password')?.hasError('minlength') ? 'Password Length too Short' : '';
}
getErrorMessageconfirmpassword()
{
  if (this.register.get('password')?.hasError('required')) {
    return 'You must enter a value';
  }
  return null;
}
  ngOnDestroy(){
    document.body.className="";
  }
  registerClick()
  {
    this.register.value.id=0;
    this.userService.registerUser(this.register.value).subscribe(
      (response)=>{
        debugger
        const now = new Date();
              now.setMinutes(now.getMinutes() + 15);
        localStorage.setItem('registerUserTime',now.toString());
        this.route.navigateByUrl("/login");
        this.notifyService.showSuccess("Register Successfully")
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  onUploadChange(e:any)
  {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        this.image=reader.result as string;
        this.register.value.image=reader.result;
  }
}
Vpassword()
{
  // const condition=form.get('password')?.value!==form.get('confirmPassword')?.value
  // return condition?{passwordDoNotMatch:true}:null;
  if(this.register.value.password==this.register.value.confirmPassword)
  {
    this.msg="";
  }
  else{
    this.msg="Password and ConfirmPassword not matched";
  }
}
}

