import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { OperatorService } from './../registration/operator.service';
import { environment } from '../../environments/environment';
import { ProfileComponent } from '../profile/profile.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  url = environment.Url;
  flag0 = true;
  flag1 = false;
  flag2 = false;
  a = JSON.parse(localStorage.getItem('data1'));
  username = this.a["name"]
  role = this.a["role"]
  constructor(public router: Router, public http: HttpClient, 
    public httpModule: Http, public service: OperatorService,public dialog:MatDialog) {
  }
  openDialog() {
    const dialogRef = this.dialog.open(ProfileComponent,{
      
        width: '350px',
      
    });
  }
  logout() {
    // var a = localStorage.getItem('a')

    // console.log(a);
    localStorage.clear();
        this.router.navigate(['login']);
    // if('access_token_cookie'== null) {
    //   console.log("token removed")
    // }
    // this.router.navigate(['login']);
    // console.log(this.a)
  }
  cust(event) {
    console.log(event);
    if (this.flag0 === true) {
      this.flag1 = false;
      this.flag2 = false;
    } else {
      this.flag0 = true;
      this.flag1 = false;
      this.flag2 = false;
    }
    console.log(this.flag1,this.flag2,this.flag0)
  }
  cust1() {
    this.flag1 = true;
    if (this.flag1 === true) {
      this.flag0 = false;
      this.flag2 = false;
    }
  }
  cust2() {
    this.flag2 = true;
    if (this.flag2 === true) {
      this.flag0 = false;
      this.flag1 = false;
    }
  }
}

