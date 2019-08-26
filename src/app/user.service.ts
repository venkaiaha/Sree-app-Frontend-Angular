import { Injectable, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';

import { LoginComponent } from '../app/pages/login/login.component';

@Injectable()
export class UserService {
  role: any;


  constructor(public http: HttpClient, public httpModule: Http) { }
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
  // .subscribe(data => {
      
  //     console.log(data);
  //     this.role = data['role']
  //     console.log(this.role)

  //   },
  //     error => {
  //       console.log(error);
  //     })
  //   // console.log(this.role);
 


// console.log(body);
//  obs = this.http.post('http://183.82.112.165:5002/api/v1/auth/', this.body, this.httpOptions).subscribe(data=>{
// console.log(data);
// this.role = data['role'].toLowerCase();
//                 console.log(this.role); 
// })
// }

// @Injectable()
// export class PostService {
//     constructor(public http:Http){

//     }


//     postSerivices(url:any, body: any){
//         var headers =new Headers();
//         headers.append("content-type", "application/json");
//         var options = new RequestOptions({headers: headers});
//         this.http.post(url, body, options).subscribe(data=>{
//             console.log(data);
//         },
//         error =>{
//             console.log(error);
//         }
//         )
//     }
// }
