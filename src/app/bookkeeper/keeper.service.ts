import { Injectable, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class KeeperService {
  constructor(public http: HttpClient, public httpModule: Http) { }
  getIstatus(url: any){
    let i;
    
return this.http.get(url + '/task/status')

}
}
