import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { CoreService } from '../baseurl.service';
/*
  Generated class for the ReportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportProvider {

  constructor(public http: Http,private coreService:CoreService) {
    console.log('Hello ReportProvider Provider');
  }

  getAllReports():Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getAllReports;
    let body = {};
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

  addReportType(viewParam):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.addReportType;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  editReportType(viewParam,id):Observable<any>{
    var url = this.coreService.baseUrl + this.coreService.editReportType +id;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.patch(url,body,options).map((res:Response) => res.json());
  }

  getPositionReportType(id):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getPositionReportType + id;
    let body = {};
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

  setReporttoPositon(viewParam,id):Observable<any>{
    var url = this.coreService.baseUrl + this.coreService.setReporttoPositon +id;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  getEnableCreateReport():Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getEnableCreateReport;
    let body = {};
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

  createReport(viewParam):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.createReport;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  
  getUserCreatedReprot():Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getUserCreatedReprot;
    let body = {};
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

  getUserReviewedReprot():Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getUserReviewedReprot;
    let body = {};
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

  getUserForwardReprot():Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getUserForwardReprot;
    let body = {};
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

  editUserReportType(viewParam,id):Observable<any>{
    var url = this.coreService.baseUrl + this.coreService.editUserReportType +id;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.patch(url,body,options).map((res:Response) => res.json());
  }
}
