import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BusinessServiceProvider} from '../../providers/business-service/business-service'; 
import { LoadingController,AlertController } from 'ionic-angular';

import { ShopDetail } from '../../request/shop';
import { Dept } from '../../request/dept';

@IonicPage()
@Component({
  selector: 'page-store-detail',
  templateUrl: 'store-detail.html',
})
export class StoreDetailPage {

  type:string;
  selectedStore:any;
  shopDetails:Array<ShopDetail> = [];
  depts : Array<Dept> =[];
  shopDetail: ShopDetail = {};
  name: any;
  countDept : number =0;
  countDeptStaff :number =0;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private _businessService:BusinessServiceProvider
    ,public alertCtrl:AlertController
    ,private loadingCtrl : LoadingController
  ) {
    this._businessService = _businessService;
    this.type = "detail";
    this.selectedStore = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreDetailPage');
    if(this.selectedStore){
      let storeId = this.selectedStore.id;
      this.getSpecifiedShop(storeId);
    }else{
      let storeId = '1';
     this.getSpecifiedShop(storeId);
    }
  }

  getSpecifiedShop(storeId){
      let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
      });
      loader.present().then(() => {this._businessService.getSpecifiedShop(storeId).subscribe(
        data => {
          if(data){
            this.handleData(data);
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
        () =>{
          //this.display = this.shopDetail;
        }
      )}
      ) 
  }

  handleData(data:any):void{
    this.shopDetails = data;
    this.shopDetail = this.shopDetails[0];
    this.depts = data[0].departments;
    this.countDept = this.depts.length;
    this.countDeptStaff;
    this.depts.forEach((item)=>{
      if(item.staffCount){
        this.countDeptStaff = this.countDeptStaff + item.staffCount;
      }
    });
  }

  // 返回
  handleGoBack(event) {
    this.navCtrl.pop();
  }

  // 查看部门
  handleCheckDept(event){
    this.navCtrl.push('DeptManagerPage',{item:this.selectedStore});
  }

}
