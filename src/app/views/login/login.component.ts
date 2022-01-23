import { Component,NgZone  } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import { ApiService } from './../../service/api.service';
import { Router } from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 

  hide = true;
  loading = false;
 
  userData:any;
  constructor(
    public Api:ApiService,
    public router: Router,  
    public ngZone: NgZone ,
    private _snackBar: MatSnackBar
      ) { }

  form  = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required]),
  
    });
  
    getErrorMessage(type:String) {
      if(type=='email'){
        if (this.form.controls.email.hasError('required')) {
          return 'You must enter a value';
        }
        return this.form.controls.email.hasError('email') ? 'Not a valid email' : '';
  
  
      }
    
      else if(type=='password'){
      
  
      return this.form.controls.password.hasError('required') ? 'You must enter a value' : '';
  
    }
  
    return '';
  
  
     
    }

    public setUserData(user){

      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    }

    public loginUser(formVal:any){

      if(this.form.valid){
      this.loading = true;
      this.Api.sendLoginRequest(formVal).subscribe((data)=>{
  
        this.setUserData(data);

        if(data){
          this._snackBar.open(`Welcome ${data.name}`, 'Login Success', {
            horizontalPosition: "right",
            verticalPosition: "top",
            duration: 5000,
            panelClass: "success-notification"
          });
          this.ngZone.run(() => {
            this.router.navigate(['dashboard']);
          });
        }else{

          this._snackBar.open(`Invalid Credentials`, 'Failed', {
            horizontalPosition: "right",
            verticalPosition: "top",
            duration: 5000,
            panelClass: "error-notification"
          });
        }

        this.loading = false;
  
      },(error)=>{
  
        this._snackBar.open(`Error ${error}`, 'Failed', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 5000,
          panelClass: "error-notification"
        });
        this.loading = false;
      });
      
    }

  }


}
