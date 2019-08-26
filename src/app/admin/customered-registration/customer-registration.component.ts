import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { UpdateComponent } from '../update/update.component'
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
// import { OperatorService } from './../operator.service';
import { environment } from '../../../environments/environment';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Sort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import * as $ from "jquery";


@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss']
})

export class CustomeredRegistrationComponent {
  socket: any;
  type1: any;
  initWeb(c) {
    console.log(c)
    var host = "ws://0.0.0.0:5003";
    var data;
    try {
      this.socket = new WebSocket(host);
      console.log('Websocket - status ' + this.socket.readyState);

      this.socket.onopen = function (msg) { console.log("Welcome - status " + this.readyState); };
      this.socket.onmessage = function (msg) { console.log("Received: " + msg.data); data = msg.data; localStorage.setItem("webdata", data) };
      this.socket.onclose = function (msg) {
        console.log("Disconnected - status " + this.readyState);
        //  this.initNext();
      };
      data = localStorage.getItem("webdata")
      data = JSON.parse(data)
      console.log(data)
      if (data["hits"] >= 0) {
        if (c == 'company') {
          // console.log()
          this.dataSource = data["data"];
        } else if (c == 'customer') {
          this.dataSource1 = data["data"];
        }
      }
    }
    catch (ex) { console.log(ex); }
    $("msg").focus();
  }
  send(msg) {
    if (!msg) { alert("Message can not be empty"); return; }
    try {
      this.socket.send(msg); console.log('Sent: ' + msg);

    } catch (ex) {

      console.log(ex);
    }
  }

  quit() {
    console.log("Goodbye!");
    this.socket.close();
    this.socket = null;
  }

  onKeyPress(event: any, c) {
    console.log(c)
    this.type1 = c;
    let e = event.target.value;
    let data = { "args": e, "c_type": this.type1 };
    if (e == '') {
      if (c == 'company') {
        this.dataSource = this.backup[0];
      } else if (c == 'customer') {
        this.dataSource1 = this.backup[1];
      }
      // this.dataSource1 = this.backup[1];
    }
    if ((e.length > 3 && c == 'company') || (e.length > 3 && c == 'customer')) {
      this.send(JSON.stringify(data));
      console.log(JSON.stringify(data));
      this.initWeb(c);
    }
  }

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
  displayedColumns: string[] = ['company_name', 'owner_name', 'abn', 'acn', 'tfn', 'business_name', 'bas_period', 'phone', 'preferred_accountant', 'delete', 'update'];
  displayedColumn: string[] = ["name", 'company_name', "date_of_joining", "abn", "acn", "tfn", 'bas_period', 'phone', "email", 'preferred_accountant', 'delete', 'update'];


  dataset: any;
  a = JSON.parse(localStorage.getItem('data1'));

  constructor(public dialog: MatDialog, public router: Router, public route: ActivatedRoute, public http: HttpClient, public httpModule: Http) {

    // this.getDetails();
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
    }
    );

    this.http.get(this.url + '/company').subscribe(data => {
      // this.length = Object.keys(data).length;
      var i;
      // console.log(this.t)
      this.b = data;
      console.log(this.b)
      this.dataSource = new MatTableDataSource(this.b);
      console.log(this.b[0]['_id'])
      this.backup[0] = this.dataSource;
    })
  }
  delete(row, e) {
    console.log(e)
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    }
    this.http.delete(this.url + '/' + e + '/' + row._id, httpOptions).subscribe(data => {
      console.log(data)
      this.getDetails()
    })
  }
  update(row, type) {
    for (let i in this.b) {
      console.log(i)
      if (row._id === this.b[i]['_id']) {
        const dialogRef = this.dialog.open(UpdateComponent, {
          data: {
            type: type,
            details: row,
            _id: row._id,
          }
        })
        dialogRef.afterClosed().subscribe(result => {
          console.log(result)
          console.log('The dialog was closed');
        });
      }
    }
  }
}