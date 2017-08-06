import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpEventType, HttpResponse } from "@angular/common/http";
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map'
import { Observer } from "rxjs/Observer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  projectForm: FormGroup;
  projectStatus = ['Stable', 'Criticle', 'Finished']

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'project': new FormControl(null, [Validators.required], [this.validateForbidentProjectName.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl(null, [Validators.required])
    })

    this.initialProjectForm();

    this.projectForm.statusChanges.subscribe(status => console.log(status));
  }

  initialProjectForm() {
    this.projectForm.setValue({
      'project': '',
      'email': '',
      'status': '',
    })
  }

  // private forbidentProjectName = ['test'];
  // validateForbidentProjectName(formControl: FormControl): Observable<any> {
  //   return Observable.create((observer: Observer<any>) => {
  //     this.getForbidentProject().subscribe(resp => {

  //         if (resp.indexOf(formControl.value) !== -1) {
  //           observer.next({
  //             'forbidentProjectName': true
  //           })
  //         } else {
  //           observer.next(null)
  //         }
  //       })
  //   });
  // }

  validateForbidentProjectName(formControl: FormControl): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.getForbidentProject().subscribe(resp => {
          if (resp.indexOf(formControl.value) !== -1) {
            resolve({
              'forbidentProjectName': true
            })
          } else {
            resolve(null);
          }
        })
      }, 1000)
    });
  }


  private getForbidentProject(): Observable<string[]> {
    return this.http.get('http://localhost:3001/projects').map(data => {
      return data['forbidents'];
    })
  }

  validateInvalid(formControlName: string) {
    return !this.projectForm.get(formControlName).valid &&
      this.projectForm.get(formControlName).touched
  }

  validateValid(formControlName: string) {

    return this.projectForm.get(formControlName).valid
  }

  validatePending(formControlName: string) {
    return this.projectForm.get(formControlName).pending
  }

  submitted = false;
  onSubmit() {
    this.submitted = true;
    this.mappingProject();
    console.log(this.projectForm);
  }

  onReset(){
    this.projectForm.reset();
    this.project = {};
    this.submitted = false;
  }

  project: any = {};
  mappingProject() {
    this.project.project = this.projectForm.get('project').value;
    this.project.email = this.projectForm.get('email').value;
    this.project.status = this.projectForm.get('status').value;
  }

}












// class Customer {
//   public firstName: String;
//   public lastName: String;
//   public age: Number;
//   public address: Address;
//   public phoneNumbers: PhoneNumber[]
// }

// class Address {

//   public streetAddress: String;
//   public city: String;
//   public state: String;
//   public postalCode: String;
// }

// class PhoneNumber {

//   public type: String;
//   public number: String;
// }






    // // this.http.get<Customer>("http://localhost:3000/cusstomer", { observe: 'response' }).subscribe(resp => {
    // //   debugger;
    // //   console.log(resp);
    // // }, error => this.erreHandle)
    // const req = new HttpRequest('GET', 'http://localhost:3000/customer', {
    //   reportProgress: true,
    // });
    // this.http.request(req)
    //   //.get<Customer>('http://localhost:3000/customer')
    //   .retry(3)
    //   .subscribe(
    //   event => {
    //     if (event.type === HttpEventType.UploadProgress) {
    //       // This is an upload progress event. Compute and show the % done:
    //       const percentDone = Math.round(100 * event.loaded / event.total);
    //       console.log(`File is ${percentDone}% uploaded.`);
    //     } else if (event instanceof HttpResponse) {
    //       console.log('File is completely uploaded!');
    //     }
    //   },
    //   (err: HttpErrorResponse) => {
    //     if (err.error instanceof Error) {
    //       // A client-side or network error occurred. Handle it accordingly.
    //       console.log('An error occurred:', err.error.message);
    //     } else {
    //       // The backend returned an unsuccessful response code.
    //       // The response body may contain clues as to what went wrong,
    //       console.log(`Backend returned code ${err.status}, body was:`);
    //       console.log(err.error);
    //     }
    //   })
