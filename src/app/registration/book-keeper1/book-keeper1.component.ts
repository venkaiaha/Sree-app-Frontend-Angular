import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { TaskAllocationComponent } from './task-allocation/task-allocation.component';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-book-keeper1',
  templateUrl: './book-keeper1.component.html',
  styleUrls: ['./book-keeper1.component.scss']
})
export class BookKeeper1Component {
  role: string;
  b = JSON.parse(localStorage.getItem('data1'));
  a = [];
  time_taken: string;
  c_id: string;
  c_type: string;
  case: string
  displayedColumns: string[] = ['index', 'name', 'Task List', 'Task Count'];
  displayedColumn: string[] = ['index', 'name', 'Task List', 'Task Count'];
  dataSource: any;
  dataSource1: any
  url = environment.Url;
  constructor(public dialog: MatDialog, public router: Router, public http: HttpClient, public httpModule: Http) {
    let i: any;
    let j: any;
    let k = [];
    let l = [];
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    }
    this.http.get(this.url + '/task/status/staff').subscribe(data => {
      console.log(data);
      for (i in data) {
        this.a.push(data[i]);

      } error => {
        if (error.status == 401) {
          console.log(error.status)
          this.router.navigate(['login']);
          localStorage.clear();
        }
      }
      console.log(this.a)
      for (j in this.a) {
        console.log(this.a[j]['role'])
        if (this.a[j]['role'] == 'bookkeeper') {
          k.push(this.a[j]);
          this.dataSource = k;
        } else {
          l.push(this.a[j]);
          this.dataSource1 = l;
        }
      }
    });
  }
  view(e) {
    console.log(e)
    let navigation: NavigationExtras = {
      queryParams: {
        "type": 'company', "name": e
      },skipLocationChange:true
    };

    this.router.navigate(['/operator/search'],navigation);
  }

}


