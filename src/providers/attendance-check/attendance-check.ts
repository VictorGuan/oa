import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { CoreService } from '../baseurl.service';

/*
  Generated class for the AttendanceCheckProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AttendanceCheckProvider {

  constructor(public http: Http,private coreService:CoreService) {
    console.log('Hello AttendanceCheckProvider Provider');
  }

  getPositionsAttendanceCheckList(id):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getPositionsAttendanceCheckList +id ;
    let body = {};
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }
  
  getAttendanceCheckDetailList(id):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getAttendanceCheckDetailList +id ;
    let body = {};
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

  addAttendanceCheckApply(viewParam,id):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.addAttendanceCheckApply + id;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }
  
  getCurrentDayOnOfficeTime():Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getCurrentDayOnOfficeTime ;
    let body = {};
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }
  
  addClockOnAndOff(viewParam):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.addClockOnAndOff;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  showEmployeeAttendanceCheckRecord(viewParam,id):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.showEmployeeAttendanceCheckRecord + id;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }
  
  verifyAttendanceCheckDetail(viewParam,id):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.verifyAttendanceCheckDetail + id;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }
  
  getEmployeeAttendanceChcekDetail(viewParam):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getEmployeeAttendanceChcekDetail;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

}
