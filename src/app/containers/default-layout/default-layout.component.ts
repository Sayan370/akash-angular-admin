import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { ApiService } from './../../service/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  public AppUrl=environment.FRONTEND_API_URL;
  public userData:any;
  constructor(

    public apiService: ApiService,
    private _snackBar:MatSnackBar
  ) {

   this.userData=this.apiService.userData;
   }


  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(){
    this.apiService.SignOut();
    this._snackBar.open(`Safely Logout Successfully`, 'Close', {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 5000,
      panelClass: "success-notification"
    });

  }
}
