import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { PunishmentRewardProvider } from '../../providers/punishment-reward/punishment-reward';
import {BusinessServiceProvider} from '../../providers/business-service/business-service'; 
import { Business } from '../../models/business';
import {Shop} from '../../request/shop';
import {Dept} from '../../request/dept';
import {Position} from '../../models/position';
import { Punishment } from '../../models/punishment';

/**
 * Generated class for the PunishmentRewardCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-punishment-reward-create',
  templateUrl: 'punishment-reward-create.html',
})
export class PunishmentRewardCreatePage {

  type:string ='';
  targetType:string ='';
  name:string ='';
  desc:string ='';
  amount:number; 
  active:boolean = false;
  status:boolean = true;
  isShowTree : boolean =false;
  selectedObj : any;   
  selectedObjName : string ='';
  businesses : Array<Business>[] =[]; 
  shops:Array<Shop> =[];
  depts:Array<Dept> =[];
  positions: Array<Position>=[];
  punishments : Array<Punishment>[] =[];
  treeData : Array<any>[];
  treeChild : any ={0:"business",1:"shops",2:"departments",3:"positions"};

  //@ViewChild(CommomTreePage) commomTreePage : CommomTreePage;
    
  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public alertCtrl : AlertController
              ,public events: Events
              ,public _punishmentRewardService:PunishmentRewardProvider
              ,private _businessService:BusinessServiceProvider           
            ){
              this._businessService = _businessService;  
              this._punishmentRewardService =_punishmentRewardService;
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad PunishmentRewardCreatePage');
    //this.getBusinessList();
    //this.getDeptList();
    //this.getEmpList();
    this.getPositionsList();
    //this.getStoresList();
  }

  handleGoback():void{
    this.navCtrl.pop();
  }

  handleConfirm(event:any){
    //this.mapping('type',this.type);
    //this.mapping('targetType',this.targetType);
    //this.mapping('status',this.status);
    let viewParam ={
      name: this.name,
      desc: this.desc,
      target_id: this.selectedObj.id,
      target_type:2,
      amount: this.amount,
      type: this.type,
      status: this.status,
      active: this.active
    };
  this._punishmentRewardService.addPunishmentReward(viewParam).subscribe(
      data => {
        let successAlert =this.alertCtrl.create({
          subTitle: viewParam.name + data.message
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
        this.events.publish('punishmentRewardAddEventHandler');
      }
    )
  }

  getBusinessList(){
    this._businessService.getBusinessList().subscribe(
      data => {          
        this.businesses =data;
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
    )
}  

  getStoresList():void{
    this._businessService.getStoresList().subscribe(
        data => {          
          this.shops =data;
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
      )
  }

    getDeptList():void{
      this._businessService.getDeptList().subscribe(
        data => {
          this.depts = data;   
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
      )
  }

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
          this.handleData();
        }
      )
  }

  getEmpList(){
    this._businessService.getEmpList().subscribe(
      data => {
        if(data){
          this.positions = data;
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
      () =>{}
    )
}
  
  mapping(type:string,value:any):void{   
    switch(type){
      case 'type' :
      switch(value){
        case  "奖励" :
          this.status
        case  "罚单":
        default:
        break;
        }
      break;
      case 'targetType' :
      break;
      case 'status' :
      break;
      default:
      break;
    }
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
  }

  handleData():void{  
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
