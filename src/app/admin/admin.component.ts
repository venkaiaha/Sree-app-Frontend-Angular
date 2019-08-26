import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { environment } from '../..//environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent  implements OnInit {
  url = environment.Url;
  staff_all:any;
  required_staff:any;
  dataSource: any;

  
  displayedColumns: string[] = ['surname', 'first_name', 'role', 'employee_id', 'created_at', '_id', 'password']
  constructor(public router: Router, public http: HttpClient,
     public httpModule: Http,public dialog:MatDialog) {

    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    }

  }
  openDialog() {
    const dialogRef = this.dialog.open(ProfileComponent,{
      
        width: '350px',
      
    });
  }

  logout() {
    this.router.navigate(['login']);
    localStorage.clear();
  }
  a = JSON.parse(localStorage.getItem('data1'));
  username = this.a["name"]
  role = this.a["role"]

  getstaff(){
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    }
    this.http.get(this.url+'/staff/staff_id',httpOptions).subscribe(
      data =>{
        this.staff_all=data
        // console.log(data)
        for (let i in this.staff_all) {
          if (this.staff_all[i]['name'] == this.username && this.staff_all[i]['role'] == this.role) {
            this.required_staff=this.staff_all[i];
            console.log(this.required_staff);
            
          }
        }
        

         
        

      }
    )
  }
  
  
  ngOnInit() {
    this.getstaff();
    
    
  }

}
