import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  dateYear = new Date().getFullYear();

  hideFooter: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this.hideFooterOnLoginPage(event.url);
        }
      });
  }

  hideFooterOnLoginPage(url: string) {
    if (url.includes('/login') || url.includes('register') || url.includes('profile')) {
        this.hideFooter = true;
    } else {
        this.hideFooter = false;
    }
}

}
