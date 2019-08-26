import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from '../../popup/popup.component';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-accountant-status',
  templateUrl: './accountant-status.component.html',
  styleUrls: ['./accountant-status.component.scss']
})
export class AccountantStatusComponent {
  displayedColumns: string[] = ['index', 'c_name', 'c_type', 'case', 'status', 'status_time', 'note', 'view'];
  // displayedColumns1: string[] = ['index', 'c_name', 'c_type', 'case', 'status', 'status_time', 'view'];
  dataSource: any;
  dataSource1: any;
  _id: any;
  a: any;
  b: any;
  z: any;
  url = environment.Url;
  flag = false;
  len: any;
  t: any;
  v: any;
  // time = JSON.parse(localStorage.getItem('time'));

  constructor(public dialog: MatDialog, public router: Router, public http: HttpClient, public httpModule: Http) {
    let i;
    this.getSStatusTable();
    // console.log(this.time)
    // this.getATaskAllocations();
  }
  getSStatusTable() {
    let i;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    }
    this.http.get(this.url + '/task/status').subscribe(data => {
      console.log(data);
      this.dataSource = data;
      for (i = 0; i < data['length']; i++) {
        this.z = new Date(this.dataSource[i]['status_time'])
        this.dataSource[i]['status_time'] = this.z.toString().split("GMT")[0]
      }
    }

    );
  }
  view(row) {
    // console.log(i)
    let navigation: NavigationExtras = {
      queryParams: {
        "data": JSON.stringify(row)
      }, skipLocationChange: true
    };

    this.router.navigate(['accountant/view'], navigation);
  }

}

