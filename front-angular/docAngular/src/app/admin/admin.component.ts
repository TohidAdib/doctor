import { Component, OnInit } from '@angular/core';
import axiosInstance from '../axios/axiosinstance';
import { format } from 'date-fns';
import Converter from 'persian-date-converter/index';
import { FormsModule, NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { date } from 'yup';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FormsModule,
    NgPersianDatepickerModule,
    ReactiveFormsModule,
    NgxMatTimepickerModule,
    NgIf,
    FormsModule,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  patients: any;
  user: any;
  userId: any;
  phisicalVisit: any;
  phisicalSendeing: boolean = false;
  sendeing: boolean = false;
  massage: string = '';
  dateValue = new FormControl();
  dateValuePhi = new FormControl();
  phisicalVisitDATA = {
    visit_date: null,
    visit_time: null,
  };
  async ngOnInit() {
    try {
      const response = await axiosInstance.get('allpatient/');
      const userResponse = await axiosInstance.get('user/');
      this.patients = response.data;
      this.user = userResponse.data;
      this.userId = userResponse.data.id;
    } catch (error) {
      console.log(error);
    }
  }
  _date = new Converter();
  toJalali(date: any) {
    let newDate: any = this._date.convert(date, 'fa');
    return newDate;
  }
  toMiladi(date: any) {
    let newDate: any = this._date.convert(date, 'en');
    const ISODate = format(newDate, 'yyyy-MM-dd');
    return ISODate;
  }
  async onClickPhisicalVisit(
    ID: number,
    NAME: string,
    NATIONALID: string,
    FATHERNAME: string,
    DESCRIPTION: string,
    EMAIL: string
  ) {
    let data = {
      user: this.userId,
      name: NAME,
      national_id: NATIONALID,
      father_name: FATHERNAME,
      description: DESCRIPTION,
      email: EMAIL,
      visit_date: this.toMiladi(this.phisicalVisitDATA.visit_date),
      visit_time: this.phisicalVisitDATA.visit_time,
    };
    try {
      this.phisicalSendeing = true;
      const response = await axiosInstance.put(`patient/${ID}/`,data);
      this.phisicalSendeing = false;
    } catch (error) {
      this.phisicalSendeing = false;
    }
  }
  async onSunmitAutoVisit(f: NgForm) {
    let autoVisit = {
      date: this.toMiladi(this.dateValue.value),
      ...f.value,
    };
    try {
      this.sendeing = true;
      const response = await axiosInstance.post('autovisit/', autoVisit);
      console.log(response.data);
      const response2 = await axiosInstance.get('allpatient/');
      this.patients = response2.data;
      this.sendeing = false;
      this.massage = 'نوبت ها با موفقیت ثبت شدند';
    } catch (error) {
      console.log(error);
      this.massage = 'لطفا مقادیر صحیح وار نمایید';
      this.sendeing = false;
    }
  }
  onSearch(e: Event) {
    const input = e.target as HTMLInputElement;

    const ids = document.querySelectorAll('.na_id');
    ids.forEach((f: any) => {
      const parent = f.closest('.admin-t_body');
      if (f.innerText.includes(input.value)) {
        parent.style.display = 'block';
      } else {
        parent.style.display = 'none';
      }
    });
  }
}
