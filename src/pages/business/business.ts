import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import {BusinessServiceProvider} from '../../providers/business-service/business-service'; 
import { Http, Response } from '@angular/http';

import { Business } from '../../models/business';

/**
 * Generated class for the BusinessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business',
  templateUrl: 'business.html',
})
export class BusinessPage {
  businesses : Array<Business>[] =[]; 

  constructor(public navCtrl: NavController, public navParams: NavParams
  ,private _businessService:BusinessServiceProvider
  ,private alertCtrl: AlertController
  ,private loadingCtrl : LoadingController
  ,private viewController: ViewController
  ) {
    this._businessService = _businessService;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessPage');
    this.getBusiness();
  }

  itemTapped(event,item) {
    this.navCtrl.push('StoreManagerPage',{item:item});
  }

  //ngOnInit(){
  //  console.log('start get data');
  //  this.getBusiness();
  //}

   getBusiness(){
      let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
      });
      loader.present().then(() => {this._businessService.getBusiness().subscribe(
        data => {          
          this.businesses =data;
          loader.dismiss();
        },
        (error) => {
          let errorAlert =this.alertCtrl.create({
              title:'Error with'+ error.status
            });
          errorAlert.present();
          setTimeout(() => {
            errorAlert.dismiss();
          }, 1000);
        },
        () =>{}
      )}
      )    
  }

  postSpecifiedBusiness(param){
    //param ={"name": "测试","pid": "2","type": "2"}
      this._businessService.postSpecifiedBusiness(param).subscribe(
        data => {
          let successAlert =this.alertCtrl.create({
            subTitle: param.name + data.message
          });
          successAlert.present();
        setTimeout(() => {
          successAlert.dismiss();
        }, 3000);
        },
        (error) => {
          let errorAlert =this.alertCtrl.create({
              title:'Error with'+ error.status
            });
          errorAlert.present();
          setTimeout(() => {
            errorAlert.dismiss();
          }, 1000);
        },
        () =>{
          this.getBusiness();
        }
      )
  }

  patchSpecifiedBusiness(param,value){
      this._businessService.patchSpecifiedBusiness(param,value).subscribe(
        data =>{
          let successAlert =this.alertCtrl.create({
            subTitle: param.name + data.message
          });
          successAlert.present();
        setTimeout(() => {
          successAlert.dismiss();
        }, 3000);
        },
        (error) =>{
          let errorAlert =this.alertCtrl.create({
              title:'Error with'+ error.status
            });
          errorAlert.present();
          setTimeout(() => {
            errorAlert.dismiss();
          }, 1000);
        },
        () =>{
          this.navCtrl.push('BusinessPage');
          this.getBusiness();
        }
      )
  }

  handleGoBack(){
     this.navCtrl.pop();
  }

 addPresentPrompt() {
  let alert = this.alertCtrl.create({
    title: '请输入行业名称：',
    inputs: [
      {
        name: 'name',
        placeholder: '行业'
      },
    ],
    buttons: [
      {
        text: '取消',
        role: 'cancel',
        handler: data => {
          this.dismiss();
        }
      },
      {
        text: '添加',
        handler: data => {
          this.postSpecifiedBusiness(data);
          console.log('添加成功');
        }
      }
    ]
  });
  alert.present();
 }

  deletePresentAlert(item) {
    let alert = this.alertCtrl.create({
      title: '删除'+item.name+'行业',
      buttons: [
        {
          text:"取消",
          handler:data => {
            //this.dismiss();
          }
        },
        {
          text:'确认',
          handler : () =>{
            this.postSpecifiedBusiness(item);
          }
        }
      ]
    });
    alert.present();
}

  editPresentAlert(item) {
    let alert = this.alertCtrl.create({
      title: '修改'+item.name+'行业：',
      inputs: [
      {
        name: 'business',
        placeholder: '行业'
      },
    ],
      buttons: [
        {
          text:"取消",
          handler:data => {
            //this.dismiss();
          }
        },
        {
          text:'确认',
          handler : () =>{
            let value = item.id;
            this.patchSpecifiedBusiness(item, value);
          }
        }
      ]
    });
    alert.present();
}

dismiss(){
  this.viewController.dismiss();
}

}
