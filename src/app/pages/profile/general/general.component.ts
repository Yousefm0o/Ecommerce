import { Component } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { Payment } from '../../../models/user.model';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrl: './general.component.css'
})
export class GeneralComponent {

  // private data;

  constructor(private _user: ProfileService) {
    // this.data = this._user.userData
  }

  get userData() {
    return this._user.userData;
  }

}
