import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import axiosInstance from '../axios/axiosinstance';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  sending: boolean = false;
  isValidPass: boolean = true; // Initialized as true to hide the error initially

  constructor(private router: Router) {}

  async onSubmit(f: NgForm) {
    if (!this.isValidPass) return; // Prevent submission if passwords don't match

    this.sending = true;
    try {
      const response = await axiosInstance.post('signin/', f.value);
      const token = await axiosInstance.post('api/token/', f.value);
      localStorage.setItem('token', token.data.access);
      this.sending = false;
      window.location.href = '';
    } catch (error) {
      this.sending = false;
    }
  }

  passwordsMatch(password: NgModel, confirmPassword: NgModel): void {
    this.isValidPass = password.value === confirmPassword.value;
  }
}
