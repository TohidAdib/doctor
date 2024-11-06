import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import axiosInstance from './axios/axiosinstance';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/row-data.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  patient: any;
  isAdmin:boolean=false
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.loadAdminStatus();
  }
}
