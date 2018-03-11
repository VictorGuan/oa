import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs, RequestMethod } from '@angular/http';
import { Location } from './../models/location';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CoreService } from './baseurl.service';


@Injectable()
export class LoginProvider {
  url: string;
  constructor(public http: Http, public alertCtrl: AlertController, private coreService: CoreService) {
    this.url = this.coreService.baseUrl.concat("api/authenticate")
  }

  doLogin(email: string, pwd: string) {
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    });

    // let data = new FormData();
    // data.set("email", email);
    // data.set("password", pwd);
    // this.coreService.optionsAddToken(options);
    
    return this.http.post(this.url,{email:email,password:pwd} ).map(res => res.json());
  }


}
