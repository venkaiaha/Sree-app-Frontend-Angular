import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { Router, RouterModule } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskAllocationComponent } from '../registration/book-keeper1/task-allocation/task-allocation.component';
import { FileViewerComponent } from '../registration/file-viewer/file-viewer.component';
import { environment } from '../../environments/environment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { AlertPopupComponent } from '../alert-popup/alert-popup.component';


function readBase64(file): Promise<any> {
  const reader = new FileReader();
  const future = new Promise((resolve, reject) => {
    reader.addEventListener('load', function () {
      resolve(reader.result);
    }, false);

    reader.addEventListener('error', function (event) {
      reject(event);
    }, false);
    reader.readAsDataURL(file);
  });
  return future;
}

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY'
  },
};
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class PopupComponent implements OnInit {
  show = true;
  display = true;
  p = [{ 'filename': '', 'num': 0, 'choose': 'bankstatement' }];
  s = 0;
  url = environment.Url;
  splitted: any;
  filename: any = '';
  filenamep: any = '';
  filenamef: any = '';
  searchValue: any = '';
  docs: any[] = [];
  docString: any = '';
  FileList: any = [];
  optionArray: any = '';
  data2: any;
  op: any;
  selectedValue: string;
  selectedCar: string;
  selected = 'option1';
  Selected: any;
  period: string;
  flag: true;
  formdata: FormData = new FormData();
  year: any;
  opt: any;
  case: any;
  options: any;
  claims = [];
  doc = [];
  g: any;
  status: any;
  c_id: any;
  c_type: any;
  address: any;
  case1: any;
  stat: any;
  split1: any
  str: any;
  arr: any;
  len: any;
  z = [];
  c_name: any;
  doc_string = [];
  // data: any;
  interval: any;
  date = new FormControl(moment());
  docList = [];
  select_month = [];
  select_year: any;
  months = [];
  result: any = [];
  name: any;
  type: string;
  bas_period = [];
  for_month = [];
  forMonth: string;
  for_q = [];
  for_m = [];
  for_y = [];
  chosenYearHandler(normalizedYear: any, datepicker: MatDatepicker<any>) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    this.year = normalizedYear.year();
    datepicker.close();
  }
  onOpenFile(e: any) {
    const fileList: FileList = e.target.files;
    for (let i = 0; i < fileList.length; i++) {
      readBase64(fileList[i]).then((data: any) => {
        const splitted = data.split(',', 2);
        this.docString = splitted[1];
        this.docs.push(this.docString);
      });
    }
  }

  constructor(public router: Router, public http: HttpClient, public dialog: MatDialog, public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.g = data['details']['_id'];
    this.name = data['details']['company_name']
    this.type = data['type']
    this.bas_period.push(data['details']['bas_period'])
    this.address = data['details']['address']
    this.getStatus()

  }
  getStatus() {
    this.doc_string = [];
    this.claims = [];
    this.z = []
    // let i: any;
    this.http.get(this.url + '/task/claim/status/' + this.g).subscribe(st => {
      console.log(st);
      this.stat = st;
      this.len = this.stat.length;
      if (this.stat != []) {
        for (let i = 0; i < this.len; i++) {
          this.z.push(i)
          // console.log(this.z)
          this.c_id = this.stat[i]['c_id']
          this.c_type = this.stat[i]['c_type']
          this.case1 = this.stat[i]['case']
          this.claims.push(this.stat[i]['case'].split('_'));
          console.log(this.claims)
          this.select_month.push(this.claims[i][1]);
          this.select_year = new Set(this.select_month);
          this.months = Array.from(this.select_year);
          if (this.months[i] == 'quarterly') {
            this.for_q.push(this.claims[i][2])
          }
          if (this.months[i] == 'monthly') {
            this.for_m.push(this.claims[i][2])
          }
          if (this.months[i] == 'annually') {
            this.for_y.push(this.claims[i][2])
          }
          this.status = this.stat[i]['status']
          this.doc = this.stat[i]['docs']
          this.doc_string.push(this.doc.join(', '));
        }
      }
      console.log(this.select_month)
      console.log(this.for_month)
    })
  }

  addrow() {
    // console.log(s)
    this.s = this.s + 1;
    this.p.push({ 'filename': '', 'num': this.s, 'choose': '' });
    // console.log(this.optionArray);
  }
  // removeRow() {
  //   // console.log(s)
  //   if (this.s > 0){
  //     this.p.splice(this.s , 1)
  //     this.s = this.s - 1;
  //     // this.p.push({ 'filename': '', 'num': this.s, 'choose': '' });
  //   }
  // }
  option(e, option) {
    console.log(e);
    console.log(this.filename)
    this.p[option['num']]['choose'] = e.target.value;
    console.log(this.p[option['num']]['choose']);
  }
  upload() {
    console.log(this.optionArray)
    this.arr = new Array(this.year, this.Selected, this.opt);
    this.str = this.arr.join('_');
    for (let i in this.z) {
      // console.log(i)
      if (this.case1[i] == this.str) {
        this.str = this.str
      }
    }

    for (let i = 0; i < this.docList.length; i++) {
      this.formdata.append(this.p[i]['choose'], this.docList[i])
    }
    for (let i = 0; i < this.p.length; i++) {
      // this.doc.push(this.p[i]['choose'])
      // console.log(this.doc)
      // for ( )
      if (i === 0) {
        this.optionArray = this.p[i]['choose'];
      } else {
        this.optionArray = this.optionArray + ',' + this.p[i]['choose'];
      }
    }
    console.log(this.optionArray)
    this.formdata.append('c_id', this.c_id);
    this.formdata.append('c_type', this.c_type);
    this.formdata.append('case', this.str);
    this.formdata.append('files', this.optionArray);
    const httpOptions = {
      headers: new HttpHeaders({
        // 'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    this.http.post(this.url + '/files/upload', this.formdata, httpOptions).subscribe(
      data3 => {
        this.getStatus();
        this.FileList = []
        this.p = [{ 'filename': '', 'num': 0, 'choose': '' }];
        // this.arr = []
        this.formdata = new FormData();
        const dialogRef = this.dialog.open(AlertPopupComponent, {
          width: '350px', height: '300px',
          data: {
            'msg': data3['msg']
          }, disableClose: true
        })
        dialogRef.afterClosed().subscribe(result => { })
      }); error => {
        console.log('Invalid');
        console.log(error);
      }
  }
  select(e, j: any) {
    console.log(j)
    console.log(e.target.files[0]['name'])
    const fileList: FileList = e.target.files;
    for (let k = 0; k < fileList.length; k++) {
      readBase64(fileList[k]).then((data: any) => {
        const splitted = data.split(',', 2);
        this.docString = splitted[1];
        this.docs.push(this.docString);
      });
    }
    this.filename = e.target.value;
    this.splitted = this.filename.split('\\', 3);
    this.filename = this.splitted[2];
    console.log(this.filename)
    this.split1 = this.filename.split('.', -1)
    this.FileList.push(this.filename);
    this.p[j['num']]['filename'] = this.filename;
    // this.formdata.append(this.p[j['num']]['choose'], fileList[0])
    this.docList[j['num']] = fileList[0]
  }
  close() {
    this.dialogRef.close();
  }
  allot() {
    // console.log(this.stat[0].time_taken)
    this.arr = new Array(this.year, this.Selected, this.opt);
    this.str = this.arr.join('_').toLowerCase();
    if (this.stat.length == 0) {
      this.result.push({ "c_id": this.g, "c_type": this.type, "case": this.str, "c_name": this.name })
    } else if (this.stat.length != 0) {
      this.result.push({ "c_id": this.c_id, "c_type": this.c_type, "case": this.str, "c_name": this.stat[0].c_name })
    }
    const dialogRef = this.dialog.open(TaskAllocationComponent, {
      // if ('this.stat' = []){
      data: {
        data: this.result
      }, disableClose: true
    })
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    dialogRef.afterClosed().subscribe(result => {
      // console.log(isString(result['time_taken']))
      // let a= result;
      // console.log(a)
      this.http.post(this.url + '/task/allocate', result, httpOptions).subscribe(data => {
        this.arr = [];
        this.result = [];
        this.getStatus()
        const dialogRef = this.dialog.open(AlertPopupComponent, {
          width: '350px', height: '300px',
          data: {
            'msg': data['msg']
          }, disableClose: true

        })
        dialogRef.afterClosed().subscribe(result => { })
      });
      error => {
        console.log('Invalid');
        console.log(error);
      }
    });
  }
  view(e) {

    const data = {
      c_id: this.stat[e]['c_id'],
      c_type: this.stat[e]['c_type'],
      case: this.stat[e]['case']
    }
    console.log(e)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'

      })
    };
    this.http.post(this.url + '/files/view', data, httpOptions).subscribe(
      data1 => {
        if (!data1['flag']) {
          const dialogRef = this.dialog.open(AlertPopupComponent, {
            width: '350px', height: '300px',
            data: {
              'msg': data1['msg']
            }
          })
          // setTimeout(function(){ myWindow.close() }, 3000);
          setTimeout(function () {
            // this.dialogRef.close(123);
            // code to close the modal
            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
            });
          }, 2000);
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
    // if(this.case1===)


    // const dialogRef = this.dialog.open(FileViewerComponent, {
    //   data: {
    //     c_id: this.stat[e]['c_id'],
    //     c_type: this.stat[e]['c_type'],
    //     case: this.stat[e]['case']
    //   }, disableClose: true
    // })

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result)
    //   console.log('The dialog was closed');
    // });
  }

  ngOnInit() {
    this.year = new Date().getFullYear()
  }


}
