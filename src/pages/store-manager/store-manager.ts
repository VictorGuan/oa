import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController ,NavParams , ItemSliding , MenuController ,
  ModalController,ViewController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import {BusinessServiceProvider} from '../../providers/business-service/business-service'; 
import {Shop} from '../../request/shop';
import {SearchMap} from '../../request/searchMap';

@IonicPage()
@Component({
  selector: 'page-store-manager',
  templateUrl: 'store-manager.html',
})
export class StoreManagerPage {

  data:Array<any>;
  area:string;   // 区域
  selectedBusiness :any;
  shops:Array<Shop> =[];
  searchMap : SearchMap = {};
  searchFilterMap : any = {
    startDate:'',
    endDate:'',
    allTime:false,
    isBusiness:false, 
    isPrepare:false, 
    isStop:false, 
    isClosed:false, 
    isAll:false, 
    area:'', 
    name:''
  }
    byTime :any=[];
    byStatus :any=[];
    byArea :any=[];
    byName :any=[];


  constructor(public navCtrl: NavController, 
    public alertCtrl:AlertController, 
    public navParams: NavParams,
    public menu:MenuController,
    public modalCtrl:ModalController
    ,private _businessService:BusinessServiceProvider
    ,private loadingCtrl : LoadingController
    ,private viewController: ViewController
    ,public events : Events
    ) {
        this._businessService = _businessService;
        this.selectedBusiness = navParams.get('item');
        this.events.subscribe('storeEventHandler',(shopName)=>{
          this.getStores(this.selectedBusiness.id);
        })
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreManagerPage');
    if(this.selectedBusiness){
      let businessId = this.selectedBusiness.id;
      this.getStores(businessId);
    }else{
     let businessId = '1';
     this.getStores(businessId);
    }
  }

  dismiss(){
        this.viewController.dismiss();
    }

  // 返回
  handleGoBack () {
    this.navCtrl.pop();
  }
  // 显示过滤弹框
  handleShowFilterMenu () {
    this.menu.toggle();
  }

  // 修改
  handleEdit(item){
    this.alertCtrl.create({
      title:"修改门店信息",
      inputs:[{
        name:"storeName",
        placeholder:"输入门店名称",
      },{
        name:"storeAdress",
        placeholder:"输入门店地址",
      }],
      buttons:[{
        text:"取消",
        handler:data => {
          //this.dismiss();
        }
      },{
        text:"确定",
        handler:data => {
          let nameParam ={"value":data.storeName};
          let addressParam = {"value":data.storeAdress};
          this.editShopName(nameParam,item.id);
          this.editShopAddress(addressParam,item.id);
        }
      }]
    }).present();
  }

  // 关闭门店
  handleClose(item){
      let id = item.id;
      let viewParam = {"value":"3"}
      this._businessService.endShop(viewParam,id).subscribe(
        data =>{
              let successhandler =this.alertCtrl.create({
              title:item.name+'关闭'
            });
          successhandler.present();
          setTimeout(() => {
            successhandler.dismiss();
          }, 1000);
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
        }
      )
      //this.shops = this.shops.filter =>({})
  }

  // 暂停营业
  handleStop(item){
      let id = item.id;
      let viewParam = {"value":"1"}
      this._businessService.endShop(viewParam,id).subscribe(
        data =>{
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
          this.getStores(this.selectedBusiness.id);
        }
      )
  }

  getStores(businessId):void{
      let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
      });
      loader.present().then(() => {this._businessService.getShops(businessId).subscribe(
        data => {          
          this.shops =data;
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

  editShopName(viewParam,id):void{
      let flag ='name'
      this._businessService.editShop(viewParam,id,flag).subscribe(
        data =>{
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
          this.getStores(this.selectedBusiness.id);
        }
      )
  }

  editShopAddress(viewParam,id):void{
      let flag ='address'
      this._businessService.editShop(viewParam,id,flag).subscribe(
        data =>{
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
          this.getStores(this.selectedBusiness.id);
        }
      )
  }

  addShop(event):void {
    this.navCtrl.push('StoreAddressPage'
    ,{item :this.selectedBusiness});
  }

  itemTapped(event,item) {
    this.navCtrl.push('StoreDetailPage', {
      item: item
    });
  }

  selectAllTime(){
    this.searchFilterMap.allTime = !this.searchFilterMap.allTime;
    this.searchFilterMap.startDate = '';
    this.searchFilterMap.endDate = '';
  }

  selectAllStatus(){
    this.searchFilterMap.isAll = !this.searchFilterMap.isAll;
    this.searchFilterMap.isBusiness = this.searchFilterMap.isAll;
    this.searchFilterMap.isClosed = this.searchFilterMap.isAll;
    this.searchFilterMap.isPrepare = this.searchFilterMap.isAll;
    this.searchFilterMap.isStop = this.searchFilterMap.isAll;
  }

  reset(){
    this.searchFilterMap.startDate = '';
    this.searchFilterMap.endDate = '';
    this.searchFilterMap.allTime = false;
    this.searchFilterMap.isBusiness = false; 
    this.searchFilterMap.isPrepare = false;
    this.searchFilterMap.isStop = false; 
    this.searchFilterMap.isClosed = false; 
    this.searchFilterMap.isAll = false;
    this.searchFilterMap.area = false;
    this.searchFilterMap.name = '';
  }

  onSearch():void{
    this.clearViewParam();
    this.switchStatus();
    if(this.searchFilterMap.isAll){
      this.byStatus = -1;
    }
    if(this.searchFilterMap.area == ''){
      this.byArea = -1;
    }
    if(this.searchFilterMap.allTime){
      this.byTime = '';
    }else{
      this.byTime.push(this.searchFilterMap.startDate);
      this.byTime.push(this.searchFilterMap.endDate);
    }
    this.byName = this.searchFilterMap.name;
    let viewParm = {
      "byTime" : this.byTime,
      "byStatus":this.byStatus,
      "byArea" : this.byArea,
      "byName" : this.byName
    };
    let testParm = {
      "byTime" :'',
      "byStatus" :'-1',
      "byArea" : '5',
      "byName" : ''
    };
    this.search(viewParm);
  }
  
  switchStatus():void{
    if(this.searchFilterMap.isBusiness){
      this.byStatus.push(1);
    }
    if(this.searchFilterMap.isPrepare){
      this.byStatus.push(0);
    }
    if(this.searchFilterMap.isStop){
      this.byStatus.push(2);
    }
    if(this.searchFilterMap.isClosed){
      this.byStatus.push(4);
    }
  }

  clearViewParam():void{
    this.byTime =[];
    this.byStatus =[];
    this.byArea =[];
    this.byName =[];
  }

  search(viewParam){
    this._businessService.searchShop(viewParam).subscribe(
      data =>{
        this.shops = data;
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
        this.menu.close();
      }
    )
  }

}
