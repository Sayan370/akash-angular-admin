import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './category.component';
import { ContactComponent } from './contact.component';
import { PortfolioComponent } from './portolfio.component';

const routes: Routes = [
  
  {
    path: '',
    data: {
      title: 'Widgets'
    },
    children: [
      {
        path: '',
        redirectTo: 'category'
      },
      {
        path: 'category',
        component: CategoryComponent,
        data: {
          title: 'Manage Category'
        }
      },
      {
        path: 'portfolio',
        component: PortfolioComponent,
        data: {
          title: 'Manage Portfolio'
        }
      },
   
      {
        path: 'contact',
        component: ContactComponent,
        data: {
          title: 'Manage Contact'
        }
      },
   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule {}
