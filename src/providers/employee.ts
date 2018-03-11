import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs, RequestMethod } from '@angular/http';
import { Location } from './../models/location';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CoreService } from './baseurl.service';

@Injectable()
export class EmployeeProvider {
  url: string;
  constructor(public http: Http, public alertCtrl: AlertController, private coreService: CoreService) {
    this.url = this.coreService.baseUrl.concat("api/hr/")
  }

  query(id?: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    this.coreService.optionsAddToken(options);
    if (id) {
      let endpoint = this.url.concat('getChildLocation/', id.toString());
      return this.http.get(endpoint, options).map((res) => res.json());
    }
    return this.http.get(this.url.concat('index'), options).map((res) => res.json());
  }

  getSuffix(id: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    this.coreService.optionsAddToken(options);
    let endpoint = this.url.concat('staff/suffix/', id.toString());
    return this.http.get(endpoint, options).map((res) => res.json());
  }

  checkEmail(email: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    this.coreService.optionsAddToken(options);

    return this.http.post(this.url.concat('check/email'), { email: email }, options).map((res) => { return res.json().message; });
  }



  save(item: any) {
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json;charset=utf-8'
      })
    });
    this.coreService.optionsAddToken(options);

    return this.http.post(this.url.concat('staff/add'), item, options).map(res => {
      return res.json().message == "添加成功";
    });
  }


  dimission(id: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    this.coreService.optionsAddToken(options);
    let endpoint = this.url.concat('dimission/', id.toString());
    return this.http.post(endpoint, {}, options).map(res => {
      return res.json().message == "添加成功";
    });
  }


  getBusiness() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    this.coreService.optionsAddToken(options);
    let url = this.coreService.baseUrl.concat("api/organization/business/index");

    return this.http.get(url, options).map((res) => res.json());
  }

  getShops(id: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    this.coreService.optionsAddToken(options);
    let url = this.coreService.baseUrl.concat("api/organization/shop/index/", id.toString());

    return this.http.get(url, options).map((res) => res.json());
  }

  getDepartments(id: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    this.coreService.optionsAddToken(options);
    let url = this.coreService.baseUrl.concat("api/organization/department/index/", id.toString());

    return this.http.get(url, options).map((res) => res.json());
  }

  getPositions(id:number){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    this.coreService.optionsAddToken(options);
    let url = this.coreService.baseUrl.concat("api/organization/position/index/", id.toString());

    return this.http.get(url, options).map((res) => res.json());
  }

}
