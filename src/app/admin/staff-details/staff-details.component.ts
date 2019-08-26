import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.scss']
})
export class StaffDetailsComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] =['surname','first_name','role','created_at','_id','password']
  constructor( public router: Router, public http: HttpClient, public httpModule: Http) {

    const httpOptions = {
            headers: new HttpHeaders({'content-Type':'application/json',
            'Access-Control-Allow-Origin': '*',
          })
          }
      
    
    this.http.get('http://183.82.112.165:5002/api/v1/staff/', httpOptions).subscribe(data => {
      console.log(data);
       this.dataSource = data;

    })
  }

  ngOnInit() {
  }

}
