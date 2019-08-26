import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { PopupComponent } from '../../popup/popup.component';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Sort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss']
})

export class CustomerRegistrationComponent {
  url = environment.Url;
  dataSource: any;
  dataSource1: any;
  userArray = [];
  b: any;
  c: any;
  g: any;
  i: any;
  s: any;
  f: any;
  claims: any;
  t = ['company', 'customer'];
  e: any;
  z: any;
  ctype = 'company';
  length: number;
  length1: number;
  backup = [null, null];
  type: string = null;
  searchword: string;
  search: string = null;
  displayedColumns: string[] = ['company_name', 'owner_name', 'abn', 'acn', 'tfn', 'business_name', 'bas_period', 'phone', 'email', 'preferred_accountant', 'view'];

  displayedColumn: string[] = ["name", 'company_name', "date_of_joining", "abn", "acn", "tfn", 'bas_period', 'phone', "email", 'preferred_accountant', 'view'];

  dataset: any;
  a = JSON.parse(localStorage.getItem('data1'));

  constructor(public dialog: MatDialog, public router: Router, public route: ActivatedRoute, public http: HttpClient, public httpModule: Http) {
    this.route.queryParams.subscribe(params => {
      this.type = params['type'];
      this.searchword = params['name'];
      if (this.type == 'company') {
        let a = { 'target': { 'value': this.searchword[0] } }
        this.search = this.searchword[0]
        this.onKey(a)
      } else if (this.type == 'customer') {
        this.onKey1(this.searchword[0])
      }
    })
    if (this.type == null) {
      this.getDetails();
    }
  }
  getDetails() {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    }

    this.http.get(this.url + '/customer').subscribe(data => {
      this.c = data;
      console.log(data);
      this.dataSource1 = new MatTableDataSource(this.c);
      this.backup[1] = this.dataSource1;
      this.length1 = Object.keys(data).length;
      this.dataSource1.paginator = this.paginator1;
      this.dataSource1.sort = this.sort1;
    }
    );

    this.http.get(this.url + '/company').subscribe(data => {
      this.length = Object.keys(data).length;
      var i;
      console.log(this.t)
      // var s =  this.t.toString().split("GMT")[0];
      // console.log(s)
      this.b = data;
      // for(i=0;i<this.length;i++){
      // this.z=new Date(this.b[i]['status_time'])
      // this.b[i]['status_time']=this.t.toString().split("GMT")[0]
      this.dataSource = new MatTableDataSource(this.b);
      console.log(this.dataSource['data'])
      // for(i=0;i<this.length;i++){
      //   console.log(this.dataSource['data'][i]['created_at'])
      //   this.z=new Date(this.dataSource['data'][i]['created_at'])
      //   console.log(this.z)
      //   this.dataSource['data'][i]['created_at']=this.z.toString().split("GMT")[0]
      //   console.log(this.dataSource['data'][i]['created_at'])
      // }
      // this.dataSource=this.dataSource
      this.backup[0] = this.dataSource;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      if (error.status == 401) {
        console.log(error.status)
        this.router.navigate(['login']);
        localStorage.clear();
      }
    }
    );
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator1: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort) sort1: MatSort;

  ngOnInit() {

  }

  onKey(event: any) {
    this.e = event.target.value;
    console.log(this.e)
    if (event.target.value == '') {
      this.dataSource = this.backup[0];
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    if (this.e.length > 3) {
      this.http.get(this.url + '/search/' + 'company/' + this.e, httpOptions).subscribe(
        data => {
          console.log(data);
          this.dataSource = data
        })
    }
  }
  onKey1(event: any) {
    // console.log(t)
    this.e = event.target.value;
    if (event.target.value == '') {
      this.dataSource1 = this.backup[1];
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    if (this.e.length > 3) {
      this.http.get(this.url + '/search/' + 'customer/' + this.e, httpOptions).subscribe(
        data => {
          console.log(data);
          this.dataSource1 = data
        })
    }
  }
  popup(row, type) {

    console.log(type);
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

    for (this.i in row) {
      this.g = row._id;
      console.log(this.g)
    }
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        type: type,
        details: row,
        _id: row._id,
      }, disableClose: true

    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
