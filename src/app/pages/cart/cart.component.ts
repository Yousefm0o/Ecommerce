import { Component, OnDestroy } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { Observable, Subscription } from 'rxjs';

export interface Transaction {
  item: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnDestroy {

  cart: Cart | any;
  cartSubscription: Subscription;


  displayedColumns = ['product', 'name', 'price', 'quantity', 'total', 'action'];

  constructor(private _cartService: CartService) {
    this.cartSubscription = this._cartService.cart
    .subscribe(_cart => {
      if(_cart.items) {
        this.cart = _cart.items;
      }
    })
  }

  getEveryTotal(prod: CartItem) {
    if (prod.saleExist) {
      return prod.newPrice * prod.quantity;
    } else {
      return prod.price * prod.quantity;
    }
  }

  get totalCost() {
    return this._cartService.totalCost();
  }

  increaseQuantity(prod: CartItem) {
    this._cartService.addToCart(prod);
  }

  decreaseQuantity(prod: CartItem) {
    this._cartService.decreaseQunatity(prod)
  }

  removeItem(prod: CartItem) {
    this._cartService.removeItem(prod);
  }

  clearCart() {
    this._cartService.clearCart();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
