import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

import {BusinessServiceProvider} from '../../providers/business-service/business-service'; 
import { EventHandlerProvider } from '../../providers/event-handler/event-handler';

/**
 * Generated class for the AttendanceSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attendance-setting',
  templateUrl: 'attendance-setting.html',
})
export class AttendanceSettingPage {

  treeData:any;
  isShowTree:boolean;
  selectDate:string;
  selectedObj:any;
  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , public modalCtrl:ModalController
              ,private _businessService:BusinessServiceProvider 
              ,public eventHandler : EventHandlerProvider    
            ) {
              this._businessService = _businessService;
              this.eventHandler = eventHandler; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendanceSettingPage');
    this.getPositionsList();
  }

  handleGoback () {
    this.navCtrl.pop();
  }

  getPositionsList():void{
    this._businessService.getPositionsList().subscribe(
      data => {
        if(data){
          this.treeData = data;
        }
      },
      (error) => {
        this.eventHandler.errorHandle(error);
      },
      () =>{
        this.handleData();
      }
    )
}
  
  handleSelect (item) {
    //this.modalCtrl.create('AttendanceSettingDetailPage').present();
    this.navCtrl.push('AttendanceSettingDetailPage',{item:item});
  }

        // 响应节点被选择
        /*handleSelect (item) {
          this.resetR(this.treeData);
          item.isSelected = true ;
          this.handleNodeSelect(item);
        }*/
        
        // 重置勾选状态
  resetR (list) {
    list.forEach( item => {
        item.isSelected = false ;
        if(item.children) this.resetR(item.children);
    })
  }
  
   // 节点被选择的回调 
   handleNodeSelect (item) {

  }
  
  
  handleData():void{ 
   this.isShowTree =true;
   if(this.treeData){
    this.replaceShopsToChildren("shops",this.treeData);
    this.replaceDepartmentsToChildren("departments",this.treeData);
    this.replacePositionsToChildren("positions",this.treeData);
    //this.replaceStaffsToChildren("staff",this.treeData);
   }
  }
  
  replaceShopsToChildren(field:string,data:any):void{
    for(let i=0;i<data.length;i++){
        data[i]['children'] = data[i][field];
        delete data[i][field];
    }
  }
  
  replaceDepartmentsToChildren(field:string,data:any):void{
    for(let l=0;l<data.length;l++){
      for(let i=0;i<data[l]['children'].length;i++){
        data[l]['children'][i]['children'] =data[l]['children'][i][field];
        delete data[l]['children'][i][field];
      }
    }
  }
  
  
  replacePositionsToChildren(field:string,data:any):void{
    for(let p=0;p<data.length;p++){
      for(let l=0;l<data[p]['children'].length;l++){
        for(let i=0;i<data[p]['children'][l]['children'].length;i++){
          data[p]['children'][l]['children'][i]['children'] = data[p]['children'][l]['children'][i][field];
          delete data[p]['children'][l]['children'][i][field];
          break;
        }
      }
    }
  }
  
  replaceStaffsToChildren(field:string,data:any):void{
    for(let s=0;s<data.length;s++){
      for(let p=0;p<data[s]['children'].length;p++){
        for(let l=0;l<data[s]['children'][p]['children'].length;l++){
          for(let i=0;i<data[s]['children'][p]['children'][l]['children'].length;i++){
            data[s]['children'][p]['children'][l]['children'][i]['children'] =data[s]['children'][p]['children'][l]['children'][i][field];
            delete data[s]['children'][p]['children'][l]['children'][i][field];
          }
        }
      }
    }
  }
}
