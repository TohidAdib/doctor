import { Component, OnInit } from '@angular/core';
import axiosInstance from '../axios/axiosinstance';
import { format } from "date-fns";
import Converter from 'persian-date-converter/index';
@Component({
  selector: 'app-takevisitshow',
  standalone: true,
  imports: [],
  templateUrl: './takevisitshow.component.html',
  styleUrl: './takevisitshow.component.css'
})
export class TakevisitshowComponent implements OnInit {
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

      // فیلتر کردن کاربران بر اساس تاریخ و زمان
      const validUsers = response.data.patientUser.filter((user:any) => {
        // اگر تاریخ بازدید null است یا از امروز یا بعد از آن است
        if (user.visit_date === null || user.visit_date > ISODate) {
          return true; // تاریخ فردا یا بعد از آن باشد، نشان می‌دهیم
        }

        // اگر تاریخ بازدید برابر با امروز است
        if (user.visit_date === ISODate) {
          // فقط کاربرانی را که ساعت بازدیدشان هنوز نیامده یا null است، نشان می‌دهیم
          return user.visit_time === null || user.visit_time >= nowTime;
        }

        return false; // تاریخ گذشته باشد، نشان نمی‌دهیم
      });
      console.log(validUsers)
      this.user=validUsers
    } catch (error) {
      return
    }
  }
  toJalali(date:any){
    return this._date.convert(date,'fa')
  }
}
