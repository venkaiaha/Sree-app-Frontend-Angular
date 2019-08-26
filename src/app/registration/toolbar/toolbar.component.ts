import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { UserService } from '../../user.service';
import { environment } from '../../../environments/environment';
import { AlertPopupComponent } from '../../alert-popup/alert-popup.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent  {
  a = JSON.parse(localStorage.getItem('data1'));
  username = this.a["name"]
  role = this.a["role"]
  menuFlag: boolean = true;
  constructor(public router: Router) {  }
  logout() {
    this.router.navigate(['login']);
    localStorage.clear();
  }
  ngOnInit() {
  }

}
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  // valForm: FormGroup;
  // hide = true;
  // url = environment.Url;
  // username: string;
  // email: string;
  // role: string;
  // secretkey: any;
  // password: any;
  // color: 'warning';
  // isActive: boolean = false;
  // details: any;
  // c: any;
  // b: any;
  // registerForm: any;
  // submitted = false;
  // dataSource: any;

  // displayedColumns: string[] = ['company_name', 'owner_name', 'abn', 'acn', 'tfn', 'business_name', 'bas_period', 'phone', 'email', 'preferred_accountant', 'view'];

  // displayedColumn: string[] = ["name", 'company_name', "date_of_joining", "abn", "acn", "tfn", 'bas_period', 'phone', "email", 'preferred_accountant', 'view'];

  // dataset: any;
  // a = JSON.parse(localStorage.getItem('data1'));

  // constructor(public dialog: MatDialog, public router: Router, public http: HttpClient, public httpModule: Http) {
  //   // if (this.type == null) {
  //     this.getDetails();
  //   // }
  // }
  // getDetails() {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //     })
  //   }

  //   this.http.get(this.url + '/company').subscribe(data => {
  //     // this.length = Object.keys(data).length;
  //     var i;
  //     // console.log(this.t)
  //     this.b = data;
  //     this.dataSource = this.b
  //   }, error => {
  //     if (error.status == 401) {
  //       console.log(error.status)
  //       this.router.navigate(['login']);
  //       localStorage.clear();
  //     }
  //   }
  //   );
  // }















































































































  //   login($ev, value: any) {
//     console.log($ev.preventDefault());
//     console.log(value);
//     // this.registerForm=JSON.stringify(this.valForm.value)
//     console.log(JSON.stringify(this.valForm.value));
//     console.log("hi")
//     $ev.preventDefault();
//     for (let c in this.valForm.controls) {
//       console.log(this.valForm.controls)
//       this.valForm.controls[c].markAsTouched();
//     }
//     if (this.valForm.valid) {
//       console.log('Valid!');
//       console.log(value);
//     }

//     const body = {
//       username: this.email,
//       password: this.secretkey
//     }
//     // console.log(body)
//     this.service.postService(this.url + '/auth/login', this.registerForm).subscribe(data => {
//       console.log(data['msg'])

//       console.log(this.role)
//       this.role = data['role'].toLowerCase();
//       // alert(
//       //   data['msg']
//       // )
//       localStorage.setItem('data1', JSON.stringify(data))
//       localStorage.setItem('access_token_cookie', data['access_token'])
//       if (this.email === body.username && this.secretkey === body.password) {
//         //  localStorage.setItem('data1', this.data)
//         this.router.navigate([this.role]);
//         // localStorage.getItem('data1')
//         const a = JSON.parse(localStorage.getItem('data1'));
//         this.b = a['role']
//       }
//     })
//   }
//   ngOnInit() {
//     this.c = localStorage.getItem('access_token_cookie');
//     const d = JSON.parse(localStorage.getItem('data1'));
//     if (this.c != null) {
//       const role = d['role'].toLowerCase();
//       this.router.navigate([role]);
//     }
//   }

//   // get f() { return this.registerForm.controls; }

// }