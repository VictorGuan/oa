import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { CoreService } from '../baseurl.service';
/*
  Generated class for the PunishmentRewardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PunishmentRewardProvider {

  constructor(public http: Http,private coreService:CoreService) {
    console.log('Hello PunishmentRewardProvider Provider');
  }

  addPunishmentReward(viewParam): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.addPunishmentReward;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  editPunishmentReward(viewParam): Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.editPunishmentReward;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.patch(url,body,options).map((res:Response) => res.json());
  }

  searchPunishmentReward(viewParam):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.searchPunishmentReward;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  searchActivePunishmentReward(viewParam):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.searchActivePunishmentReward;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  patchActivePunishmentReward(viewParam):Observable<any>{
    var url = this.coreService.baseUrl + this.coreService.patchActivePunishmentReward;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.patch(url,body,options).map((res:Response) => res.json());
  }

  searchSpecifiedActivePunishment(viewParam):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.searchSpecifiedActivePunishment;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  addSpecifiedPunishment(viewParam):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.addSpecifiedPunishment;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  getShopPunishment(id):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getShopPunishment +id ;
    let body = {};
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.get(url,options).map((res:Response) => res.json());
  }

  getStaffActivePunishment(viewParam):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getStaffActivePunishment;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  addShopPunishement(viewParam):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.addShopPunishement;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  getMyPunishmentReward(viewParam):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getMyPunishmentReward;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }
  
  getMyDeliver(viewParam):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.getMyDeliver;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }
  
  deliverDeptPunishment(viewParam,id):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.deliverDeptPunishment + id;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }

  deliverShopPunishement(viewParam,id):Observable<any> {
    var url = this.coreService.baseUrl + this.coreService.deliverShopPunishement + id;
    let body = JSON.stringify(viewParam);
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=utf-8');
    let options = new RequestOptions({headers:headers});
    this.coreService.optionsAddToken(options);
    return this.http.post(url,body,options).map((res:Response) => res.json());
  }
}
