import { Injectable } from '@angular/core';
import axiosInstance from "../axios/axiosinstance.js"
@Injectable({
  providedIn: 'root'
})
export class RowDataService {
  patient:any
  constructor() {
    const fetchData = async ()=>{
      try {
        const response = await axiosInstance.get("allpatient/")
        this.patient = response.data
      } catch (error) {
        return
      }
    }
    fetchData()
   }

}
