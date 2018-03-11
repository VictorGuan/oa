import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import { PunishmentRewardProvider } from '../../providers/punishment-reward/punishment-reward';
import {BusinessServiceProvider} from '../../providers/business-service/business-service'; 
import { Punishment } from '../../models/punishment';

/**
 * Generated class for the PunishmentRewardOpenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-punishment-reward-open',
  templateUrl: 'punishment-reward-open.html',
})
export class PunishmentRewardOpenPage {

  type:string;
  amountCount:number;
  comment:string;
  name:string;
  //punishments : Array<Punishment>[] =[];
  punishments : any =[];
  staff : number;
  isShowTree : boolean;
  treeData : Array<any>[];
  selectedObj:any;
  selectedObjName:string=''; 

  constructor (public navCtrl:NavController
               ,public alertCtrl:AlertController
               ,public _punishmentRewardService:PunishmentRewardProvider
               ,private _businessService:BusinessServiceProvider   
    
    ) {
        this._punishmentRewardService =_punishmentRewardService;  
        this._businessService = _businessService;   
        this.type ="1";
        this.staff =26;
        this.isShowTree =false;
  }

  handleGoback () {
      this.navCtrl.pop();
  }

  handleConfirm () {
    //test  
    /*let param ={
        "fine_type": 1,
        "target_id": 1,
        "target_type": 0,
        "amount": 100,
        "type": 0,
        "comment": "在检查的时候发现卫生不合格"
      }*/
      //fine_type is on emp tree, not yet implement. 
      let param ={
        "fine_type": 1,
        "target_id": this.punishments[0].target_id,
        "target_type": this.punishments[0].target_type,
        "amount": this.amountCount,
        "type": this.type,
        "comment": this.comment
      }
      this.addSpecifiedPunishment(param);
  }


  // 搜索
  search(event:any):void{
    //test
    /*let param ={
        "staff" : 26,
        "type": 0
    };*/

    let param ={
      "staff" : this.staff,
      "type": Number(this.type)
  };
    this.searchSpecifiedActivePunishment(param);
  }

  searchByName(name:string):void{
    if(this.name){
      this.punishments =this.punishments.filter(item =>{
          return item.name == name ;
      })
      this.handleData();
    }else{

    }
  }

  changeType(type:number):void{
    switch(type){
      case 1:
        this.type ="1";
      break;
      case 0:
        this.type="0";
      break;
      default:
      break;
    }
  }

  searchSpecifiedActivePunishment(viewParam:any):void{
    this._punishmentRewardService.searchSpecifiedActivePunishment(viewParam).subscribe(
        data => {
          if(data){
            this.punishments = data
          }       
          },
        (error) => {
        },
        () =>{
          this.handleData();
        })
  }

  addSpecifiedPunishment(viewParam:any):void{
    this._punishmentRewardService.addSpecifiedPunishment(viewParam).subscribe(
        data => {   
          let successAlert =this.alertCtrl.create({
            subTitle:data.message
          });
          successAlert.present();
        setTimeout(() => {
          successAlert.dismiss();
         }, 2000); 
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
        })
  }

 
  handleData():void{
    if(this.punishments){
      this.count(this.punishments);
      this.comment = this.punishments[0].desc;
    }
  }

  count(data:any):void{
    this.amountCount =0;
    if(data.length >1){
      data.forEach(element => {
        this.amountCount = this.amountCount + Number(element.amount);
      });
    }else{
      this.amountCount =data[0]["amount"];
    }
  }
  // 抄送
  handleSendTo () {}

  getPositionsList():void{
    this._businessService.getPositionsList().subscribe(
      data => {
        if(data){
          this.treeData = data;
        }
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
        this.handleTreeData();
      }
    )
}

getEmpList(){
  this._businessService.getEmpList().subscribe(
    data => {
      if(data){
        this.treeData = data;
      }

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
      this.handleTreeData();
    }
  )
}

  // 响应节点被选择
  handleSelect (item) {
    this.resetR(this.treeData);
    item.isSelected = true ;
    this.handleNodeSelect(item);
  }
  
  // 重置勾选状态
  resetR (list) {
    list.forEach( item => {
        item.isSelected = false ;
        if(item.children) this.resetR(item.children);
    })
  }

   // 节点被选择的回调 
   handleNodeSelect (item) {
    this.isShowTree =false;
    this.selectedObj =item;
    this.selectedObjName = item.name;
  }

  showTree():void{
    this.isShowTree = !this.isShowTree;
    if(this.isShowTree){
      this.getEmpList();
    }
  }

  handleTreeData():void{  
   if(this.treeData){
    this.replaceShopsToChildren("shops",this.treeData);
    this.replaceDepartmentsToChildren("departments",this.treeData);
    this.replacePositionsToChildren("positions",this.treeData);
    this.replaceStaffsToChildren("staff",this.treeData);
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
          data[p]['children'][l]['children'][i]['children'] =data[p]['children'][l]['children'][i][field];
          delete data[p]['children'][l]['children'][i][field];
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
