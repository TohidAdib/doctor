import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import axiosInstance from './axios/axiosinstance';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  patient: any;

  async ngOnInit() {
    try {
      const response = await axiosInstance.get('allpatient/');
      this.patient = response.data;
    } catch (error) {
      return;
    }
  }
}
