import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './components/header/header.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {CurrencyPipe} from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ProductsModule } from './pages/products/products.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './pages/products/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CartService } from './services/cart.service';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './components/header/click-outside.directive';
import { ProfileComponent } from './pages/profile/profile.component';
import { GeneralComponent } from './pages/profile/general/general.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { SettingsComponent } from './pages/profile/settings/settings.component';
import { PaymentHistoryComponent } from './pages/profile/payment-history/payment-history.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AuthenticationService } from './services/authentication.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { OrdersComponent } from './pages/profile/orders/orders.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductDetailsComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ClickOutsideDirective,
    ProfileComponent,
    GeneralComponent,
    EditProfileComponent,
    SettingsComponent,
    PaymentHistoryComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    ProductsModule,
    HttpClientModule,
    FormsModule,
    CurrencyPipe,
    MatTableModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatExpansionModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    CartService,
    AuthenticationService,
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
