import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Cart, CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { Subscription, filter } from 'rxjs';
import { EventBusService } from '../../pages/products/event-bus.service';
import { ProfileService } from '../../services/profile.service';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnDestroy {

  loggedIn = true;

  productsInCart: Cart | any;
  cartSubscription: Subscription;

  openMenuUser: boolean = false;
  openMenuCart: boolean = false;
  openMenuLinks: boolean = false;

  constructor(private _router : Router, private _cartService: CartService, private _eventService: EventBusService, private _user: ProfileService) {
    this.cartSubscription = this._cartService.cart.subscribe(cart => {
      if(cart.items) {
        this.productsInCart = cart.items;
      }
    });
  }

  get userData() {
    return this._user.userData;
  }

  scrollToContact(): void {
    this._router.navigate(['home']);
    setTimeout(() => {
      this._eventService.emit('scroll-to', 'contact');
    }, 400)
  }

  goHome() {
    this._router.navigate(['home']);
  }

  get totalCost(): number {
    return this._cartService.totalCost()
  }

  get numberOfItems(): number {
    return this.productsInCart
    .map((prod: any) => prod.quantity)
    .reduce((acc: number, value: number) => acc + value, 0);
  }

  clearCart() {
    this._cartService.clearCart();
  }

  openUserMenu(e: any) {
    e.stopPropagation()
    this.openMenuCart = false;
    this.openMenuLinks = false;
    this.openMenuUser = !this.openMenuUser;
  }

  openCartMenu(e: any) {
    e.stopPropagation()
    this.openMenuUser = false;
    this.openMenuLinks = false;
    this.openMenuCart = !this.openMenuCart;

  }

  closeMenu() {
    this.openMenuUser = false;
    this.openMenuCart = false;
    this.openMenuLinks = false;
  }

  openMenu(e: any) {
    e.stopPropagation()
    this.openMenuUser = false;
    this.openMenuCart = false;
    this.openMenuLinks = !this.openMenuLinks;

    console.log(this.openMenuLinks)
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

}
