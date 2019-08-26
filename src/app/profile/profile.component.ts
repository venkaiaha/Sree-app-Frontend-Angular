import { Component, OnInit,Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  url = environment.Url;
  // staff_all:any;
  required_staff:any;
  // a = JSON.parse(localStorage.getItem('data1'));
  // username = this.a["name"]
  // role = this.a["role"]
  message: any;
  constructor(public router: Router, public http: HttpClient){}

  // constructor(public http:HttpClient) { }

  getstaff(){
    const httpOptions = {
      headers: new  HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',

      })
    }
    this.http.get(this.url+'/staff/staff_id',httpOptions).subscribe(
      data =>{
        this.required_staff=data
        console.log(data)
        // for (let i in this.staff_all) {
        //   if (this.staff_all[i]['name'] == this.username && this.staff_all[i]['role'] == this.role) {
        //     this.required_staff=this.staff_all[i];
        //     console.log(this.required_staff);
            
        //   }
      // }
        

         
        

      }
    )
  }
  
  
  ngOnInit() {
    this.getstaff();
    
    
  }

}
