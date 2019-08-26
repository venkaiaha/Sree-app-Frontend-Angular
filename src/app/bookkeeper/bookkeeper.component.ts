import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-bookkeeper',
  templateUrl: './bookkeeper.component.html',
  styleUrls: ['./bookkeeper.component.scss']
})
export class BookkeeperComponent  {
  a = JSON.parse(localStorage.getItem('data1'));
  username=  this.a["name"]
  role = this.a["role"]
  menuFlag: boolean =true;
  constructor(public router: Router,public dialog:MatDialog) {
    router.events.subscribe((menu) => {
      // console.log(menu instanceof NavigationEnd)
      if (menu instanceof NavigationEnd) {
        if (menu.url == "#/bookkeeper/view") {
          console.log(menu)
          this.menuFlag = false;
        } else {
          this.menuFlag = true;
        }
      }
    })
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
}