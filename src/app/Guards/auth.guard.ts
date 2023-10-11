import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/auth/auth.service';
import { inject } from '@angular/core';

// Create a function that returns a CanActivateFn
export function authGuard(): CanActivateFn {
  // Return another function that takes the same parameters as canActivate
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    // Use inject to get the AuthService and Router instances
    const authService = inject(AuthService);
    const router = inject(Router);

    // Check if the user is authenticated
    if (authService.isAuthenticated.getValue()) {
      return true; // Allow access to the route
    } else {
      // Redirect the user to the login page or another appropriate route
      router.navigate(['/login']);
      return false; // Prevent access to the route
    }
  };
}
