import { Component, OnInit, HostListener } from '@angular/core';
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
// import { connect } from 'tls';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  url = environment.Url;
  username: string;
  name: string;
  role: string;
  secretkey: any;
  password: any;
  valForm: FormGroup;
  color: 'warning';
  isActive: boolean = false;
  details: any;
  c: any;
  b: any;
  registerForm: FormGroup;
  submitted = false;

  constructor(public router: Router, public dialog: MatDialog, public http: HttpClient, public httpModule: Http, public service: UserService, private formBuilder: FormBuilder) {
  }
 
  @HostListener('window:beforeunload', ['$event'])
  handleClose($event) {
      $event.returnValue = false;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);

    if (event.keyCode === 13) {
      this.login();
    }

  }
  login() {
    //   this.submitted = true;
    //   this.registerForm = this.formBuilder.group({
    //     email: ['', [Validators.required, Validators.email]],
    //     password: ['', [Validators.required, Validators.minLength(6)]]
    // });
    const body = {
      username: this.name,
      password: this.secretkey
    }
    this.service.postService(this.url + '/auth/login', body).subscribe(data => {
      if (data['login'] == false) {
        alert("Username or Password don't match")
      } else
        if (data['login'] == true) {
          console.log(data['msg'])
          this.role = data['role'].toLowerCase();
          localStorage.setItem('data1', JSON.stringify(data))
          localStorage.setItem('access_token_cookie', data['access_token'])
          this.router.navigate([this.role]);
          const a = JSON.parse(localStorage.getItem('data1'));
          this.b = a['role']
        }
    })
  }
  ngOnInit() {
    this.c = localStorage.getItem('access_token_cookie');
    const d = JSON.parse(localStorage.getItem('data1'));
    if (this.c != null) {
      const role = d['role'].toLowerCase();
      this.router.navigate([role]);
    }
  }

  // get f() { return this.registerForm.controls; }

}