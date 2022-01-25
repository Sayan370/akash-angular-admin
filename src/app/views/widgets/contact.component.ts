import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogState} from '@angular/material/dialog';
import { ContactDialog } from './../../dialog/contact-dialog';
import { ApiService } from '../../service/api.service';
import { Subject } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  templateUrl: 'contact.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ContactComponent implements AfterViewInit , OnInit {

  displayedColumns: string[] = ['position', 'name', 'action'];
  dataSource = new MatTableDataSource<ContactElement>();
  private contactAddStatusDataSubject: Subject<any> = new Subject<any>();
  private contactEditStatusDataSubject: Subject<any> = new Subject<any>();
  private contactDeleteStatusDataSubject: Subject<any> = new Subject<any>();
  expandedElement: ContactElement | null;
  public DeleteformData:any;
  public dialogRef:any
 
  isDeleteLoading=false;

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

  public openContactDialog(data?:any, type?:string):void{
    this.dialogRef = this.dialog.open(ContactDialog, {
      width: '500px'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
   
    });

  this.isDeleteData=true;
 
  if(this.isDeleteLoading==false){
   this.dialogRef.componentInstance.deleteDataSubject.next(data);
   this.dialogRef.componentInstance.contactFormDataSubject$.subscribe((formData)=>{

     this.isDeleteLoading=true;
     this.DeleteformData=data;

     this.Api.sendDeleteContactRequest(formData).subscribe((data)=>{


       this.contactDeleteStatusDataSubject.next();


     

       this.FetchData();
       this.isDeleteLoading=false;
 
       this._snackBar.open(`Contact Deleted Successfully`, 'Close', {
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

   this.dialogRef.componentInstance.contactDeleteStatusSubject.next(this.DeleteformData);
   
  }

 

this.contactAddStatusDataSubject.subscribe(()=>{
  if(this.dialogRef.getState() === MatDialogState.OPEN) {
    this.dialogRef.componentInstance.isLoadingSubject.next();

  }

});


this.contactEditStatusDataSubject.subscribe(()=>{
  if(this.dialogRef.getState() === MatDialogState.OPEN) {
   
    this.dialogRef.componentInstance.isLoadingSubject.next();

  }

});

this.contactDeleteStatusDataSubject.subscribe(()=>{
  if(this.dialogRef.getState() === MatDialogState.OPEN) {
   
    this.dialogRef.componentInstance.isLoadingSubject.next();

  }

});




  }


  public FetchData(){
    this.isLoading=true;
    let counter=0;
    this.Api.fetchContactRequest().subscribe((data:ContactElement[])=>{
        
     
     
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
 public  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

export interface ContactElement {
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  id:number;
  position:number;
}


