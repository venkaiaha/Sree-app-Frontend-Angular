import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { FileViewerComponent } from '../../../app/registration/file-viewer/file-viewer.component';
import { from, timer } from 'rxjs';
import * as moment from 'moment';
import { KeeperService } from '../keeper.service';
import { AlertPopupComponent } from '../../alert-popup/alert-popup.component';

@Component({
  selector: 'app-bookkeeper-popup',
  templateUrl: './bookkeeper-popup.component.html',
  styleUrls: ['./bookkeeper-popup.component.scss']
})
export class BookkeeperPopupComponent implements OnInit {
  a: any;
  time = [];
  b: any;
  c: [] = null;
  url = environment.Url;
  show = true;
  status: string;
  c_id: any;
  c_type: any;
  case: any;
  flag0 = true;
  note: string;
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
  index: number;
  // s = JSON.parse(localStorage.getItem('task_accept'));
  min: any;

  constructor(public dialog: MatDialog, public router: Router, public route: ActivatedRoute, public http: HttpClient, public httpModule: Http, public service: KeeperService) {
    this.route.queryParams.subscribe(params => {
      console.log(JSON.parse(params['data']));
      this.s = JSON.parse(params['data']);
      this.index = params['index'];
      // console.log(this.index)
      // localStorage.clear();
      this.claims = this.s['case'].split('_');
      // console.log(this.s['case'])
      // const splitted = data.split(',', 2);
      this.getClaimStatus();
      // //console.log(this.Time[0]['hours']);
      // this.timer()
      // //console.log(this.c)
    });
  }

  getClaimStatus() {
    // console.log(this.s)
    // //console.log(this.s['docs'])
    this.http.get(this.url + '/task/claim/status/' + this.s['c_id']).subscribe(data1 => {
      // console.log(data1)
      for (const i in data1) {
        if (this.s['case'] === data1[i]['case']) {
          this.st = data1[i];
          // console.log(this.st)
          this.c = data1[i]['docs'];
          // //console.log(this.d)
          if (this.st['status'] === 'bookkeeper_inreview') {
            this.timer();
          }
        }
      }
    });
    // localStorage.clear();
  }
  close(i) {
    // console.log(i)
    const navigation: NavigationExtras = {
      queryParams: {
        'index': i
      }, skipLocationChange: true
    };

    this.router.navigate(['bookkeeper/status'], navigation);
  }
  // this.router.navigate(['bookkeeper/status']);
  // localStorage.clear();
  // }
  timer() {
    const Time = JSON.parse(localStorage.getItem('time'));
    // if (this.st['status'] == 'bookkeeper_inreview') {
    //   if (Time[0]['seconds'] != this.d['_data']['seconds']) {
    //     // this.Time[0]['hours'] = this.d["_data"]['hours'];
    //     // this.Time[0]['minutes'] = this.d["_data"]['minutes'];
    //     Time[0]['seconds'] = this.d["_data"]['seconds']
    //   }
    // } else {
    this.z = new Date().toLocaleTimeString();
    // //console.log(this.z)
    this.i = new Date();
    // //console.log(this.i)
    const start = moment.utc(this.z, 'h:mm:ss a');
    this.interval = setInterval(() => {
      this.a1 = new Date().toLocaleTimeString();
      // //console.log(this.a1)
      const end = moment.utc(this.a1, 'h:mm:ss a');
      this.d = moment.duration(end.diff(start));
      this.min = (this.d['_data']['hours']) * 60 + this.d['_data']['minutes'];
      console.log(typeof this.min);
      if (this.min === 1) {
        this.note = 'time limit exceeded';
        this.submit('hold');
      }
    });
  }
  accept() {
    this.flag0 = true;
    // console.log(this.s['_id'])
    this.flag0 = false;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    this.http.put(this.url + '/task/accept/' + this.s['_id'], httpOptions).subscribe(data => {
      // console.log(data);
      this.getClaimStatus();
    });
  }
  Upload() {
    // this.dialogRef.close();
    alert('uploaded successfully');
  }
  submit(e) {
    clearInterval(this.interval);
    this.min = (this.d['_data']['hours']) * 60 + this.d['_data']['minutes'];
    if (this.d['_data']['seconds'] > 0) {
      this.min += 1;
    }
    if (this.note == null) {
      const dialogRef = this.dialog.open(AlertPopupComponent, {
        width: '350px', height: '300px',
        data: {
          'msg': 'Please enter note'
        }, disableClose: true

      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
      });
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        })
      };
      const body = {
        _id: this.s['_id'],
        note: this.note,
        time_taken: Number(this.min),
        'submit_flag': e
        // status: this.status
      };
      // console.log(body);
      this.http.put(this.url + '/task/submit', body, httpOptions).subscribe(data => {
        // console.log(data);
        // alert(data['msg'])
        const dialogRef = this.dialog.open(AlertPopupComponent, {
          width: '350px', height: '300px',
          data: {
            'msg': data['msg']
          }

        });

        dialogRef.afterClosed().subscribe(result => {
          // console.log('The dialog was closed');
        });
        this.router.navigate(['bookkeeper']);
      });
    }
  }
  ngOnInit() {
  }
  view() {
    // this.timer()
    const data = {
 c_id: this.st['c_id'],
 c_type: this.st['c_type'],
  case: this.st['case']
    };
    // console.log(data)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'

      })
    };
    this.http.post(this.url + '/files/view', data, httpOptions).subscribe(
      data1 => {
        console.log(data1);
        // console.log(data1['flag']);
        if (!data1['flag']) {
          const dialogRef = this.dialog.open(AlertPopupComponent, {
            width: '350px', height: '300px',
            data: {
              'msg': data1['msg']
            }

          });

          dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
          });
        } else if (data1['flag']) {
          const file = data1['files'];
          // //console.log(this.file)
          const name = data1['names'];
          localStorage.setItem('fileviewerdata', JSON.stringify(file));
          localStorage.setItem('fileviewername', JSON.stringify(name));

          window.open(window.location.origin + window.location.pathname + '#/fileviewer');
        }
      });
    error => {
      // console.log('invalid');

    };
  }
  home() {
    this.time.push({ 'hours': this.d['_data']['hours'], 'minutes': this.d['_data']['minutes'], 'seconds': this.d['_data']['seconds'] });
    console.log(this.time);
    localStorage.setItem('time', JSON.stringify(this.time));
    window.open(window.location.origin + '#/bookkeeper/status');
  }
}
