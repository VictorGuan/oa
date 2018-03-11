import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Events} from 'ionic-angular';

import {BusinessServiceProvider} from '../../providers/business-service/business-service'; 
import { Staff } from '../../models/staff';

/**
 * Generated class for the PositionDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-position-detail',
  templateUrl: 'position-detail.html',
})
export class PositionDetailPage {

  data:Array<any>;
  isDel:boolean;
  seletedPosition:any;
  staffs : Array<Staff>= [];
  staff : Staff ={ };
  constructor (  public navCtrl :NavController 
                ,public alertCtrl:AlertController
                ,public navParams: NavParams 
                ,private _businessService:BusinessServiceProvider
                ,public events: Events
            ){

      this.data = [
          {name:"AAA",img:"../../assets/imgs/venkman.jpg"},
          {name:"BBB",img:"../../assets/imgs/venkman.jpg"},
          {name:"CCC",img:"../../assets/imgs/venkman.jpg"},
          {name:"DDD",img:"../../assets/imgs/venkman.jpg"},
          {name:"EEE",img:"../../assets/imgs/venkman.jpg"}
      ]
      this._businessService = _businessService;
      this.seletedPosition = this.navParams.get('item');
      this.staffs = this.seletedPosition.staff;
       events.subscribe('staffAddEventHandler',(item)=>{
           // item.array.forEach(element => {
                //this.staffs.forEach((staff)=>{
                 //   if(staff.name != item.name){
                      //  this.staffs.push(item);
                    //}
               // });
               if(this.staffs.indexOf(item.name)<0){
                   this.staffs.push(item[0]);
               }
            });
       //});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PositionDetailPage');
  }

  // 返回
  handleGoback  () {
      this.navCtrl.pop();
  }

  // 提交
  handleConfirm () {}

  // 添加
  handleAdd(event){
      this.navCtrl.push('PositionStaffAddPage');
  }

  // 删除
  handleShowDelIcon () {
      this.isDel = !this.isDel ;
  }

  // 移除员工
  handleRemove () {
      console.log("删除");
  }

  // 修改岗位名称
  handleEditPosition(event){
      this.alertCtrl.create({
          title:"修改岗位名称",
          inputs:[{
              name:"name",
              placeholder:"输入岗位名称",
          }],
          buttons:[{
              text:"取消",
              handler: data => {
              }
          },{
              text:"确定",
              handler: data => {
                let id = this.seletedPosition.id;
                this.editPosition(data.name,id);
              }
          }]
      }).present();
  }

  editPosition(name,id){
    this._businessService.editPostionName(name,id).subscribe(
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
        }
      )
  }
  
  // 修改行政等级
  handleEditLevel(){
      this.alertCtrl.create({
          title:"修改行政等级",
          inputs:[{
              name:"level",
              placeholder:"输入行政等级",
              value:"集团副总裁层"
          }],
          buttons:[{
              text:"取消",
              handler: data => {
                  //slidingItem.close();
              }
          },{
              text:"确定",
              handler: data => {
                  //slidingItem.close();
              }
          }]
      }).present();
  }

}
