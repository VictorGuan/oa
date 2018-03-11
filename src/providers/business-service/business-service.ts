import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { CoreService } from '../baseurl.service';

import {Dept} from '../../request/dept';


/*
  Generated class for the BusinessServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BusinessServiceProvider {

  constructor(public http: Http,private coreService:CoreService) {
    console.log('Hello BusinessServiceProvider Provider');
  }

  //business
  getBusiness(): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getBusiness;
    let headers = new Headers();
    let body = {};
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

  postSpecifiedBusiness(viewParam): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.addBusiness;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }
  
  patchSpecifiedBusiness(viewParam,value): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.patchBusiness + value;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.patch(url,body,options).map((res:Response) => res.json());
  }

  //shop
  getShops(value): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getShops + value;
    let headers = new Headers();
    let body = {};
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }
  
  getSpecifiedShop(value): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getSpecifiedShop + value;
    let headers = new Headers();
    let body = {};
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

  postSpecifiedShop(viewParam,value): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.addShop + value;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }
  
  editShop(viewParam,value,flag){
    var url ='';
    if(flag =='name'){
      url = this.coreService.baseUrl + this.coreService.editShopName + value;
    }else if(flag =='address'){
      url = this.coreService.baseUrl + this.coreService.editShopAddress + value;
    }   
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.patch(url,body,options).map((res:Response) => res.json());
  }

  endShop(viewParam,value){
    var url = this.coreService.baseUrl + this.coreService.endShop + value;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.patch(url,body,options).map((res:Response) => res.json());
  }

  searchShop(viewParam): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.searchShop;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }
  
  //department
  getDept(value): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getDept + value;
    let headers = new Headers();
    let body = {};
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

  getDeptDetail(value): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getDeptDetail + value;
    let headers = new Headers();
    let body = {};
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

  addDept(viewParam,value): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.addDept + value;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  //position
  getPositions(value): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getPosition + value;
    let headers = new Headers();
    let body = {};
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

  editPostionName(viewParam,value){
    var url = this.coreService.baseUrl + this.coreService.editPostionName + value;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.patch(url,body,options).map((res:Response) => res.json());
  }

  createPostion(viewParam,value): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.createPosition + value;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  //administrativeRank
  getAdministrativeRank(): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getAdministrativeRank;
    let headers = new Headers();
    let body = {};
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }
  
  addAdministrativeRank(viewParam): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.addAdministrativeRank;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  editAdministrativeRank(viewParam,value){
    var url = this.coreService.baseUrl + this.coreService.editAdministrativeRank + value;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.patch(url,body,options).map((res:Response) => res.json());
  }

  updateAdministrativeRank(viewParam): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.updateAdministrativeRank;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }
  
  //location
  getLocation(): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getLocation;
    let headers = new Headers();
    let body = {};
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

 getChlidLocation(pid): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getChlidLocation + pid;
    let headers = new Headers();
    let body = {};
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

  //get business, shop , dept,position, emp List 
  getBusinessList(): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getBusinessList;
    let headers = new Headers();
    let body = {};
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

  getEmpList(): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getEmpList;
    let headers = new Headers();
    let body = {};
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

  getStoresList(): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getStoresList;
    let headers = new Headers();
    let body = {};
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

  getDeptList(): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getDeptList;
    let headers = new Headers();
    let body = {};
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

  getPositionsList(): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getPositionsList;
    let headers = new Headers();
    let body = {};
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }
}
