import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-extrawork',
  templateUrl: './extrawork.component.html',
  styleUrls: ['./extrawork.component.scss']
})
export class ExtraworkComponent  {

  extraWork:FormGroup;
  users:User[]=[];
  constructor(private fb:FormBuilder,private user:UserService) {
   
    this.extraWork = this.fb.group({
      name: '',
      quantities: this.fb.array([]) ,
    });
  }
  getAll()
  {
    this.extraWork.get("items") as FormArray
    this.user.getAllUser().subscribe(
      (response)=>{
        this.users=response;
        console.log(response);
      },
      (error)=>{
        console.log()
      }
    );
  }
  ngOnInit(): void {
  }
   quantities() : FormArray {
    return this.extraWork.get("items") as FormArray
  }
  newQuantity(): FormGroup {
    return this.fb.group({
      qty: '',
      price: '',
    })
  }
  addQuantity() {
    this.quantities().push(this.newQuantity());
  }
   
  onSubmit() {
    console.log(this.extraWork.value);
  }
}
