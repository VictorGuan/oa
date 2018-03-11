import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ItemSliding  , AlertController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import {BusinessServiceProvider} from '../../providers/business-service/business-service'; 
import {Admin} from '../../models/admin';

@IonicPage()
@Component({
  selector: 'page-administrative-manager',
  templateUrl: 'administrative-manager.html',
})
export class AdministrativeManagerPage {
  administrativeRank :any;
  data:Array<any>;
  admins : Array<Admin> =[];
  constructor(public navCtrl: NavController
              ,public navParams: NavParams  
              ,public alertCtrl:AlertController
              ,private loadingCtrl : LoadingController
              ,private _businessService:BusinessServiceProvider
        ) {
          this._businessService = _businessService;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdministrativeManagerPage');
    this.getAdministrativeRank();
  }

  getAdministrativeRank(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
      });
      loader.present().then(() => {this._businessService.getAdministrativeRank().subscribe(
        data => {          
          this.admins =data;
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

  addAdministrativeRank(viewParam){
    this._businessService.addAdministrativeRank(viewParam).subscribe(
      data => {
        let successAlert =this.alertCtrl.create({
          subTitle: viewParam.name + data.message
        });
        successAlert.present();
        setTimeout(() => {
        successAlert.dismiss();
      }, 3500);
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
        this.getAdministrativeRank();
      }
    )
  }

  editAdministrativeRank(viewParam,id){
    this._businessService.editAdministrativeRank(viewParam,id).subscribe(
      data => {
        let successAlert =this.alertCtrl.create({
          subTitle: viewParam.name + data.message
        });
        successAlert.present();
        setTimeout(() => {
        successAlert.dismiss();
      }, 3500);
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
        this.getAdministrativeRank();
      }
    )
  }

  updateAdministrativeRank(viewParam){
    this._businessService.updateAdministrativeRank(viewParam).subscribe(
      data => {
        let successAlert =this.alertCtrl.create({
          subTitle: name + data.message
        });
        successAlert.present();
        setTimeout(() => {
        successAlert.dismiss();
      }, 3500);
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
      }
    )
  }
  
  // 返回
  handleGoBack(){
    this.navCtrl.pop();
  }

  // 添加
  handleAdd () {
    this.alertCtrl.create({
      title:"添加行政等级",
      inputs:[{
        name:"name",
        placeholder:"输入行政名称"
      },{
        name:"level",
        placeholder:"输入行政等级"
      }],
      buttons:[{
        text:"取消",
        handler:data => {

        }
      },{
        text:"确定",
        handler:data => {
          this.addAdministrativeRank(data);
        }
      }]
    }).present();
  }

  // 编辑
  handleEdit(item){
    let id = item.id;
    this.alertCtrl.create({
      title:"修改行政等级",
      inputs:[{
        name:"name",
        placeholder:"输入行政名称"
      }],
      buttons:[{
        text:"取消",
        handler:data => {
        }
      },{
        text:"确定",
        handler:data => {
          this.editAdministrativeRank(data,id);
        }
      }]
    }).present();
  }

  // 删除
  handleDel(item){
  }

  orderBy(event){
    console.log('pending orderby api');
  }
}
