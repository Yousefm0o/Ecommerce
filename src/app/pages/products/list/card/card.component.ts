import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { EventBusService } from '../../event-bus.service';
import { ProductsAPIService } from '../../products-api.service';
import { Router } from '@angular/router';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

@Input() product: Product | undefined;
@Output() cartAdding = new EventEmitter<Product>();

widthState: boolean = false;
cardStyle: string = '';

constructor(private _eventService: EventBusService, private store: ProductsAPIService, private router: Router, private _cartService: CartService) {
  this._eventService.listen(("view"), (data: any) => {
    this.widthState = data.state
    if (this.widthState === true) {
      this.cardStyle = 'width: 100%'
    } else {
      this.cardStyle = ''
    }
  })
}

goToDetails(id: any) {
  this.router.navigate([`/products`, id]);
}

addToCart(e: any) {
  e.stopPropagation()
  this._cartService.addToCart({
    productImg: this.product?.images[0],
    title: this.product?.title,
    price: this.product?.price,
    id: this.product?.id,
    saleExist: this.product?.sale.saleExist,
    newPrice: this.sale
  })
}

get sale() {
  let price = this.product?.price ?? 0;
  let sale = (this.product?.sale.value * price) / 100
  let newPrice = price - sale
  return Math.round(newPrice);
}

}
