import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStateService } from 'src/app/component-state.service';
import { User } from 'src/app/Entity/user';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user!: User; 

  constructor(private authService: AuthService, private componentStateService: ComponentStateService, private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      console.log('No user data found in localStorage.');
    }
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.authService.clearUserData();
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }

}
