import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CoreService } from '../../providers/baseurl.service';
import { LoginProvider } from '../../providers/login';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private platform: Platform,
    private coreService: CoreService,
    private loginSrv: LoginProvider
  ) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.login();
    });
  }

  login() {
    this.storage.get('access_token').then(token => { //从缓存中获取token
      if (token) {
        this.coreService.token = token;
      }else{
        this.navCtrl.push('LoginPage');
      }
    });
  }

}