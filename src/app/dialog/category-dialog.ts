import { Component  } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Subject, Observable } from "rxjs";


@Component({
    selector: 'category-dialog',
    templateUrl: 'category-dialog.html',
  })
  export class CategoryDialog {

    hide = true;
    loading = false;
    isEdit=false;
    isDelete=false;
    formDatas:any;
    dialogTitle='Add Category';
    private categoryFormDataSubject: Subject<any> = new Subject<any>();
    public categoryAddStatusSubject: Subject<any> = new Subject<any>();
    public categoryDeleteStatusSubject: Subject<any> = new Subject<any>();
    public categoryEditStatusSubject: Subject<any> = new Subject<any>();
    public editDataSubject: Subject<any> = new Subject<any>();
    public deleteDataSubject: Subject<any> = new Subject<any>();
    public isLoadingSubject: Subject<any> = new Subject<any>();
    public categoryFormDataSubject$: Observable<any> = this.categoryFormDataSubject.asObservable();
    userData:any;
    constructor(
      public Api:ApiService,
      public dialogRef: MatDialogRef<CategoryDialog>,
    
        ) {

          this.editDataSubject.subscribe((formData)=>{
            this.isEdit=true;
            this.formDatas=formData;
        
            this.setValue(this.formDatas);
            this.dialogTitle=`Edit Category For ${this.formDatas.title}`;
          });

          this.deleteDataSubject.subscribe((formData)=>{
            this.isDelete=true;
            this.formDatas=formData;
        
            this.setValue(this.formDatas);
            this.dialogTitle=`Delete Category For ${this.formDatas.title}`;
          });
          this.categoryAddStatusSubject.subscribe((formData)=>{
            this.loading=true;
            this.formDatas=formData;
            this.setValue(this.formDatas);
            
          });
          this.categoryEditStatusSubject.subscribe((formData)=>{
            this.loading=true;
            this.isEdit=true;
            this.formDatas=formData;
            this.setValue(this.formDatas);
            this.dialogTitle=`Edit Category For ${this.formDatas.title}`;
          });
          this.categoryDeleteStatusSubject.subscribe((formData)=>{
            this.loading=true;
            this.isDelete=true;
            this.formDatas=formData;
            this.setValue(this.formDatas);
            this.dialogTitle=`Delete Category For ${this.formDatas.title}`;
          });
          this.isLoadingSubject.subscribe(()=>{
            this.loading=false;
           this.onNoClick();
          });
         }
  
    form  = new FormGroup({
        title : new FormControl('', [Validators.required])
    
      });
    
      getErrorMessage(type:String) {
        if(type=='title'){
          if (this.form.controls.title.hasError('required')) {
            return 'You must enter a value';
          }
    
          return '';
    
        }
     
    
      return '';
    
    
       
      }

      public SendData(formVal:any){

      

        if(this.form.valid){
          this.loading = true;
          if(this.isEdit){


            formVal.id=this.formDatas._id;
            this.categoryFormDataSubject.next(formVal);
          
          }else if(this.isDelete){


            this.categoryFormDataSubject.next({id: this.formDatas._id});
          }
          else{

            this.categoryFormDataSubject.next(formVal);
          }
           

          
          
            
          }
      }

      public setValue(data:any) {
        this.form.setValue({title: data.title});
      }

      public onNoClick(): void {
        this.dialogRef.close();
      }
  
  }