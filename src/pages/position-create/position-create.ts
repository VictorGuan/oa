import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import {BusinessServiceProvider} from '../../providers/business-service/business-service'; 

/**
 * Generated class for the PositionCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-position-create',
  templateUrl: 'position-create.html',
})
export class PositionCreatePage {

  postionName: string ='';
  levels:Array<number> =[1,2,3,4,5];
  selectedLevel:number;
  selectedDetp : any;

  constructor(public navCtrl: NavController, public navParams: NavParams
              ,private _businessService:BusinessServiceProvider
              ,public alertCtrl : AlertController
              ,public events : Events
          ) {
            this._businessService = _businessService;
            this.selectedDetp = this.navParams.get('item');

  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad PositionCreatePage');
  }

  dismiss(){
    this.navCtrl.pop();
  }

  handleAddPostion(event){
    if(this.selectedLevel && this.postionName){
      let viewParam={
        "name" :this.postionName,
        "exeLevel" : this.selectedLevel
      }
      let id = this.selectedDetp.id;
      this._businessService.createPostion(viewParam,id).subscribe(
        data => {
          let successAlert =this.alertCtrl.create({
            subTitle: name + data.message
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
          this.navCtrl.pop();
          this.events.publish('positionEventHandler');
        }
      )
    }else{
      let missValueAlert = this.alertCtrl.create({
          title : '请输入岗位名或行政等级'
      });
        missValueAlert.present();
        setTimeout(()=>{
          missValueAlert.dismiss();
        },1000);
    }
  }

}
