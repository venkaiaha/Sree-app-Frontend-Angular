import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { stringify } from '@angular/compiler/src/util';
import { environment } from '../../../environments/environment';
import { CompanyRegistrationComponent } from '../company-registration/company-registration.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';

@Component({
  selector: 'app-staff-registration',
  templateUrl: './staff-registration.component.html',
  styleUrls: ['./staff-registration.component.scss']
})
export class StaffRegistrationComponent extends CompanyRegistrationComponent implements OnInit {
  url = environment.Url;
  surname: string;
  first_name: string;
  role: string;
  employeeId: string;
  password: string;
  mobile:any;
  email:any;
  

  constructor(public router: Router, public http: HttpClient,public dialog: MatDialog, public httpModule: Http) {
    super( router, dialog, http, httpModule);
    console.log(super( router, dialog, http, httpModule));
  }
  register() {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    const body = {
      // salutation: this.surname,
      surname: this.surname,
      name: this.first_name,
      role: this.role,
      employ_id: this.employeeId,
      password: this.password,
      phone:this.mobile,
      email:this.email,
    

    }
    // console.log(body);


    this.http.post(this.url + '/staff', body, httpOptions).subscribe(data => {
      console.log(data);
      this.router.navigate(['/login']);
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['']);
      }
    }
    );
  }
  ngOnInit() {
  }

}
