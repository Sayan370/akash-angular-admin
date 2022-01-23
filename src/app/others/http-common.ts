import {  HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";


export class HttpCommon {

    protected createJsonRequestHeader() {
        let headers: HttpHeaders = new HttpHeaders({"Content-Type": "application/json; charset=UTF-8",'Access-Control-Allow-Origin': '*'});
        return { headers: headers };
    }
    protected createFileJsonRequestHeader() {
        let headers: HttpHeaders = new HttpHeaders({"Content-Type": "multipart/form-data; boundary=MyBoundary",'enctype': 'multipart/form-data','Access-Control-Allow-Origin': '*'});
        return { headers: headers };
    }

    protected extractData(res: HttpResponse<any>): any {
        return res && res.body ? res.body : res;
    }

    protected handleError(error: HttpErrorResponse): any {
        let errMsg: string;
        if (error.error instanceof ErrorEvent) {
            errMsg = error.error.message || "Server error";
        } else if (error.error instanceof ProgressEvent) {
            errMsg = "Internet error! Please retry.";
        } else {
            errMsg = error.error || "Server error";
        }
        console.error(`Http Api call error object: ${JSON.stringify(error)}`);
        return throwError(errMsg);
    }

}