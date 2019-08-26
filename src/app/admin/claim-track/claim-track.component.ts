import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-claim-track',
  templateUrl: './claim-track.component.html',
  styleUrls: ['./claim-track.component.scss']
})
export class ClaimTrackComponent {
  url = environment.Url;
  flag = false;
  ls = [];
  name: string;
  claimType: string;
  claim: any;
  co_name = [];
  cu_name = [];
  type = [];
  c_type = [];
  claim_type: any;
  names: string;
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
  constructor(public http: HttpClient, public router: Router) {
    this.getClaims();
    // this.getPeriod();
  }
  // this.c_id = 'b3c8d5a8-5002-4c53-a6c3-71bdc16e4713'
  // this.cu_id = '1a692fd9-e0df-4301-aab8-ba745cb68b20'
  getClaims() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    this.http.get(this.url + '/task/allocate').subscribe(data => {
      console.log(data)
      this.claim = data;
      for (let i in this.claim) {
        if (this.claim[i]['c_type'] == 'company') {
          this.co_name.push(this.claim[i]['c_name'])
        } else if (this.claim[i]['c_type'] == 'customer') {
          this.cu_name.push(this.claim[i]['c_name'])
        }
        // console.log(this.claim[i]['c_type'])
        this.type.push(this.claim[i]['c_type'])
        this.claim_type = new Set(this.type);
        // console.log(this.claim_type)
        // console.log(this.claim[i]['c_name'])
        this.c_type = Array.from(this.claim_type);

      }
      var s = new Set(this.co_name);
      this.co_name = Array.from(s.values());

      s = new Set(this.cu_name);
      this.cu_name = Array.from(s);
      // console.log(this.c_name)

    })
  }
  claims(e) {
    this.types = e.value
    console.log(e.value);
    if (e.value == 'customer') {
      this.selected_type = this.cu_name;
      console.log(this.selected_type)
    }
    else if (e.value == 'company') {
      this.selected_type = this.co_name;
      console.log(this.selected_type)
    }
  }
  nameSelection(e: any) {
    this.cases = []
    console.log(e.value);
    this.name = e.value
    for (let i = 0; i < this.claim.length; i++) {
      if (this.types == this.claim[i]['c_type'] && e.value == this.claim[i]['c_name']) {
        this.cases.push(this.claim[i]['case']);
        // console.log(this.c_id)
      }
    }
  }
  caseSelection(e: any) {
    console.log(e.value)
    this.case = e.value
    // this.submit()
  }
  submit() {
    // this.track = []
    // return "hi"
    console.log(this.c_id)
    this.ls = []
    this.flag = true;
    for (let i = 0; i < this.claim.length; i++) {
      if (this.types == this.claim[i]['c_type'] && this.name == this.claim[i]['c_name']) {
        this.c_id.push(this.claim[i]['c_id']);
        console.log(this.c_id)
      }
    }
    var c = new Set(this.c_id);
    this.c_id = Array.from(c);
    console.log(this.c_id)
    this.http.get(this.url + '/task/claim/track/' + this.c_id).subscribe(data => {
      console.log(data)
      console.log(this.c_id)
      this.c_id = [];
      console.log(this.c_id)
      for (let i in data) {
        if (data[i]['case'] == this.case) {
          this.status_track = data[i]['status_track']
        }
      }
      console.log(this.status_track.length)
      // this.track = []
      for (let j = 0; j < this.status_track.length; j++) {
        console.log(this.status_track[j]['from_employ_role'])
        this.track.push([this.status_track[j]['from_employ_role'], this.status_track[j]['status'], this.status_track[j]['note']]);
      }
      if (this.track.length <= 0) {
        console.log(this.track.length)
        this.track = [];
      }
      // else if(this.track.length != 0){
      this.getArrayValues(0);
      // }

      console.log(this.track.length)
      // if (this.track != null) {
      // }
      // this.track = [];
    })
  }
  ngOnInit() {
  }


  // selections() {
  //   // this.selectedelems = [];
  //   return "hi"
  //   }
  //   }
  getArrayValues(index) {
    console.log(this.track)
    setInterval(() => {
      if (index == this.track.length) {
        this.track = []
        console.log(index);
      } else if (index < this.track.length) {
        console.log(index);
        this.ls.push(this.track[index]);

      }
      index++;
    }, 1000);
    // console.log(this.track)
  }
}

