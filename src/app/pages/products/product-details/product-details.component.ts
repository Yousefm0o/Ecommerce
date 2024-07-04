import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsAPIService } from '../products-api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../../../models/product.model';
import { Observable, Subscription } from 'rxjs';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnDestroy {

  product: Product | undefined;
  subscription: Subscription;

  constructor(private store: ProductsAPIService, private route: ActivatedRoute, private _cartService: CartService) {
    this.subscription = this.route.paramMap.subscribe({
      next: (params: ParamMap) => {
        let id = params.get('id');
        if (id) {
          this.store.getProduct(parseInt(id)).subscribe({
            next: (product: Product | undefined) => {
              this.product = product;
            },
            error: (error) => {
              console.error('Error fetching product:', error);
            }
          });
        }
      }
    })
  }

  addToCart() {
    this._cartService.addToCart({
      productImgs: this.product?.images,
      title: this.product?.title,
      price: this.product?.price,
      id: this.product?.id
    })
  }

  get sale() {
    let price = this.product?.price ?? 0;
    let sale = (this.product?.sale.value * price) / 100
    let newPrice = price - sale
    return Math.round(newPrice);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
