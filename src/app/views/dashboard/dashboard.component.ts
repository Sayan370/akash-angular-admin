import { Component, OnInit } from '@angular/core';

import { ApiService } from './../../service/api.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public isCatLoading:boolean;
  public isPortfolioLoading:boolean;
  public isContactLoading:boolean;
  public catcounter:number=0;
  public portfoliocounter:number=0;
  public contactcounter:number=0;

  constructor(public Api: ApiService) {}


  public FetchCatData(){
    this.isCatLoading=true;
  
    this.Api.fetchCategoryRequest().subscribe((data)=>{
        
     
     
      data.forEach((d) => { 
        this.catcounter++;
      });

   

      this.isCatLoading = false;

    },(error)=>{

      this.isCatLoading = false;
    });


  }
  public FetchContactData(){
    this.isContactLoading=true;
  
    this.Api.fetchContactRequest().subscribe((data)=>{
        
     
     
      data.forEach((d) => { 
        this.contactcounter++;
      });

   

      this.isContactLoading = false;

    },(error)=>{

      this.isContactLoading = false;
    });


  }
  public FetchPortfolioData(){
    this.isPortfolioLoading=true;
  
    this.Api.fetchPortfolioRequest().subscribe((data)=>{
        
     
     
      data.forEach((d) => { 
        this.portfoliocounter++;
      });

   

      this.isPortfolioLoading = false;

    },(error)=>{

      this.isPortfolioLoading = false;
    });


  }
  ngOnInit(): void {
  this.FetchCatData(); 
  this.FetchContactData();  
  this.FetchPortfolioData();  
  }
}
