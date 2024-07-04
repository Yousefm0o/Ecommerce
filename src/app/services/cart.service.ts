import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private subject = new Subject();

  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) {}

  emit(event: string, data: any) {
    this.subject.next({event, data})
  }

  listen(event: string, callback: (event: any) => void) {
    this.subject.asObservable().subscribe((data: any) => {
      if (data.event == event) {
        callback(data.data)
      }
    })
  }

  addToCart(item: any): void {
    let items = [...this.cart.value.items]
    let checkedItem = items.find(_item => _item.id == item.id)

    if (checkedItem) {
      checkedItem.quantity++
    } else {
      item.quantity = 1
      items.push(item)
    }

    this.cart.next({items})
    this._snackBar.open('1 item added to the cart.', 'Ok', {
      duration: 2500,
      panelClass: ['snackbar-success']
    })
  }

  decreaseQunatity(item: any): void {
    let items = [...this.cart.value.items]

    if (item.quantity > 1) {
      item.quantity--;
      this.cart.next({items})
      this._snackBar.open('1 item removed from the cart.', 'Ok', {
        duration: 2500,
        panelClass: ['snackbar-warning']
      })
    } else {
      this.removeItem(item)
    }
  }

  removeItem(item: any): void {
    let items = [...this.cart.value.items]

    const index = items.indexOf(item);
    if (index > -1) {
      items.splice(index, 1);
    }
    console.log(items)
    console.log(this.cart)

    this.cart.next({items})
    this._snackBar.open('Item is totally removed from the cart.', 'Ok', {
      duration: 2500,
      panelClass: ['snackbar-danger']
    })
  }

  clearCart(): void {
    this.cart.next({items: []})
    this._snackBar.open('Cart is cleared.', 'Ok', {
      duration: 2500,
      panelClass: ['snackbar-danger']
    })
  }

  totalCost(): number {
    return this.cart.value.items
    .map((prod: any) => {
      if (prod.saleExist) {
        return prod.newPrice * prod.quantity
      } else {
        return prod.price * prod.quantity
      }
    })
    .reduce((acc: number, value: number) => acc + value, 0);
  }

}
