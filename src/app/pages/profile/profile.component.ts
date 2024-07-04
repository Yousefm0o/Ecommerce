import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  selected: string = 'general';

  constructor(private router: Router, private _user: ProfileService) {}

  ngOnInit(): void {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.select(event.url);
      }
    });
    this.select(this.router.url);
  }

  get userData() {
    return this._user.userData;
  }

  select(url: string): void {
    if (url.includes('/profile/general')) {
      this.selected = 'general';
    } else if (url.includes('/profile/orders')) {
      this.selected = 'orders';
    } else if (url.includes('/profile/edit-profile')) {
      this.selected = 'edit';
    } else if (url.includes('/profile/change-password')) {
      this.selected = 'password';
    } else if (url.includes('/profile/payment-history')) {
      this.selected = 'history';
    }
    console.log(this.selected)
  }

}
