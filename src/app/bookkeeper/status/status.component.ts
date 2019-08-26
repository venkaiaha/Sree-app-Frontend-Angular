import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookkeeperPopupComponent } from '../bookkeeper-popup/bookkeeper-popup.component';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { KeeperService } from '../keeper.service';
import {FormControl} from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  selected: number;
  displayedColumns: string[] = ['index', 'c_name', 'c_type', 'case','status', 'status_time', 'note', 'view'];
  displayedColumns1: string[] = ['index', 'c_name', 'c_type', 'case', 'status', 'status_time', 'view'];
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
  active = true;
  active1: boolean;
  constructor(public dialog: MatDialog, public router: Router, public route:  ActivatedRoute,public http: HttpClient, public httpModule: Http, public service: KeeperService, ) {
    // console.log(this.time)
    this.getSStatusTable();
    this.getATaskAllocations();
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
      this.dataSource = data
      for (i = 0; i < data['length']; i++) {
        this.z = new Date(this.dataSource[i]['status_time'])
        this.dataSource[i]['status_time'] = this.z.toString().split("GMT")[0]
      }
    }, error => {
      if (error.status == 401) {
        this.router.navigate(['login']);
        localStorage.clear();
      }
    });

    let l: number;
    this.route.queryParams.subscribe(params => {
      console.log(typeof Number(params['index']));
      l =  Number(params['index'])
      console.log( l)
      if( l != this.selected) {
        console.log(l);
        this.selected = l
        console.log(this.selected)
      }
    })
  }
  getATaskAllocations() {
    let i;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    }
    this.http.get(this.url + '/task/allocate').subscribe(data => {
      this.dataSource1 = data;
      for (i = 0; i < data['length']; i++) {
        this.z = new Date(this.dataSource1[i]['status_time'])
        this.dataSource1[i]['status_time'] = this.z.toString().split("GMT")[0]
      }
    });
  }
  view(row,i) {
    // let data = []
    // data.push(row)
    console.log(row)
      let navigation: NavigationExtras = {
        queryParams: {
          "data": JSON.stringify(row), "index": i
        },skipLocationChange:true
      };
  
      this.router.navigate(['bookkeeper/view'],navigation);
    }
  
  // }
  //   console.log(this.selected.value)
  //   console.log(row)
  //   console.log(i)
  //   localStorage.setItem('task_accept', JSON.stringify(row,i))
  //   this.router.navigate(['bookkeeper/view'])
  // }
  ngOnInit(){

  }
}



















































// popup1(row){
//   console.log(event);
//   const dialogRef = this.dialog.open(TaskComponent, {
//     width: '600px', data: {

//       _id: row._id,
//       // event: event
//     }, disableClose: true
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     console.log('The dialog was closed');
//   });
// }
// view(row) {
  //   this.http.get(this.url + '/task/claim/status/' + row.c_id).subscribe(data => {
  //     console.log(data)
  //   this.b=data
  // console.log(this.b)})
    // const httpOptions = {
    //   headers: new HttpHeaders({'content-Type':'application/json',
    //   'Access-Control-Allow-Origin': '*',
    // })
    // }
    // this.http.put(this.url+'/task/accept/'+row._id,httpOptions).subscribe(data =>{
    //   console.log(data);})