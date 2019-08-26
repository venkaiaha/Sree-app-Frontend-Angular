import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-timetrack',
  templateUrl: './timetrack.component.html',
  styleUrls: ['./timetrack.component.scss']
})
export class TimetrackComponent  {
  url = environment.Url;
  roles = []
  role: string;
  names = [];
  name: string;
  _id: any;
  flag = false;
  ls = [];
  // name: string;
  staffType: string;
  staff: any;
  co_name = [];
  cu_name = [];
  type = [];
  c_type = [];
  staff_type: any;
  // names: string;
  types: any;
  cases: Array<any> = null;
  selected_type: Array<any> = null;
  c_id: any = [];
  case: any;
  from_employ_role = [];
  status = [];
  note = [];
  status_track: any;
  track: Array<any> = [];
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(public http: HttpClient, public router: Router) {
    this.getstaffs();
  }
  getstaffs() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    this.http.get(this.url + '/staff').subscribe(data => {
      this.staff = data;
      console.log(this.staff)
      for (let i in this.staff) {
        if (this.staff[i]['role'] != 'administrator') {
          this.roles.push(this.staff[i]['role'])
        }
      }
      console.log(this.roles)
      var s = new Set(this.roles);
      this.roles = Array.from(s);
      console.log(this.roles)
    })
  }
  staffSelect(e) {
    this.names = []
    this.role = e.value
    // console.log(this.role);
    for (let i in this.staff) {
      console.log(i)
      if (this.role == this.staff[i]['role']) {
        // console.log(this.role)
        console.log(this.staff[i]['name'])
        this.names.push(this.staff[i]['name'])
        //  console.log(this.names)
      }
    }
    console.log(this.names)
  }
  nameSelection(e: any) {
    this.cases = []
    console.log(e.value);
    this.name = e.value
    for (let i = 0; i < this.staff.length; i++) {
      if (this.role == this.staff[i]['role'] && this.name == this.staff[i]['name']) {
        this._id = this.staff[i]['_id']
      }
    }
    console.log(this._id)
    console.log(this.date)
    console.log(this.serializedDate)
  }
}













































//   caseSelection(e: any) {
//     console.log(e.value)
//     this.case = e.value
//     // this.submit()
//   }
//   submit() {
//     // this.track = []
//     // return "hi"
//     console.log(this.c_id)
//     this.ls = []
//     this.flag = true;
//     for (let i = 0; i < this.staff.length; i++) {
//       if (this.types == this.staff[i]['c_type'] && this.name == this.staff[i]['c_name']) {
//         this.c_id.push(this.staff[i]['c_id']);
//         console.log(this.c_id)
//       }
//     }
//     var c = new Set(this.c_id);
//     this.c_id = Array.from(c);
//     console.log(this.c_id)
//     this.http.get(this.url + '/task/staff/track/' + this.c_id).subscribe(data => {
//       console.log(data)
//       console.log(this.c_id)
//       this.c_id = [];
//       console.log(this.c_id)
//       for (let i in data) {
//         if (data[i]['case'] == this.case) {
//           this.status_track = data[i]['status_track']
//         }
//       }
//       console.log(this.status_track.length)
//       // this.track = []
//       for (let j = 0; j < this.status_track.length; j++) {
//         console.log(this.status_track[j]['from_employ_role'])
//         this.track.push([this.status_track[j]['from_employ_role'], this.status_track[j]['status'], this.status_track[j]['note']]);
//       }
//       if (this.track.length <= 0) {
//         console.log(this.track.length)
//         this.track = [];
//       }
//       // else if(this.track.length != 0){
//       this.getArrayValues(0);
//       // }

//       console.log(this.track.length)
//       // if (this.track != null) {
//       // }
//       // this.track = [];
//     })
//   }
//   ngOnInit() {
//   }


//   // selections() {
//   //   // this.selectedelems = [];
//   //   return "hi"
//   //   }
//   //   }
//   getArrayValues(index) {
//     console.log(this.track)
//     setInterval(() => {
//       if (index == this.track.length) {
//         this.track = []
//         console.log(index);
//       } else if (index < this.track.length) {
//         console.log(index);
//         this.ls.push(this.track[index]);

//       }
//       index++;
//     }, 1000);
//     // console.log(this.track)
//   }
// }

