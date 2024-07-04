import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsAPIService } from './products-api.service';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product.model';
import { SharedCategoryService } from './shared-category.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Array<Product> = [];
  categories: Array<any> | undefined;

  productsSubscription: Subscription | undefined;
  categoriesSubscription: Subscription | undefined;

  filter: string = "All";

  constructor(private productsApi: ProductsAPIService, private _sharedCategory: SharedCategoryService) {}

ngOnInit(): void {
  this.productsSubscription = this.productsApi.getProducts().subscribe({
    next: (_products) => {
    this.products = _products;
    }
  });
  this.categoriesSubscription = this.productsApi.getCategories().subscribe({
    next: (_categories) => {
      this.categories = _categories
    }
  })
  this.filter = this._sharedCategory.getData()
}

changeFilter(_filter: string) {
  this._sharedCategory.setData(_filter)
  this.filter = _filter;
}

ngOnDestroy(): void {
  this.productsSubscription?.unsubscribe();
  this.categoriesSubscription?.unsubscribe();
  this._sharedCategory.setData("All");
  this.filter = this._sharedCategory.getData()
}

}
