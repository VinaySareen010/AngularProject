import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { DeliveryAddressComponent } from '../delivery-address/delivery-address.component';
import { NotificationService } from '../notification.service';

import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  userId!:number;
cartData!:any[];
totalCost:number=0;
displayedColumns: string[] = ['Items','count','Action']
// displayedColumns: string[] = ['Items','count','Price','Action','Action2']
  constructor(private shoppingCartService:ShoppingCartService,private router:Router,public dialog: MatDialog,private notifyService:NotificationService) {}
  ngOnInit(): void {
    var currentUser:any=sessionStorage.getItem('currentUser');
    var userDetail:any=JSON.parse(currentUser);
    this.userId=userDetail.id;
    this.shoppingCartService.getShoppingCartDetailsByUserId(this.userId).subscribe(
      (response:any)=>{
        console.log(response);
        this.cartData=response;
         const createData=this.cartData
        //  const data2= this.cartData.map(t=>t.count); //get column values form array
         this.getTotalCost();
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  deleteData()
  {
    alert("Are You Sure")
  }
  getTotalCost() {
    debugger;
    const data1= this.cartData.map(t=>t.count)
    const data2=this.cartData.map(t => t.product.price)
    var sum:any;
    for(let i=0;i<data1.length;i++)
    {
      sum = data1[i]*data2[i];
      this.totalCost +=sum;
    }
    //  this.totalCost=data3.reduce((acc:any, value:any) => acc + value, 0);
  }
 DeliveryAddressSelect()
  {
    const dialogRef = this.dialog.open(DeliveryAddressComponent, {
      width: '900px',
      height:'700px',
      data: { userId:this.userId},
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  
}
makePayment()
{
  let navigationExtras: NavigationExtras = {
      queryParams: {
          Reference: this.totalCost,
      }
     };
      this.router.navigate(['/paymentPage'],navigationExtras);
  }
}

