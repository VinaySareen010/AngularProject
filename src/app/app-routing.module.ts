import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DeleteComponent } from './delete/delete.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ExtraComponent } from './extra/extra.component';
import { ExtraworkComponent } from './extrawork/extrawork.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginguardService } from './loginguard.service';
import { ProductComponent } from './product/product.component';
import { ProductguardService } from './productguard.service';
import { RegisterComponent } from './register/register.component';
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
  {path:"extra",component:ExtraComponent},
  {path:"extrawork",component:ExtraworkComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
