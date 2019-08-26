import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { Router, RouterModule } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
// import { TaskAllocationComponent } from '../registration/book-keeper1/task-allocation/task-allocation.component';
// import { FileViewerComponent } from '../registration/file-viewer/file-viewer.component';
import { Base64 } from 'js-base64';
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
@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {
  url = environment.Url;
  // file = [];
  // name = []
  docnames = [];
  docnamesindex: number = 0;
  a: [];
  d: string;
  // close() {
  //   this.dialogRef.close();
  // }
  file = JSON.parse(localStorage.getItem('fileviewerdata'))
  name = JSON.parse(localStorage.getItem('fileviewername'))

  constructor(public router: Router, public http: HttpClient) {
    console.log(this.file);
    console.log(this.name);
    for (let i in this.name) {
      this.docnames.push(this.name[i].split('.', 1))
    }
    this.d = this.docnames[this.docnamesindex];
  }
  // // const body = {
  // //   c_id: data['c_id'],
  // //   c_type: data['c_type'],
  // //   case: data['case']
  // // };
  // // console.log(body);
  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*'
  //     // 'Content-type': 'application/pdf',
  //     // 'Content-disposition': 'attachment'
  //   })
  // };
  // this.http.post(this.url + '/files/view', this.viewdocs, httpOptions).subscribe(
  //   data1 => {
  //     console.log(data1);
  //     this.file = data1['files']
  //     console.log(this.file)
  //     this.name = data1['names']

  //   });
  // error => {
  //   console.log('invalid');

  // }

  onPrevious(e) {
    // console.log(e)
    this.docnamesindex = e - 1;
    this.d = this.docnames[this.docnamesindex];
  }
  onNext(e) {
    this.docnamesindex = e - 1;
    this.d = this.docnames[this.docnamesindex];
    // console.log(this.name)
    console.log(e)
    // // let z = e.target.value
    // console.log(this.name.length)
    // for (let z = 0; z <= this.name.length; z++) {
    //   console.log(z)
    //   if (e == z) {
    //     console.log(e)
    //     this.a = this.name[z].split('.', 1);
    //     // e++;
    //     console.log(this.a)
    //   }
    // }

  }
  ngOnInit() {
  }

}


      //    const fileList: FileList = e.target.files;
      //    // const l = '';
      //    // console.log(fileList.length);
      //    for (let i = 0; i < fileList.length; i++) {
      //      readBase64(fileList[i]).then((data: any) => {
      //        const splitted = data.split(',', 2);
      //        // console.log(splitted);
      //        // console.log(splitted[1]);
      //        this.docString = splitted[1];
      //        this.docs.push(this.docString);
      //        // console.log(this.docs);
      //        // this.response.push(this.docs);
      //        // FileList = new Blob([response] , {type: 'application/pdf'});
      //      });
      //    }
      //  }
      //    for (let k = 0; k < fileList.length; k++) {
      //     readBase64(fileList[k]).then((data: any) => {
      //       const splitted = data.split(',', 2);
      //       // console.log(splitted);
      //       this.docString = splitted[1];
      //       this.docs.push(this.docString);
      //       // console.log(this.docs);
      //       // FileList = new Blob([response] , {type: 'application/pdf'});
      //     });
      //   }
        //  this.file.push({'file':data1['files'],'name':data1['names']})
        //  console.log(this.file[0].file)
        //  console.log(data1)
        // readBase64(data1['files'][1]).then((data: any)=>{
        //   this.file=data1['files'][1]
        // })
        //  console.log(Base64.encode(data1['files']))
        //  for (let i = 0; i < data1['files'].length; i++) {
        //    console.log("hi")
        //   // if (data1['files'][i]== 'pdf') {
        //       readBase64(data1['files']).then((data: any) => {

        //         this.file = data1['files'];
        //         console.log(this.data.split('/', 1));

        //       })
        //     // }
          // }
        // this.file=  EncodeDecode.b64EncodeUnicode(data1['files']);
        // console.log(this.file[0]);
        // localStorage.setItem('data2' , JSON.stringify(data1));
        // const o = localStorage.getItem('data2' );
        // console.log(o);