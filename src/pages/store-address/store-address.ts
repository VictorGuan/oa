import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ModalController} from 'ionic-angular';
import { Events } from 'ionic-angular';

import {BusinessServiceProvider} from '../../providers/business-service/business-service'; 
import { Location } from './../../models/location';
import { areIterablesEqual } from '@angular/core/src/change_detection/change_detection_util';
/**
 * Generated class for the StoreAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store-address',
  templateUrl: 'store-address.html',
})
export class StoreAddressPage {

  data:Array<any>;
  citys:Array<any>;
  areas:Array<any>;
  streets:Array<any>;
  shopName : string ='';
  domain : string='';
  postShopParam: any ;
  address_pid : string ='';
  address : string ='';
  selectedBusiness : any;

  allProvinces: Array<Location> = [];
  allCitys: Array<Location> = [];
  allAreas: Array<Location> = [];
  allStreets: Array<Location> = [];

  slectedItem : any ={
    province:0,
    city:0,
    area:0,
    street:0
  }

  constructor (public viewCtrl:ViewController
      ,public navParams: NavParams
      ,private _businessService:BusinessServiceProvider
      ,private loadingCtrl : LoadingController
      ,public alertCtrl:AlertController
      ,public navCtrl: NavController
      ,public modalCtrl: ModalController
      ,public events: Events
  ) {
      this.selectedBusiness = navParams.get('item');
      this._businessService = _businessService;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreAddressPage');
    this.getLocation();
    //this.getChlidLocation(2);
    //this.getChlidLocation(1);
    //this.getChlidLocation(3);
    //this.getChlidLocation(4);
  }

  getLocation(){
    this._businessService.getLocation().subscribe(
      data => {
        if(data){
          this.allProvinces = data;
        }
      },
      (error) => {
      },
      () =>{
      }
    )
  }

  getChlidLocation(pid:number,type:number){
    this._businessService.getChlidLocation(pid).subscribe(
      data => {
        if(data){
          this.handleChildLocationData(type,data);
        }
      },
      (error) => {
      },
      () =>{
      }
    )
  }
  
  findPid(array:Array<any>,event:any):number{
    let pid=0;
    array.forEach((item)=>{
      if(item.name = event){
        return pid=item.id;
      }
    });
    return pid;
  }

  handleSelect(type:number,event:any):void {
    //let pid = item.id;
    //test
    let pid;
    switch(type){
      case 0 :
        pid = this.findPid(this.allProvinces,event);
        this.allCitys =[];
        this.allAreas =[];
        this.allStreets=[];
        this.getChlidLocation(pid,type);
        break;
      case 1 :
        this.allAreas = [];
        this.allStreets=[];
        this.getChlidLocation(pid,type);
        break;
      case 2 :
        this.allStreets = [];
        this.getChlidLocation(pid,type);
        break;
      case 3 :
        this.getChlidLocation(pid,type);
        break;
      default:
        break;    
    }

  }
  
  handleChildLocationData(type:number,data:any):void {
    switch (type){
      case 0:
        this.allCitys = data;
        break;
      case 1:
        this.allAreas = data;
        break;
      case 2:
        this.allStreets = data;
        break;
      case 3:
        break;
      default:
        break;
    }
  }

  showLocationPage(event){
    let profileModal = this.modalCtrl.create('LocationPage');
   profileModal.present();
  }

  dismiss(){
      this.viewCtrl.dismiss();
  }

  handleCreate(event){
    //if(this.slectedItem.street){
      let viewParam = {
          "name" : this.shopName,
          "address_pid" : "23",
          "domain" : this.domain,
          "address" : this.address
      }
      let businessId = this.selectedBusiness.id;
      this.postSpecifiedShop(viewParam,businessId);
      this.events.publish('storeEventHandler',this.shopName);
    //}
  }

postSpecifiedShop(param,value){
  //param ={"name": "测试","pid": "2","type": "2"}
    this._businessService.postSpecifiedShop(param,value).subscribe(
      data => {
        let successhandler =this.alertCtrl.create({
            title:this.shopName+'添加成功'
          });
        successhandler.present();
        setTimeout(() => {
          successhandler.dismiss();
        }, 1000);
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
          //this.dismiss();
          this.navCtrl.pop();
      }
    )
}

}
