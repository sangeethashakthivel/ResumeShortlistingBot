import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './component/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLoginPopup = false;
  currentRoute = '';

  constructor(private router: Router, private authService: AuthService) {
    // Track current route to hide default page on admin
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  adminClick() {
    this.showLoginPopup = true;
  }

  closePopup() {
    this.showLoginPopup = false;
  }

  isAdminRoute(): boolean {
    return this.currentRoute.startsWith('/admin');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
