import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppVariables } from '../others/constant';
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import {HttpCommon} from '../others/http-common';
@Injectable({
  providedIn: 'root'
})
export class ApiService extends HttpCommon {

  public loginUrl:string;
  public categoryAddUrl:string;
  public categoryEditUrl:string;
  public categoryDeleteUrl:string;
  public categoryFetchUrl:string;
  public categorySpecificFetchUrl:string;
  public portfolioAddUrl:string;
  public portfolioEditUrl:string;
  public portfolioDeleteUrl:string;
  public portfolioFetchUrl:string;
  public contactFetchUrl:string;
  public contactDeleteUrl:string;

  public appConstants=new AppVariables();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    super();
    this.loginUrl=this.appConstants.LOGIN_URL;
    this.categoryAddUrl=this.appConstants.CATEGORY_ADD_URL;
    this.categoryEditUrl=this.appConstants.CATEGORY_EDIT_URL;
    this.categoryDeleteUrl=this.appConstants.CATEGORY_DELETE_URL;
    this.categoryFetchUrl=this.appConstants.CATEGORY_GET_URL;
    this.categorySpecificFetchUrl=this.appConstants.CATEGORY_FETCH_URL;
    this.portfolioAddUrl=this.appConstants.PORTFOLIO_ADD_URL;
    this.portfolioEditUrl=this.appConstants.PORTFOLIO_EDIT_URL;
    this.portfolioDeleteUrl=this.appConstants.PORTFOLIO_DELETE_URL;
    this.portfolioFetchUrl=this.appConstants.PORTFOLIO_GET_URL;
    this.contactFetchUrl=this.appConstants.CONTACT_GET_URL;
    this.contactDeleteUrl=this.appConstants.CONTACT_DELETE_URL;
  }

  public sendLoginRequest(data: any): Observable<any> {

    return this.http.post<any>(this.loginUrl, data, this.createJsonRequestHeader())
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError));

  }

  public sendAddCategoryRequest(data: any): Observable<any> {

    return this.http.post<any>(this.categoryAddUrl, data, this.createJsonRequestHeader())
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError));

  }

  public sendEditCategoryRequest(data: any): Observable<any> {

    return this.http.post<any>(this.categoryEditUrl, data, this.createJsonRequestHeader())
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError));

  }
  public sendDeleteCategoryRequest(data: any): Observable<any> {

    return this.http.post<any>(this.categoryDeleteUrl, data, this.createJsonRequestHeader())
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError));

  }
  public fetchCategoryRequest(): Observable<any> {

    return this.http.get<any>(this.categoryFetchUrl,this.createJsonRequestHeader())
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError));

  }
  public fetchSpecificCategoryRequest(data:any): Observable<any> {

    
    return this.http.post<any>(this.categorySpecificFetchUrl,{id: data},this.createJsonRequestHeader())
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError));

  }
  public sendAddPortfolioRequest(data: any): Observable<any> {

    return this.http.post<any>(this.portfolioAddUrl, data)
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError));

  }

  public sendEditPortfolioRequest(data: any): Observable<any> {

    return this.http.post<any>(this.portfolioEditUrl, data)
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError));

  }
  public sendDeletePortfolioRequest(data: any): Observable<any> {


    return this.http.post<any>(this.portfolioDeleteUrl, data, this.createJsonRequestHeader())
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError));

  }
  public fetchPortfolioRequest(): Observable<any> {

    return this.http.get<any>(this.portfolioFetchUrl,this.createJsonRequestHeader())
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError));

  }


  public sendDeleteContactRequest(data: any): Observable<any> {
  

    return this.http.post<any>(this.contactDeleteUrl, data, this.createJsonRequestHeader())
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError));

  }
  public fetchContactRequest(): Observable<any> {

    return this.http.get<any>(this.contactFetchUrl,this.createJsonRequestHeader())
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError));

  }

  public SignOut() {
  
    localStorage.removeItem('user');
    this.router.navigate(['login']);

}

     // Returns true when user is looged in and email is verified
     get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user !== null) ? true : false;
    }

    get userData(){

      const users = JSON.parse(localStorage.getItem('user'));
      return users;
    }
}
