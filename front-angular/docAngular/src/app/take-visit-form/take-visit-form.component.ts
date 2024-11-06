import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import axiosInstance from '../axios/axiosinstance';
import { Router } from '@angular/router';

@Component({
  selector: 'app-take-visit-form',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './take-visit-form.component.html',
  styleUrl: './take-visit-form.component.css'
})
export class TakeVisitFormComponent implements OnInit {
  constructor(private router:Router){}
  userID:any
  userInformation:any
  sending:boolean=false
  async ngOnInit(){
    try {
      const response = await axiosInstance.get("user/");
      this.userID = response.data.id
      this.userInformation = response.data
    } catch (error) {
      return
    }
  }
  async onSubmit(f:NgForm){
    this.sending=true
    let data = {
      user: this.userID,
      visit_date: null,
      visit_time: null,
      ...f.value
    }
    try {
      const response = await axiosInstance.post("patient/", data);
      this.sending=false
      this.router.navigate([''])
    } catch (error) {
      this.sending=false
    }
  }
}
