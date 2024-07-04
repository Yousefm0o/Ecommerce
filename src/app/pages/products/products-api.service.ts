import { Product } from './../../models/product.model';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, map, of } from 'rxjs';
// const Store_Base_Url = 'https://api.escuelajs.co/api/v1'

@Injectable({
  providedIn: 'root'
})
export class ProductsAPIService implements OnDestroy {


private data: Array<Product> | undefined;
dataSubscription: Subscription;

constructor(private _http: HttpClient) {
  this.dataSubscription = this._http.get<Array<Product>>(`../../../assets/APIs/products.json`).subscribe({
    next: products => {
      this.data = products
    }
  })
}

// ngOnInit(): void {
//   this._http.get<Array<Product>>(`../../../assets/APIs/products.json`).subscribe({
//     next: products => {
//       this.data = products
//     }
//   })
// }

getProducts(): Observable<Array<Product>> {
  return this._http.get<Array<Product>>(`../../../assets/APIs/products.json`)
}

getProduct(id: number): Observable<Product | undefined> {
  return this.getProducts().pipe(
    map(products => products.find(p => p.id === id))
  );
}

getCategories(): Observable<Array<any>> {
  return this._http.get<Array<any>>(`../../../assets/APIs/categories.json`)
}

ngOnDestroy(): void {
  this.dataSubscription.unsubscribe()
}

}
