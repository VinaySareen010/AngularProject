import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule}from '@angular/material/button';
import{ MatToolbarModule}from '@angular/material/toolbar';
import{ MatIconModule}from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import{ MatSliderModule } from '@angular/material/slider';
import{ MatListModule } from '@angular/material/list';
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { FlexLayoutModule } from '@angular/flex-layout';
import { JwtinterceptorService } from './jwtinterceptor.service';
import { DeleteComponent } from './delete/delete.component';
import { ProductguardService } from './productguard.service';
import { LoginguardService } from './loginguard.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserComponent } from './user/user.component';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { NgxStarsModule } from 'ngx-stars';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { PaymentSuccessFullComponent } from './payment-success-full/payment-success-full.component';
import { NgxImgZoomModule } from 'ngx-img-zoom';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { StripeModule } from 'stripe-angular';
import { NgxStripeModule } from 'ngx-stripe';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    LoginComponent,
    RegisterComponent,
    EmailConfirmationComponent,
    DeleteComponent,
    UserComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    PaymentPageComponent,
    PaymentSuccessFullComponent,
    DeliveryAddressComponent

    
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    MatSelectModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatListModule,
    MatPasswordStrengthModule.forRoot(),
    NgHttpLoaderModule.forRoot(),
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    NgxStarsModule,
    NgxImgZoomModule,
    MatRadioModule,
    NgxStripeModule.forRoot(''),
    AgGridModule.withComponents([]),
    StripeModule.forRoot("pk_test_51K2URhSGiYADUaEqKkYbQIDklsw8A5igk8ehux1rvFtkqig0iwTTWhFqsFPesMhQDA3GT4L3N9TJ3XRX3pxcORVE00eMpQnPrL")

    
    
  ],
  providers: [ProductguardService,LoginguardService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtinterceptorService,
      multi:true
     
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
