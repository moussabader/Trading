import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStateService } from 'src/app/component-state.service';
import { User } from 'src/app/Entity/user';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
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
    this.componentStateService.changeComponent('profile');
  }

  logout() {
    this.authService.clearUserData();
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }
}
