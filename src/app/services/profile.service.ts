import { HttpClient } from '@angular/common/http';
import { Payment, User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private user: User | undefined;
  userSubscription: Subscription;

  constructor(private _http: HttpClient) {
    this.userSubscription = this._http.get<User>('../../assets/APIs/user.json').subscribe({
      next: (data: User) => {
        this.user = {
          fName: data.fName.charAt(0).toUpperCase() + data.fName.slice(1),
          lName: data.lName.charAt(0).toUpperCase() + data.lName.slice(1),
          userName: data.userName,
          phoneNumber: data.phoneNumber,
          pic: data.pic,
          orders: data.orders,
          paymentHistory: data.paymentHistory
        }
      }
    })
  }

  get userData() {
    return this.user;
  }

  get PaymentInfo(): Array<Payment> | undefined {
    return this.user?.paymentHistory
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }
}
