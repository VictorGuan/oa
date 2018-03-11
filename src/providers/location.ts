import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs, RequestMethod } from '@angular/http';
import { Location } from './../models/location';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CoreService } from './baseurl.service';


@Injectable()
export class LocationProvider {
  url: string;
  constructor(public http: Http, public alertCtrl: AlertController, private coreService: CoreService) {
    this.url = this.coreService.baseUrl.concat("api/location/")
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

  add(item: any) {
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json;charset=utf-8'
      })
    });
    this.coreService.optionsAddToken(options);

    return this.http.post(this.url.concat('create'), item, options).map(res => {
      return res.json().message == "添加成功";
    });
  }

  save(item: Location) {

    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json;charset=utf-8'
      })
    });
    this.coreService.optionsAddToken(options);

    return this.http.patch(this.url.concat('patch/', item.id.toString()), { "name": item.name }, options).map(res => {
      return res.json().message == "修改成功";
    });
  }

  delete(item: Location) {
    return this.http.patch(this.url.concat('patch/', item.id.toString()), { "name": item.name }).map(res => {

      return (<any>res).message == "修改成功";
    });
  }

}
