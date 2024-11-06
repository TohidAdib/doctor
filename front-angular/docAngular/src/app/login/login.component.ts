import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axiosInstance from '../axios/axiosinstance';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router) {}
  sending: boolean = false;

  async onSubmit(f: any) {
    this.sending = true;
    try {
      const response = await axiosInstance.post('login/', f.value);
      const token = await axiosInstance.post('api/token/', f.value);
      localStorage.setItem('token', token.data.access);
      this.sending = false;
      window.location.href = ''
    } catch (error) {
      this.sending = false;
    }
  }
}
