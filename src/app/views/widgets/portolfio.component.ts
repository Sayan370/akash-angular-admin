import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogState } from '@angular/material/dialog';
import { PortfolioDialog } from '../../dialog/portfolio-dialog';
import { ApiService } from '../../service/api.service';
import { AppVariables } from '../../others/constant';
import { Subject } from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  templateUrl: 'portfolio.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PortfolioComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['position', 'title', 'action'];
  isAddLoading = false;
  isEditLoading = false;
  isDeleteLoading = false;
  isEditData = false;
  isDeleteData = false;
  isLoading = false;
  dataSource = new MatTableDataSource<PortfolioElement>();
  private portfolioAddStatusDataSubject: Subject<any> = new Subject<any>();
  private portfolioEditStatusDataSubject: Subject<any> = new Subject<any>();
  private portfolioDeleteStatusDataSubject: Subject<any> = new Subject<any>();
  
  expandedElement: PortfolioElement | null;
  public AddformData: any;
  public EditformData: any;
  public DeleteformData: any;
  public dialogRef: any
  public categoryDataSource: any
  public appConstants = new AppVariables();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog, public Api: ApiService, private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.FetchData();
    this.FetchCategoryData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  public openPortfolioDialog(datax?: any, type?: string): void {
    this.dialogRef = this.dialog.open(PortfolioDialog, {
      width: '500px'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.dialogRef.componentInstance.categoryDataSubject.next(this.categoryDataSource);
    if (type == 'EDIT') {
      this.isEditData = true;
      if (this.isEditLoading == false) {
        this.dialogRef.componentInstance.editDataSubject.next(datax);
        this.dialogRef.componentInstance.portfolioFormDataSubject$.subscribe((multiFormData) => {
          this.isEditLoading = true;
          this.EditformData = multiFormData.formVal;
          this.Api.sendEditPortfolioRequest(multiFormData.formData).subscribe((data) => {
            this.portfolioEditStatusDataSubject.next();
            this._snackBar.open('Portfolio Updated Successfully', 'Close', {
              horizontalPosition: "right",
              verticalPosition: "top",
              duration: 5000,
              panelClass: "success-notification"
            });
            this.FetchData();
            this.isEditLoading = false;
          }, (error) => {
            this.isEditLoading = false;
            this._snackBar.open(`Error Occured ${error}`, 'Close', {
              horizontalPosition: "right",
              verticalPosition: "top",
              duration: 5000,
              panelClass: "error-notification"
            });
          });
        });
      } else {
        this.dialogRef.componentInstance.portfolioEditStatusSubject.next(this.EditformData);
      }
    }
    else if (type == 'ADD') {
      if (this.isAddLoading == false) {
        this.dialogRef.componentInstance.portfolioFormDataSubject$.subscribe((multiFormData) => {
            this.isAddLoading = true;
            this.AddformData = multiFormData.formVal;
            this.Api.sendAddPortfolioRequest(multiFormData.formData).subscribe((data) => {
            this.portfolioAddStatusDataSubject.next();
            this._snackBar.open('Portfolio Added Successfully', 'Close', {
              horizontalPosition: "right",
              verticalPosition: "top",
              duration: 5000,
              panelClass: "success-notification"
            });
            this.FetchData();
            this.isAddLoading = false;
          }, (error) => {
            this.isAddLoading = false;
            this._snackBar.open(`Error Occured ${error}`, 'Close', {
              horizontalPosition: "right",
              verticalPosition: "top",
              duration: 5000,
              panelClass: "error-notification"
            });
          });
        });
      } else {
        this.dialogRef.componentInstance.portfolioAddStatusSubject.next(this.AddformData);
      }
    }
    else {
      this.isDeleteData = true;
      if (this.isDeleteLoading == false) {
        this.dialogRef.componentInstance.deleteDataSubject.next(datax);
        this.dialogRef.componentInstance.portfolioFormDataSubject$.subscribe((formData) => {
          this.isDeleteLoading = true;
          this.DeleteformData = datax;
          this.Api.sendDeletePortfolioRequest(formData).subscribe((data) => {
            this.portfolioDeleteStatusDataSubject.next();
            this.FetchData();
            this.isDeleteLoading = false;
            this._snackBar.open('Portfolio Deleted Successfully', 'Close', {
              horizontalPosition: "right",
              verticalPosition: "top",
              duration: 5000,
              panelClass: "success-notification"
            });
          }, (error) => {
            this._snackBar.open(`Error Occured ${error}`, 'Close', {
              horizontalPosition: "right",
              verticalPosition: "top",
              duration: 5000,
              panelClass: "error-notification"
            });
            this.isDeleteLoading = false;
          });
        });
      } else {
        this.dialogRef.componentInstance.portfolioDeleteStatusSubject.next(this.DeleteformData);
      }
    }
    this.portfolioAddStatusDataSubject.subscribe(() => {
      if (this.dialogRef.getState() === MatDialogState.OPEN) {
        this.dialogRef.componentInstance.isLoadingSubject.next();
      }
    });
    this.portfolioEditStatusDataSubject.subscribe(() => {
      if (this.dialogRef.getState() === MatDialogState.OPEN) {
        this.dialogRef.componentInstance.isLoadingSubject.next();
      }
    });
    this.portfolioDeleteStatusDataSubject.subscribe(() => {
      if (this.dialogRef.getState() === MatDialogState.OPEN) {
        this.dialogRef.componentInstance.isLoadingSubject.next();
      }
    });
  }
  public FetchData() {
    this.isLoading = true;
    let counter = 0;
    this.Api.fetchPortfolioRequest().subscribe((data: PortfolioElement[]) => {
      data.forEach((d) => {
        this.Api.fetchSpecificCategoryRequest(d.category).subscribe((data) => {
          counter++;
          if (data) {
            d.categoryTitle = data.title;
          } else {
            d.categoryTitle = null;
          }
          d.position = counter;
        });
      });
      this.dataSource.data = data;
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
    });
  }
  public FetchCategoryData() {
    this.Api.fetchCategoryRequest().subscribe((data: CategoryElement[]) => {
      this.categoryDataSource = data;
    }, (error) => {
    });
  }
 public  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
export interface PortfolioElement {
  title: string;
  _id: string;
  position: number;
  photo: string;
  category: any;
  categoryTitle: string;
}
export interface CategoryElement {
  title: string;
  id: number;

}


