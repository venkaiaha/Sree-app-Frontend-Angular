import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
// import { NgLocaleLocalization } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-accountant',
  templateUrl: './accountant.component.html',
  styleUrls: ['./accountant.component.scss']
})
export class AccountantComponent implements OnInit {
  a = JSON.parse(localStorage.getItem('data1'));
  username = this.a["name"]
  role = this.a["role"]
  menuFlag: boolean = true;
  dialog: any;
  constructor(public router: Router,public dialogp:MatDialog) {
    router.events.subscribe((menu) => {
      console.log(menu instanceof NavigationEnd)
      if (menu instanceof NavigationEnd) {
        if (menu.url == "#/accountant/view") {
          console.log(menu)
          this.menuFlag = false;
        } else {
          this.menuFlag = true;
        }
      }
    })
  }
  openDialog() {
    const dialogRef = this.dialogp.open(ProfileComponent,{
      
        width: '350px',
      
    });
  }
  logout() {
    this.router.navigate(['login']);
    localStorage.clear();
  }
  ngOnInit() {
  }

}
