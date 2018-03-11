import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { CoreService } from '../baseurl.service';
/*
  Generated class for the SchedulingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SchedulingProvider {

  constructor(public http: Http,private coreService:CoreService) {
    console.log('Hello SchedulingProvider Provider');
  }

  addPositionSchedule(viewParam,id):Observable<any>{
    var url = this.coreService.baseUrl + this.coreService.addPositionSchedule + id;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  editPositionSchedule(viewParam,id):Observable<any>{
    var url = this.coreService.baseUrl + this.coreService.editPositionSchedule + id;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  showPositionSchedule(viewParam,id):Observable<any>{
    var url = this.coreService.baseUrl + this.coreService.showPositionSchedule + id;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  showPositionListwithStatus(viewParam):Observable<any>{
    var url = this.coreService.baseUrl + this.coreService.showPositionListwithStatus;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  showEmployeeListwithStatus(viewParam):Observable<any>{
    var url = this.coreService.baseUrl + this.coreService.showEmployeeListwithStatus;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }
  
  setEmployeeSchedule(viewParam,id):Observable<any>{
    var url = this.coreService.baseUrl + this.coreService.setEmployeeSchedule + id;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }
  
  showEmployeeSchedule(viewParam,id):Observable<any>{
    var url = this.coreService.baseUrl + this.coreService.showEmployeeSchedule + id;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }
}
