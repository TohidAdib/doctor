import { Injectable } from '@angular/core';
import axiosInstance from '../axios/axiosinstance';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdmin: boolean = false;
  private isAdminLoaded: boolean = false;

  async loadAdminStatus(): Promise<void> {
    try {
      const response = await axiosInstance.get("user/");
      this.isAdmin = response.data.is_staff;
      this.isAdminLoaded = true;
    } catch (error) {
      console.error("Error loading admin status:", error);
    }
  }

  getAdminStatus(): boolean {
    return this.isAdmin;
  }

  isStatusLoaded(): boolean {
    return this.isAdminLoaded;
  }
}
