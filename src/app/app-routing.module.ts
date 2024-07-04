import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/products/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { register } from 'module';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { GeneralComponent } from './pages/profile/general/general.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { SettingsComponent } from './pages/profile/settings/settings.component';
import { PaymentHistoryComponent } from './pages/profile/payment-history/payment-history.component';
import { OrdersComponent } from './pages/profile/orders/orders.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: "home", pathMatch: "full"},
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile',
    component: ProfileComponent,
    children: [
      { path: 'general', component: GeneralComponent },
      { path: '', redirectTo: "general", pathMatch: "full"},
      { path: 'orders', component: OrdersComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'change-password', component: SettingsComponent },
      { path: 'payment-history', component: PaymentHistoryComponent },
      { path: '**', component: GeneralComponent}
    ]
  }
  // { path: '**', component: NotFoundComponent} // this must be at the end cause it matches everything not caught by previous paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
