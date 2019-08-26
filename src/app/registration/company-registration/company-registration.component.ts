import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { OperatorService } from '../operator.service';
import { stringify } from '@angular/compiler/src/util';
import { AlertPopupComponent } from '../../alert-popup/alert-popup.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {
  salutation: string;
  surname: string;
  name: string;
  cu_date_of_birth: any;
  cu_gender: string;
  cu_nationality: string;
  cu_company_name: string;
  cu_joining_date
  : any;
  cu_abn: string;
  cu_acn: string;
  cu_tfn: string;
  cu_bas_period: string;
  cu_preferred_bookkeeper: string='';
  cu_preferred_accountant: string='';
  cu_external_customer: boolean;
  cu_mobile: string;
  cu_home: string;
  cu_work: string;
  cu_email: string;
  cu_line: string;
  cu_street: string;
  cu_city: string;
  cu_state: string;
  cu_post_code: string;
  marital_status: string;
  spouse_name: string;
  spouse_date_of_birth: any;
  spouse_mobile: string;
  spouse_email: string;
  spouse_tfn: string;
  spouse_number_of_children: number;
  company_name: string;
  owner_name: string;
  o_date_of_birth: any;
  o_gender: string;
  o_nationality: string;
  o_abn: string;
  o_acn: string;
  o_tfn: string;
  business_name: string;
  o_line: string
  o_street: string;
  o_city: string;
  o_state: string;
  o_post_code: string;
  gst: boolean;
  payer: boolean;
  co_bas_period: string;
  co_mobile: string;
  co_home: string;
  co_work: string;
  co_email: string;
  co_preferred_bookkeeper: string = '';
  co_preferred_accountant: string ='';
  formation_date: any;
  url = environment.Url;
body: any='';
body1: any='';
  constructor(public router: Router, public dialog: MatDialog, public http: HttpClient, public httpModule: Http, public service: OperatorService) {
  }
  // Company registration
  register1() {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
   this.body = {
      company_name: this.company_name,
      owner_name: this.owner_name,
      dob: this.cu_date_of_birth,
      gender: this.o_gender,
      nationality: this.o_nationality,
      abn: this.o_abn,
      acn: this.o_acn,
      tfn: this.o_tfn,
      business_name: this.business_name,
      business_address: {
        line: this.o_line,
        street: this.o_street,
        city: this.o_city,
        "state/territory": this.o_state,
        post_code: this.o_post_code
      },
      registered_address: {
        line: this.o_line,
        street: this.o_street,
        city: this.o_city,
        "state/territory": this.o_state,
        post_code: this.o_post_code
      },
      gst: String(this.gst).toLocaleLowerCase() == 'true' ? true : false,
      payer: String(this.payer).toLocaleLowerCase() == 'true' ? true : false,
      bas_period: this.co_bas_period,
      phone: {
        mobile: this.co_mobile,
        home: this.co_home,
        wok: this.co_work
      },
      email: this.co_email,
      formation_date: stringify(this.formation_date),
      preferred_accountant: this.co_preferred_accountant

    }
    console.log(this.body);

    this.http.post(this.url + '/company', this.body, httpOptions).subscribe(data => {
      console.log(data)
      this.body =''
      const dialogRef = this.dialog.open(AlertPopupComponent, {
        width: '350px', height: '300px',
        data: {
          'msg': data['msg']
        }

      })

      dialogRef.afterClosed().subscribe(result => { })
    });
  }
  // customer Registration
  register() {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    this.body1 = {
      salutation: this.salutation,
      surname: this.surname,
      name: this.name,
      dob: this.cu_date_of_birth,
      gender: this.cu_gender,
      nationality: this.cu_nationality,
      company_name: this.cu_company_name,
      date_of_joining: this.cu_joining_date,
      abn: this.cu_abn,
      acn: this.cu_acn,
      tfn: this.cu_tfn,
      bas_period: this.cu_bas_period,
      preferred_accountant: this.cu_preferred_accountant,
      external_customer: String(this.cu_external_customer).toLocaleLowerCase() == 'true' ? true : false,
      phone: {
        mobile: this.cu_mobile,
        home: this.cu_home,
        wok: this.cu_work
      },
      email: this.cu_email,
      address: {
        line: this.cu_line,
        street: this.cu_street,
        city: this.cu_city,
        "state/territory": this.cu_state,
        post_code: this.cu_post_code
      },
      "marital status": this.marital_status,
      spouse: {
        first_name: this.spouse_name,
        date_of_birth: this.spouse_date_of_birth,
        mobile: this.spouse_mobile,
        email: this.spouse_email,
        tfn: this.spouse_tfn
      },
      number_of_children: this.spouse_number_of_children,
    }
    console.log(this.body1);


    this.http.post(this.url + '/customer', this.body1, httpOptions).subscribe(data => {
      console.log(data);
      this.body1=''
      const dialogRef = this.dialog.open(AlertPopupComponent, {
        width: '350px', height: '300px',
        data: {
          'msg': data['msg']
        }

      })
      dialogRef.afterClosed().subscribe(result => { })
    });
  }
  ngOnInit() {
  }
}


