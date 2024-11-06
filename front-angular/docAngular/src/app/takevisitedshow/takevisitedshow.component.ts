import { Component, OnInit } from '@angular/core';
import axiosInstance from '../axios/axiosinstance';
import { format } from "date-fns";
import Converter from 'persian-date-converter/index';
@Component({
  selector: 'app-takevisitedshow',
  standalone: true,
  imports: [],
  templateUrl: './takevisitedshow.component.html',
  styleUrl: './takevisitedshow.component.css'
})
export class TakevisitedshowComponent implements OnInit {
  user:any
  _date = new Converter();
  async ngOnInit() {
    try {
      const response = await axiosInstance.get("user/");
      const now = new Date();
      const ISODate = format(now, "yyyy-MM-dd");
      const nowTime = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
      const validUsers = response.data.patientUser.filter(
        (user:any) => user.visit_date < ISODate
      );
      this.user = validUsers
    } catch (error) {
      return
    }
  }
  toJalali(date:any){
    return this._date.convert(date,'fa')
  }
}
