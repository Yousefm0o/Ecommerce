import { Component } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  constructor(private _user: ProfileService) {
    // this.data = this._user.userData
  }

  get userData() {
    return this._user.userData;
  }

}
