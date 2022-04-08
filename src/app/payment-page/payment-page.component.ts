import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {
strikeCheckout:any = null;
data:any;
  constructor( private router:ActivatedRoute) { }
  ngOnInit(): void {
    debugger;
    this.router.queryParams.subscribe(
      (res)=>{
        this.data=res['Reference'];});
    this.stripePaymentGateway();
    this.checkout(this.data);
  }
  
  checkout(amount:number) {
    debugger;
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KlQnTSEeGnQ7VXDdEsanTn3SRNH3S0aCwf38NPOIoi1odhqhjMq4k0KLW8lclzjCIPci9JrjY1AEvmDlRaKQSxU00YkPpkURx',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
      }
    });
    strikeCheckout.open({
      name: 'RemoteStack',
      description: 'Payment widgets',
      amount: amount * 100
    });
  }
  stripePaymentGateway() {
    if(!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = "https://checkout.stripe.com/checkout.js";

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KlQnTSEeGnQ7VXDdEsanTn3SRNH3S0aCwf38NPOIoi1odhqhjMq4k0KLW8lclzjCIPci9JrjY1AEvmDlRaKQSxU00YkPpkURx',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            // this.route.navigate(['/paymentSuccessFull']); 
          }
        });
      }
      window.document.body.appendChild(scr);
    }
  }

}
