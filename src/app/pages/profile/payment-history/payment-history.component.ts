import { Component } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { Payment, User } from '../../../models/user.model';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.css'
})
export class PaymentHistoryComponent {

private paymentInfo: Array<Payment> | undefined = [];

  constructor(private _user: ProfileService) {
    this.paymentInfo = this._user.PaymentInfo
  }

get payments(): Array<Payment>| null {
  if (this.paymentInfo) {
    return this.paymentInfo.slice().reverse();
  } else {
    return null
  }
}

get length() {
  if (this.payments?.length) {
    return this.payments?.length
  } else {
    return 0;
  }
}

}
