import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoryComponent } from './category.component';
import { ContactComponent } from './contact.component';
import { PortfolioComponent } from './portolfio.component';
import { WidgetsRoutingModule } from './widgets-routing.module';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { CategoryDialog } from './../../dialog/category-dialog';
import { ContactDialog } from './../../dialog/contact-dialog';
import { PortfolioDialog } from './../../dialog/portfolio-dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({
  imports: [

  WidgetsRoutingModule,
    BsDropdownModule,
    MatTableModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule
  ],
  declarations: [ CategoryComponent, ContactComponent, PortfolioComponent, CategoryDialog,ContactDialog, PortfolioDialog ]
})
export class WidgetsModule { }
