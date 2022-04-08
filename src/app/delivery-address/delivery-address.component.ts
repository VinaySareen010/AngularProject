import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeliveryAddress } from '../shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit {
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
    alert(this.data.userId);
    this.getUserAddressByUserId();
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
          this.dialogRef.close();
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  selectUser(addressId:number)
  {
  }
}
