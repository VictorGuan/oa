import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController,AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import {BusinessServiceProvider} from '../../providers/business-service/business-service'; 
import {Position} from '../../models/position';

@IonicPage()
@Component({
  selector: 'page-post-manager',
  templateUrl: 'post-manager.html',
})
export class PostManagerPage {
  selectedDetp:any;
  positions: Array<Position>=[];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams , 
              public modalCtrl:ModalController
              ,private loadingCtrl : LoadingController
              ,public alertCtrl : AlertController
              ,private _businessService:BusinessServiceProvider
              ,public events : Events
            ) {
              this.selectedDetp = this.navParams.get('item');
              this._businessService = _businessService;
              this.events.subscribe('positionEventHandler',()=>{
                this.getPositions(this.selectedDetp.id);
              });
          }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostManagerPage');
    let selectedDeptId = this.selectedDetp.id;
    this.getPositions(selectedDeptId);
  }

  getPositions(selectedDeptId){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
      });
      loader.present().then(() => {this._businessService.getPositions(selectedDeptId).subscribe(
        data => {
          if(data){
            this.positions = data;
          }
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
  // 返回
  handleGoBack(){
    this.navCtrl.pop();
  }

  // 添加
  handleAdd() {
    this.navCtrl.push('PositionCreatePage',{item:this.selectedDetp});
  }

  // 查看详情
  handleShowDetail(event,item){
    this.navCtrl.push('PositionDetailPage',{item:item});
  }
}
