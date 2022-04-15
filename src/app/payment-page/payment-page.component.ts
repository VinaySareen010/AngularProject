import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
declare var Razorpay: any;
@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss'],
 
})
export class PaymentPageComponent implements OnInit {
  
 
totalCost:any;
state$:any;
stripePromise:any;
deliveryAddressId:any;

message:any = "Not yet stared";
paymentId = "";
error = "";
title = 'angular-razorpay-intergration';
options = {
  "key": "",
  "amount": "200",
  "name": "Abhijit Gatade",
  "description": "Web Development",
  "image": "https://www.abhijitgatade.com/assets/img/favicon.png",
  "order_id": "",
  "handler": function (response: any) {
    var event = new CustomEvent("payment.success",
      {
        detail: response,
        bubbles: true,
        cancelable: true
      }
    );
    window.dispatchEvent(event);
  },
  "prefill": {
    "name": "",
    "email": "",
    "contact": ""
  },
  "notes": {
    "address": ""
  },
  "theme": {
    "color": "#3399cc"
  }
};
ngOnInit(): void {
  this.paynow();
}
paynow() {
  this.paymentId = '';
  this.error = '';
  this.options.amount = "200"; //paise
  this.options.prefill.name = "Kishor";
  this.options.prefill.email = "gatadeabhijit@gmail.com";
  this.options.prefill.contact = "9561320192";
  var rzp1 = new Razorpay(this.options);
  rzp1.open();
  rzp1.on('payment.failed', function (response: any) {
    //this.message = "Payment Failed";
    // Todo - store this information in the server
    console.log(response.error.code);
    console.log(response.error.description);
    console.log(response.error.source);
    console.log(response.error.step);
    console.log(response.error.reason);
    console.log(response.error.metadata.order_id);
    console.log(response.error.metadata.payment_id);
    //this.error = response.error.reason;
  }
  );
}
@HostListener('window:payment.success', ['$event'])
onPaymentSuccess(event: any): void {
  this.message = "Success Payment";
} 
   
}

