import { Component  } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Subject, Observable } from "rxjs";


@Component({
    selector: 'contact-dialog',
    templateUrl: 'contact-dialog.html',
  })
  export class ContactDialog {

    hide = true;
    loading = false;
  
    isDelete=false;
    formDatas:any;
    dialogTitle='Add Contact';
    private contactFormDataSubject: Subject<any> = new Subject<any>();
   
    public contactDeleteStatusSubject: Subject<any> = new Subject<any>();
  
  
    public deleteDataSubject: Subject<any> = new Subject<any>();
    public isLoadingSubject: Subject<any> = new Subject<any>();
    public contactFormDataSubject$: Observable<any> = this.contactFormDataSubject.asObservable();
    userData:any;
    constructor(
      public Api:ApiService,
      public dialogRef: MatDialogRef<ContactDialog>,
    
        ) {

    

          this.deleteDataSubject.subscribe((formData)=>{
            this.isDelete=true;
            this.formDatas=formData;
        
            this.setValue(this.formDatas);
            this.dialogTitle=`Delete Contact For ${this.formDatas.name}`;
          });
       
          this.contactDeleteStatusSubject.subscribe((formData)=>{
            this.loading=true;
            this.isDelete=true;
            this.formDatas=formData;
            this.setValue(this.formDatas);
            this.dialogTitle=`Delete Contact For ${this.formDatas.name}`;
          });
          this.isLoadingSubject.subscribe(()=>{
            this.loading=false;
           this.onNoClick();
          });
         }
  
    form  = new FormGroup({
        name : new FormControl('', [Validators.required])
    
      });
    


      public SendData(formVal:any){

      

        if(this.form.valid){
          this.loading = true;
          if(this.isDelete){


            this.contactFormDataSubject.next({id: this.formDatas._id});
          }
      
           

          
          
            
          }
      }

      public setValue(data:any) {
        this.form.setValue({name: data.name});
      }

      public onNoClick(): void {
        this.dialogRef.close();
      }
  
  }