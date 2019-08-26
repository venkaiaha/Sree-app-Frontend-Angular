import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, RouterModule } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.scss']
})
export class AlertPopupComponent implements OnInit {
  message: any;
  constructor(public router: Router, public http: HttpClient, public dialog: MatDialog, public dialogRef: MatDialogRef<AlertPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
    this.message = data.msg
    setTimeout(() => {
      this.dialogRef.close();
      // code to close the modal
    }, 1000);
  }
  ngOnInit() {
  }

}
