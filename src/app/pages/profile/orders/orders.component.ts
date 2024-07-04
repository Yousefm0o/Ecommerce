import { order } from './../../../models/user.model';
import { Component } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  orders: Array<order> | undefined = [];

  constructor(private _user: ProfileService) {
    this.orders = this._user.userData?.orders
  }

}
