import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import axiosInstance from '../axios/axiosinstance';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  isAdmin:boolean=false
  async ngOnInit() {
    try {
      const response = await axiosInstance.get("user/")
      this.isAdmin = response.data.is_staff
    } catch (error) {
      return
    }
  }
}
