import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { FileViewerComponent } from '../../../app/registration/file-viewer/file-viewer.component';
import { from } from 'rxjs';
import * as moment from 'moment';
import { AlertPopupComponent } from '../../alert-popup/alert-popup.component';

@Component({
  selector: 'app-accountant-popup',
  templateUrl: './accountant-popup.component.html',
  styleUrls: ['./accountant-popup.component.scss']
})
export class AccountantPopupComponent implements OnInit {
  a: any;
  time: string;
  b: any;
  c = [];
  url = environment.Url;
  show = true;
  status: string;
  c_id: any;
  c_type: any;
  case: any;
  flag0 = true;
  note: string = null;
  time_taken: number;
  // status: string;
  // c_id
  _id: any;
  claims: any;
  t: any;
  interval: any;
  a1: any;
  b1: any;
  c1: any;
  i: any;
  z: any;
  d: any;
  st: any;
  s: any;
  // s = JSON.parse(localStorage.getItem('view'));
  min: any;
  name: string;
  case_claim: any;
  p = [{ 'filename': 'hg', 'num': 0, 'choose': 'BankStatement' }];
  constructor(public dialog: MatDialog, public route: ActivatedRoute, public router: Router, public http: HttpClient, public httpModule: Http) {
    this.route.queryParams.subscribe(params => {
      console.log(JSON.parse(params['data']))
      this.s = JSON.parse(params['data'])
      this.claims = this.s['case'].split('_');
      console.log(this.s['case'])
      this.getClaimStatus();
    })
  }
  getClaimStatus() {
    console.log(this.s)
    // console.log(this.s['docs'])
    this.http.get(this.url + '/task/claim/status/' + this.s['c_id']).subscribe(data1 => {
      console.log(data1)

      for (let i in data1) {
        if (this.s['case'] == data1[i]['case']) {
          this.st = data1[i];
          console.log(this.st)
          this.c = data1[i]['docs']
          console.log(this.c)
          if (this.st['status'] == 'accountant_inreview') {
            this.timer()
          }
        }
      }
    })
  }
  close() {
    this.router.navigate(['accountant'])
    // localStorage.clear();
  }

  accept() {
    this.flag0 = true
    console.log(this.s['_id'])
    this.flag0 = false;
    this.flag0 = true
    console.log(this.s['_id'])
    this.flag0 = false
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    this.http.put(this.url + '/task/accept/' + this.s['_id'], httpOptions).subscribe(data => {
      console.log(data);
      this.getClaimStatus()
      // this.service.getIstatus()
      // alert(data['msg'])
    });
  }
  timer() {
    this.z = new Date().toLocaleTimeString();
    // console.log(this.z)
    this.i = new Date();
    // console.log(this.i)
    var start = moment.utc(this.z, "h:mm:ss a");
    this.interval = setInterval(() => {
      this.a1 = new Date().toLocaleTimeString();
      // console.log(this.a1)
      var end = moment.utc(this.a1, "h:mm:ss a");
      this.d = moment.duration(end.diff(start));
    })
  }
  Upload() {
    // this.dialogRef.close();
    alert('uploaded successfully');
  }
  submit(e) {
    clearInterval(this.interval);
    this.min = (this.d["_data"]['hours']) * 60 + this.d["_data"]['minutes']
    if (this.d["_data"]["seconds"] > 0) {
      this.min += 1
    }
    if (this.note == null) {
      const dialogRef = this.dialog.open(AlertPopupComponent, {
        data: {
          'msg': "Please enter note"
        }, disableClose: true

      })

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        })
      }
      const body = {
        _id: this.s['_id'],
        note: this.note,
        time_taken: Number(this.min),
        "submit_flag": e
        // status: this.status
      }
      console.log(body);
      this.http.put(this.url + '/task/submit', body, httpOptions).subscribe(data => {
        console.log(data);
        // alert(data['msg'])
        const dialogRef = this.dialog.open(AlertPopupComponent, {
          width: '350px', height: '300px',
          data: {
            'msg': data['msg']
          }, disableClose: true

        })

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
        this.router.navigate(['accountant'])
      });
    }
  }
  startTimer(e) {

    this.z = new Date().toLocaleTimeString();
    // console.log(this.z)
    this.i = new Date();
    // console.log(this.i)
    var start = moment.utc(this.z, "h:mm:ss a");
    // console.log(start)

    this.interval = setInterval(() => {
      this.a = new Date().toLocaleTimeString();
      console.log(this.a)
      var end = moment.utc(this.a, "h:mm:ss a");
      this.d = moment.duration(end.diff(start));
      console.log(this.d)


    }, 1000)

  }

  pause() {
    // console.log(this.interval.setInterval[this.d]);
    clearInterval(this.interval);
    // this.i=this.interval/60
    // console.log(this.i.strip('.'))
    console.log(this.interval);
  }
  ngOnInit() {
  }
  view(e) {

    const data = {
      c_id: this.st['c_id'],
      c_type: this.st['c_type'],
      case: this.st['case']
    }
    console.log(data)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'

      })
    };
    this.http.post(this.url + '/files/view', data, httpOptions).subscribe(
      data1 => {
        console.log(data1);
        if (!data1['flag']) {
          const dialogRef = this.dialog.open(AlertPopupComponent, {
            width: '350px', height: '300px',
            data: {
              'msg': data1['msg']
            }

          })

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
        } else if (data1['flag']) {
          let file = data1['files']
          // console.log(this.file)
          let name = data1['names']
          localStorage.setItem('fileviewerdata', JSON.stringify(file))
          localStorage.setItem('fileviewername', JSON.stringify(name))

          window.open(window.location.origin + window.location.pathname + '#/fileviewer')
        }
      });
    error => {
      console.log('invalid');

    }
  }
  //   
}
