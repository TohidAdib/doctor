import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './row-data.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (!this.authService.isStatusLoaded()) {
      await this.authService.loadAdminStatus();
    }
    if (this.authService.getAdminStatus()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
