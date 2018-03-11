import { Injectable } from '@angular/core';
import {AlertController} from 'ionic-angular';
/*
  Generated class for the EventHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventHandlerProvider {

  constructor(
              public alertCtrl : AlertController
  ) {
    console.log('Hello EventHandlerProvider Provider');
  }

  errorHandle(error:any):void{
    let errorAlert =this.alertCtrl.create({
        title:'Error with'+ error.status
      });
    errorAlert.present();
    setTimeout(() => {
      errorAlert.dismiss();
    }, 1000);
}

  successHandle(data:any):void{
    let successAlert =this.alertCtrl.create({
      subTitle: data.message
    });
    successAlert.present();
    setTimeout(() => {
    successAlert.dismiss();
   }, 3000);
  }
}
