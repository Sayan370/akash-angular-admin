import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { ApiService } from './../../service/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  constructor(

    public apiService: ApiService,
    private _snackBar:MatSnackBar
  ) { }


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
