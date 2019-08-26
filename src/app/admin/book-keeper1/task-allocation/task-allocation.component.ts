import { Component,forwardRef, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { environment } from '../../../../environments/environment';
import { stringify } from 'querystring';
import { isNumber } from 'util';


@Component({
  // providers:[forwardRef(() => PopupComponent)],
  selector: 'app-task-allocation',
  templateUrl: './task-allocation.component.html',
  styleUrls: ['./task-allocation.component.scss']
})
export class TaskAllocationComponent implements OnInit {
  status: string;
  // status_time: n
  from_employ_role: string;
  from_employ: string;
  to_employ_role: string;
  to_employ: string;
  time_taken: number;
  c_id: string;
  c_type: string;
  case: string;
  active: boolean;
  url = environment.Url;
  d: any;
  note: any;

  constructor(public dialog: MatDialog, public router: Router, public http: HttpClient, public httpModule: Http,
    public dialogRef: MatDialogRef<TaskAllocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      // console.log(data)
      this.d=data;
      console.log(this.d)
    }
    close(){
      this.dialogRef.close();
    }
    submit() {
    const body = {
      c_id: this.d['c_id'],
      c_type: this.d['c_type'],
      case: this.d['case'],
      c_name: this.d['c_name'],
      note: this.note
      // time_taken:this.d['time_taken']
     

    }
    console.log(body);
    this.dialogRef.close(body);
    // console.log(body);
    // // console.log(row);
    // this.http.post(this.url+'/task/allocate', body, httpOptions).subscribe(data => {
    //   console.log(data);
    //   // this.comp.getStatus();
    //     alert(
    //       data['msg']
    //     )
    // });
  }
  ngOnInit() {
  }

}
