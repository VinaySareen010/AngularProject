import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
 
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit ,OnDestroy{
 
// user:User=new User();
// pass:any="";
// conPass:any="";
msg:string="";

image:string="";
submitted = false;

register=new FormGroup({
userName:new FormControl('', [Validators.required, Validators.minLength(6)]),
email:new FormControl('',[Validators.required,Validators.email]),
password:new FormControl('',[Validators.minLength(5),Validators.required]),
confirmPassword:new FormControl('',[Validators.required])
}
);


  constructor(private userService:UserService,private notifyService:NotificationService,private route:Router,private formBuilder:FormBuilder) { 
    // this.register = this.formBuilder.group({
    //   userName: ["", Validators.required,Validators.minLength(4)],
    //   email: ["", [Validators.required, Validators.email]],
    //   password: ["",Validators.required,Validators.minLength(4)],
    //   confirmPassword: ["", Validators.required],
    //   image:[""]
    // });
  }

  ngOnInit(): void {
    document.body.className = "register";
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
    if (this.register.dirty && this.register.valid) {
      alert(`NAME: ${this.register.value.userName} Email: ${this.register.value.email}`);
    }
  
    this.register.value.id=0;
    this.userService.registerUser(this.register.value).subscribe(
      (response)=>{
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
  if(this.register.value.password==this.register.value.confirmPassword)
  {
    this.msg="PasWord Match";
    // this.register.value.confirmPassword.setErrors(null);
  }
  else{
    this.msg="Not Mached";
    // this.register.value.confirmPassword.setErrors({Wrong:true});
  }
  // debugger;
  // if(this.user.password!=this.user.confirmPassWord){
  //   this.msg="Not mached"
}
 
  // debugger;
  // const {value:password}=this.user.password;
  // const {value:confirmPassWord}=this.user.confirmPassWord;
  // return password==confirmPassWord?null:{passwordmatch:false};
}

