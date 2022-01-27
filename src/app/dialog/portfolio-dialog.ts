import { Component, OnDestroy  } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Subject, Observable } from "rxjs";


@Component({
    selector: 'portfolio-dialog',
    templateUrl: 'portfolio-dialog.html',
  })
  export class PortfolioDialog implements OnDestroy {

    hide = true;
    loading = false;
    isEdit=false;
    isDelete=false;
    formDatas:any;
    categoryData:any;
    public prevData:any
    dialogTitle='Add Portfolio';

    private portfolioFormDataSubject: Subject<any> = new Subject<any>();
    public portfolioAddStatusSubject: Subject<any> = new Subject<any>();
    public portfolioDeleteStatusSubject: Subject<any> = new Subject<any>();
    public categoryDataSubject: Subject<any> = new Subject<any>();
    public portfolioEditStatusSubject: Subject<any> = new Subject<any>();
    public editDataSubject: Subject<any> = new Subject<any>();
    public deleteDataSubject: Subject<any> = new Subject<any>();
    public isLoadingSubject: Subject<any> = new Subject<any>();
    public portfolioFormDataSubject$: Observable<any> = this.portfolioFormDataSubject.asObservable();
    userData:any;
    constructor(
      public Api:ApiService,
      public dialogRef: MatDialogRef<PortfolioDialog>,
    
        ) {

          this.editDataSubject.subscribe((formData)=>{
         
            this.isEdit=true;
            this.form.get('photo').clearValidators();
            this.formDatas=formData;
        
            this.setValue(this.formDatas);
            this.dialogTitle=`Edit Portfolio For `;
          });
          this.categoryDataSubject.subscribe((data)=>{
         
            this.categoryData=data;
          
          });

          this.deleteDataSubject.subscribe((formData)=>{
            this.isDelete=true;
            this.formDatas=formData;
        
            this.setValue(this.formDatas);
            this.dialogTitle=`Delete Portfolio For ${this.formDatas.title}`;
          });
          this.portfolioAddStatusSubject.subscribe((formData)=>{
            this.loading=true;
            this.formDatas=formData;
            this.setValue(this.formDatas);
            
          });
  


          this.portfolioEditStatusSubject.subscribe((formData)=>{
            this.loading=true;
            this.isEdit=true;
            this.form.get('photo').clearValidators();
            this.formDatas=formData;
            this.setValue(this.formDatas);
            this.dialogTitle=`Edit Portfolio For `;
          });
          this.portfolioDeleteStatusSubject.subscribe((formData)=>{
            this.loading=true;
            this.isDelete=true;
            this.formDatas=formData;
            this.setValue(this.formDatas);
            this.dialogTitle=`Delete Portfolio For ${this.formDatas.title}`;
          });
          this.isLoadingSubject.subscribe(()=>{
            this.loading=false;
           this.onNoClick();
          });
         }
  
    form  = new FormGroup({
        title : new FormControl('', [Validators.required]),
        photo : new FormControl('', [Validators.required]),
        category : new FormControl('', [Validators.required])
      });
    
      getErrorMessage(type:String) {
        if(type=='title'){
          if (this.form.controls.title.hasError('required')) {
            return 'You must enter a value';
          }
    
          return '';
    
        }
     
        else if(type=='photo'){
          if (this.form.controls.photo.hasError('required')) {
            return 'You must enter a value';
          }
    
          return '';
    
        }else{

          if (this.form.controls.category.hasError('required')) {
            return 'You must Select a Category';
          }
    
          return '';

        }
     
    
      return '';
    
    
       
      }


      public SendData(formVal:any){



        if(this.form.valid){
         
          
          this.loading = true;
          if(this.isEdit){

            const formData = new FormData();  
            formData.append('title',formVal.title);
            formData.append('category',formVal.category);
            formData.append('id',this.formDatas._id);
            formData.append('photo',formVal.photo);
          


            this.portfolioFormDataSubject.next({formVal,formData});
          
          }else{
            const formData = new FormData();  
            formData.append('title',formVal.title);
            formData.append('category',formVal.category);
            formData.append('photo',formVal.photo);
      

            this.portfolioFormDataSubject.next({formVal,formData});

          }
     
          }
       

          if(this.isDelete){

            this.loading = true;
            this.portfolioFormDataSubject.next({id: this.formDatas._id});
          }
      }

      public setValue(data:any) {
        this.form.patchValue({title: data.title, category:data.category, photo:data.photo });
      }

      

      public onNoClick(): void {
        this.dialogRef.close();
      }

      ngOnDestroy(): void{
        this.portfolioAddStatusSubject.unsubscribe();
        this.portfolioEditStatusSubject.unsubscribe();
        this.portfolioDeleteStatusSubject.unsubscribe();
        this.isLoadingSubject.unsubscribe();
        this.deleteDataSubject.unsubscribe();
        this.editDataSubject.unsubscribe();

      }
  
  }