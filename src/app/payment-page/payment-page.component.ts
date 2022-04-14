import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { StripeScriptTag } from "stripe-angular"


@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss'],
 
})
export class PaymentPageComponent implements OnInit {
payment:any;

  constructor(private route:ActivatedRoute,public router: Router) {}
    ngOnInit(): void {
      debugger;
      this.route.queryParams.subscribe(
      (res)=>{
        this.payment=res['Reference'];});
        this.pay(this.payment);
    }
    handler:any = null;
    pay(amount:number) {    
  
      var handler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51K2URhSGiYADUaEqKkYbQIDklsw8A5igk8ehux1rvFtkqig0iwTTWhFqsFPesMhQDA3GT4L3N9TJ3XRX3pxcORVE00eMpQnPrL',
        locale: 'auto',
        token: function (token: any) {
          this.loadStripe();
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
          console.log(token)
          alert('Token Created!!');
        }
      });
    
      handler.open({
        name: 'Product Shopping',
        description: 'Please Enter your Card Details',
        amount: amount * 100
      });
    
    }
    
    loadStripe() {
        debugger;
      if(!window.document.getElementById('stripe-script')) {
        var s = window.document.createElement("script");
        s.id = "stripe-script";
        s.type = "text/javascript";
        s.src = "https://checkout.stripe.com/checkout.js";
        s.onload = () => {
          this.handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_51K2URhSGiYADUaEqKkYbQIDklsw8A5igk8ehux1rvFtkqig0iwTTWhFqsFPesMhQDA3GT4L3N9TJ3XRX3pxcORVE00eMpQnPrL',
            locale: 'auto',
            token: function (token: any) {
              // You can access the token ID with `token.id`.
              // Get the token ID to your server-side code for use.
              console.log(token)
              alert('Payment Success!!');
            }
          });
        }
        window.document.body.appendChild(s);
      }
    }
    navigateWithState() {

     this.router.navigate(['/paymentSuccessFull'], { state: { id: "email" ,password: "password" } });

    }
  }



