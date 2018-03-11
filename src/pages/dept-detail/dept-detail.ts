import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,AlertController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import {BusinessServiceProvider} from '../../providers/business-service/business-service'; 
import {DeptDetail} from '../../request/dept';
import {Position} from '../../models/position';


/**
 * Generated class for the DeptDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dept-detail',
  templateUrl: 'dept-detail.html',
})
export class DeptDetailPage {
  selectedDept:any;
  deptDetails : Array<DeptDetail> =[];
  deptDetail : DeptDetail = {};
  postions : Array<Position> =[];
  constructor (public navCtrl: NavController,
                public viewCtrl:ViewController
               ,public alertCtrl : AlertController
               ,public navParams: NavParams
               ,private _businessService:BusinessServiceProvider
               ,private loadingCtrl : LoadingController
  )     
  {
       this._businessService = _businessService;
       this.selectedDept = this.navParams.get('item');
  }

ionViewDidLoad() {
  console.log('ionViewDidLoad DeptDetailModalPage');
  let selectedDeptId = this.selectedDept.id;
  this.getDeptDetail(selectedDeptId);
}

getDeptDetail(id):void{
    let loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 3000
    });
    loader.present().then(() => {this._businessService.getDeptDetail(id).subscribe(
      data => {
        if(data){
          this.deptDetails = data;
          this.deptDetail = data[0];
          this.postions = data[0].positions;
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
  // 过滤员工
  handleFilterStaff (typeCode) {
      console.log(typeCode);
  }

  dismiss(){
      this.viewCtrl.dismiss();
  }

  checkPosition(event){
      this.navCtrl.push('PostManagerPage',{item : this.selectedDept});
  }
}
