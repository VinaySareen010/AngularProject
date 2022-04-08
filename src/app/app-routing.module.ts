import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginguardService } from './loginguard.service';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { PaymentSuccessFullComponent } from './payment-success-full/payment-success-full.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product/product.component';
import { ProductguardService } from './productguard.service';
import { RegisterComponent } from './register/register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home",component:HomeComponent,canActivate:[ProductguardService]},
  {path:"product",component:ProductComponent},
  {path:"user",component:UserComponent},
  {path:"login",component:LoginComponent,canActivate:[LoginguardService]},
  {path:"register",component:RegisterComponent},
  {path:"emailConfirmation",component:EmailConfirmationComponent},
  {path:"delete",component:DeleteComponent},
  {path:"productDetail",component:ProductDetailsComponent},
  {path:"shoppingCart",component:ShoppingCartComponent},
  {path:"paymentPage",component:PaymentPageComponent},
  {path:"paymentSuccessFull",component:PaymentSuccessFullComponent},
  {path:"deliveryAddress",component:DeliveryAddressComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
