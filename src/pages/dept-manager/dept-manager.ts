import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , 
  ItemSliding  , AlertController , ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import {BusinessServiceProvider} from '../../providers/business-service/business-service'; 
import {Dept} from '../../request/dept';

@IonicPage()
@Component({
  selector: 'page-dept-manager',
  templateUrl: 'dept-manager.html',
})
export class DeptManagerPage {

  selectedShop:any;
  depts:Array<Dept> =[];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams , 
              public alertCtrl : AlertController,
              public modalCtrl : ModalController
              ,private loadingCtrl : LoadingController
              ,private _businessService:BusinessServiceProvider
              ,public events : Events
                ) {
             this._businessService = _businessService;
             this.selectedShop = this.navParams.get('item');
             this.events.subscribe('deptEventHandler',()=>{
               this.getDept(this.selectedShop.id);
             })
        }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeptManagerPage');
    this.getDept(this.selectedShop.id);
  }

  
  ngOnInit(){
    console.log('start get data');
    //this.getDept(this.selectedShop.id);
  }

  getDept(id):void{
      let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
      });
      loader.present().then(() => {this._businessService.getDept(id).subscribe(
        data => {
          this.depts = data;   
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

  // 添加
  handleAdd(){
    this.navCtrl.push('DeptCreatePage',{depts:this.depts,selectedShop:this.selectedShop});
  }

  // 修改
  handleEdit(itemSlide:ItemSliding , e){
    
    e.preventDefault();
    e.stopPropagation();

    this.alertCtrl.create({
      title:"修改部门",
      inputs:[{
        name:"deptName",
        placeholder:"输入部门名称",
        value:"XXX"
      }],
      buttons:[{
        text:"取消",
        handler: data => {
          itemSlide.close();
        }
      },{
        text:"确定",
        handler:data => {

        }
      }]
    }).present();
  }

  // 删除
  handleDel (itemSlide:ItemSliding ,e) {
    itemSlide.close();
  }

  // 查看部门详情
  handleShowDeptDetail(item) {
    //this.modalCtrl.create(DeptDetailModalPage).present();
    this.navCtrl.push('DeptDetailPage',{item:item});
  }



handleGoBack():void{
  this.navCtrl.pop();
}

}