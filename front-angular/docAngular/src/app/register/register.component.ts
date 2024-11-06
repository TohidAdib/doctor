import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import axiosInstance from '../axios/axiosinstance';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  token: any;
  isAdmin: boolean = false;
  async ngOnInit() {
    this.token = localStorage.getItem('token');
    try {
      const response = await axiosInstance.get('user/');
      this.isAdmin = response.data.is_staff;
    } catch (error) {
      return;
    }
  }
}
