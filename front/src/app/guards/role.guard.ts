import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { User } from '../Entity/user';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const expectedRole = route.data?.['expectedRole']; // Get the expected role from route data
    const currentUser: User = this.authService.getCurrentUser(); // Assume this method returns the current user's roles
    
    if (!currentUser) {
      this.router.navigate(['/login']);
      return false;
    }

    const hasRole = currentUser.roles.some(r => r.name === expectedRole);
    console.log(currentUser.roles);
    
    
    if (!hasRole) {
      this.router.navigate(['/not-authorized']);
      return false;
    }
    
      return true;
  }
  
}
