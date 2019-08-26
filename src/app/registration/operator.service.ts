import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  constructor(public http: HttpClient, public httpModule: Http) { }
  getService(url: any,) {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get(url, httpOptions)
  }

postService(url: any, body: any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  return this.http.post(url, body, httpOptions)
}
}
