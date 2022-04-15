import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DeliveryAddress } from '../shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';


enum NodeType {
  Home=1,
  Work
}

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit {
  nodeType=NodeType;
deliveryAddress:any;
addressForm=new FormGroup({
id:new FormControl(''),
userId:new FormControl(''),
address:new FormControl(''),
nearBy:new FormControl(''),
phone:new FormControl(''),
city:new FormControl(''),
state:new FormControl(''),
country:new FormControl(''),
alternatephoneNumber:new FormControl(null),
pinCode:new FormControl(''),
addressType:new FormControl(0)
});

  constructor( public dialogRef: MatDialogRef<DeliveryAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DeliveryAddress,private shoppingCartService:ShoppingCartService) { }
  ngOnInit(): void {
    this.getUserAddressByUserId();
  }
  public onClick(node: NodeType): void {
    debugger;
    this.addressForm.value.addressType = node;
  }
  getUserAddressByUserId()
  {
    this.shoppingCartService.getUserAddressByUserId(this.data.userId).subscribe(
      (response)=>{
        console.log(response);
        this.deliveryAddress=response;
      },
      (error)=>{
        console.log(error); 
      }
    )
  }
  saveAddress()
  {
    var currentUser:any=sessionStorage.getItem('currentUser');
    var userDetail:any=JSON.parse(currentUser);
    const userId=userDetail.id;
    console.warn(this.addressForm.value);
    this.addressForm.value.id=0;
    this.addressForm.value.userId=userId;
    this.shoppingCartService.saveAddress(this.addressForm.value).subscribe(
      (response)=>{
          this.dialogRef.close(response.id);
          // this.selectUserAddress(response.id);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  onNoClick(addressId:number): void {
    this.dialogRef.close(addressId);
  }
  // selectUserAddress(addressId:number)
  // {
  //   alert(addressId);
  // }
}
