import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MatDialogState, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CategoryDialog } from './../../dialog/category-dialog';
import { ApiService } from '../../service/api.service';
import { Subject } from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  templateUrl: 'category.component.html'
})
export class CategoryComponent implements AfterViewInit , OnInit {

  displayedColumns: string[] = ['position', 'title', 'action'];
  dataSource = new MatTableDataSource<CategoryElement>();
  private categoryAddStatusDataSubject: Subject<any> = new Subject<any>();
  private categoryEditStatusDataSubject: Subject<any> = new Subject<any>();
  private categoryDeleteStatusDataSubject: Subject<any> = new Subject<any>();
  public AddformData:any;
  public EditformData:any;
  public DeleteformData:any;
  public dialogRef:any
  isAddLoading=false;
  isEditLoading=false;
  isDeleteLoading=false;
  isEditData=false;
  isDeleteData=false;
  isLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, public Api: ApiService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {

this.FetchData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public openCategoryDialog(data?:any, type?:string):void{
    this.dialogRef = this.dialog.open(CategoryDialog, {
      width: '500px'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
   
    });
    if(type=='EDIT'){
     this.isEditData=true;
    
     if(this.isEditLoading==false){
      this.dialogRef.componentInstance.editDataSubject.next(data);
      this.dialogRef.componentInstance.categoryFormDataSubject$.subscribe((formData)=>{
   
        this.isEditLoading=true;
        this.EditformData=formData;
  
        this.Api.sendEditCategoryRequest(formData).subscribe((data)=>{

  
          this.categoryEditStatusDataSubject.next();
  
  
          this.FetchData();
       
          
          this.isEditLoading=false;
  
         
    
          this._snackBar.open(`Category Edited Successfully`, 'Close', {
            horizontalPosition: "right",
            verticalPosition: "top",
            duration: 5000,
            panelClass: "success-notification"
          });
         
        },(error)=>{
    
          this._snackBar.open(`Error Occured ${error}`, 'Close', {
            horizontalPosition: "right",
            verticalPosition: "top",
            duration: 5000,
            panelClass: "error-notification"
          });
         
        });
  
      });

     }else{

      this.dialogRef.componentInstance.categoryEditStatusSubject.next(this.EditformData);
      
     }

    }
    else if(type=='ADD'){


  
    if(this.isAddLoading==false){
      this.dialogRef.componentInstance.categoryFormDataSubject$.subscribe((formData)=>{
   
      this.isAddLoading=true;
      this.AddformData=formData;

      this.Api.sendAddCategoryRequest(formData).subscribe((data)=>{
        
   
        this.categoryAddStatusDataSubject.next();



        this.FetchData();
        this.isAddLoading=false;

      

        this._snackBar.open(`Category Added Successfully`, 'Close', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 5000,
          panelClass: "success-notification"
        });
  
  
       
      },(error)=>{
  
        this._snackBar.open(`Error ${error}`, 'Close', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 5000,
          panelClass: "error-notification"
        });
       
      });

    });

  }else{


   
    
    this.dialogRef.componentInstance.categoryAddStatusSubject.next(this.AddformData);

    
  }


}
else{
  this.isDeleteData=true;
 
  if(this.isDeleteLoading==false){
   this.dialogRef.componentInstance.deleteDataSubject.next(data);
   this.dialogRef.componentInstance.categoryFormDataSubject$.subscribe((formData)=>{

     this.isDeleteLoading=true;
     this.DeleteformData=data;

     this.Api.sendDeleteCategoryRequest(formData).subscribe((data)=>{


       this.categoryDeleteStatusDataSubject.next();


    

       this.FetchData();
       this.isDeleteLoading=false;

       this._snackBar.open(`Category Deleted Successfully`, 'Close', {
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 5000,
        panelClass: "success-notification"
      });
 
 
      
     },(error)=>{
 
      
      this._snackBar.open(`Error ${error}`, 'Close', {
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 5000,
        panelClass: "error-notification"
      });
      
     });

   });

  }else{

   this.dialogRef.componentInstance.categoryDeleteStatusSubject.next(this.DeleteformData);
   
  }

 }

this.categoryAddStatusDataSubject.subscribe(()=>{
  if(this.dialogRef.getState() === MatDialogState.OPEN) {
    this.dialogRef.componentInstance.isLoadingSubject.next();

  }

});


this.categoryEditStatusDataSubject.subscribe(()=>{
  if(this.dialogRef.getState() === MatDialogState.OPEN) {
   
    this.dialogRef.componentInstance.isLoadingSubject.next();

  }

});

this.categoryDeleteStatusDataSubject.subscribe(()=>{
  if(this.dialogRef.getState() === MatDialogState.OPEN) {
   
    this.dialogRef.componentInstance.isLoadingSubject.next();

  }

});




  }

  public sendData(val){
    console.log(val);
  }

  public FetchData(){
    this.isLoading=true;
    let counter=0;
    this.Api.fetchCategoryRequest().subscribe((data:CategoryElement[])=>{
        
     
     
      data.forEach((d) => { 
        counter++;
        d.position = counter;
      });

      this.dataSource.data=data;

      this.isLoading = false;

    },(error)=>{

      this.isLoading = false;
    });


  }

}

export interface CategoryElement {
  title: string;
  id:number;
  position:number;
}


