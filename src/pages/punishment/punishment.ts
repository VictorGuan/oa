import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MenuController , AlertController , ModalController} from 'ionic-angular';

import { PunishmentRewardProvider } from '../../providers/punishment-reward/punishment-reward';
import {BusinessServiceProvider} from '../../providers/business-service/business-service'; 
import { Business } from '../../models/business';
import {Shop} from '../../request/shop';
import {Dept} from '../../request/dept';
import {Position} from '../../models/position';
import { Punishment } from '../../models/punishment';
/**
 * Generated class for the PunishmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-punishment',
  templateUrl: 'punishment.html',
})
export class PunishmentPage {

  isReward:boolean =false;
  isPunishment:boolean=false;
  businesses : Array<Business>[] =[]; 
  shops:Array<Shop> =[];
  depts:Array<Dept> =[];
  positions: Array<Position>=[];
  punishments : Array<Punishment>[] =[];
  selectedItem :any ={
    business:'',
    shop:'',
    dept:'',
    positon:''
  };
  target_id : number=0;
  target_type : number=0;
  titleName :string='';
  type:number;
  status:number;
  active:number;
  constructor (public navCtrl:NavController 
               ,public menuCtrl:MenuController
               ,public alertCtrl:AlertController
               ,public modalCtrl:ModalController
               ,private _businessService:BusinessServiceProvider
               ,public _punishmentRewardService:PunishmentRewardProvider
            ) {
                this._businessService = _businessService;                
                this._punishmentRewardService =_punishmentRewardService;   
}

  handleGoback () {
      this.navCtrl.pop();
  }
  handleShowFilterMenu () {
      this.menuCtrl.toggle();
      this.getBusiness();
  }

  getBusiness(){
    this._businessService.getBusiness().subscribe(
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

  getStores(businessId):void{
    this._businessService.getShops(businessId).subscribe(
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

    getDept(id):void{
      this._businessService.getDept(id).subscribe(
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

    getPositions(selectedDeptId){
      this._businessService.getPositions(selectedDeptId).subscribe(
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


  handleItemClick(event:any):void{
      let viewParam ={
        "id": 1,
        "name": "修改1",
        "desc": "棋牌七宝卫生组员工罚单",
        "target_id": 6,
        "target_type": 2,
        "amount": 200,
        "type": 0,
        "status": 1,
        "active": "1"
      }
      this.alertCtrl.create({
          title:"修改",
          inputs:[{
              name:"name",
              placeholder:"名称",
          },{
              name:"describe",
              placeholder:"介绍",
          },{
              name:"money",
              placeholder:"金额",
          }],
          buttons:[{
              text:"取消",
              handler: data => {}
          },{
              text:"确定",
              handler: data => {
                this.editPunishmentReward(viewParam);
              }
          }]
      }).present();
  }

  editPunishmentReward(viewParam:any){
    this._punishmentRewardService.editPunishmentReward(viewParam).subscribe(
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
        }
      )
  }

  searchPunishmentReward(viewParam:any){
    this._punishmentRewardService.searchPunishmentReward(viewParam).subscribe(
        data => {
          if(data){
            this.punishments = data
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
          this.menuCtrl.close();
        })
  }

  handleData():void{
    
  }

  handleAdd():void{
     this.navCtrl.push('PunishmentRewardCreatePage');
  }

  search(event:any):void{
    let viewParam ={
        "target_id": this.target_id,
        "target_type": this.target_type,
        "type": this.type,
        "active": this.active,
        "status": this.status
      }
    this.searchPunishmentReward(viewParam);
  }

  reset():void{
    this.businesses =[];
    this.shops =[];
    this.depts=[];
    this.positions =[];
    this.isPunishment=false;
    this.isReward=false;
  }

  change(item:any):void{
    let id;
    switch(item){
      case 'business':
        this.shops =[];
        this.depts =[];
        this.positions=[];
        id = this.selectedItem.business;
        this.getStores(id);
        this.target_type =0;
        this.target_id =id;
        this.selectedItem.business = this.findSelectedName(id,this.businesses);
      break;
      case 'shop':
        this.depts =[];
        this.positions=[];
        id = this.selectedItem.shop;
        this.getDept(id);
        this.selectedItem.shop = this.findSelectedName(id,this.shops);
        this.target_type =1;
      break;
      case 'dept':
        this.positions =[];
        id = this.selectedItem.shop;
        this.getPositions(id);
        this.target_type =2;
        this.target_id =id;
        this.selectedItem.dept = this.findSelectedName(id,this.depts);
      break;
      case 'position':
        this.target_type =3;
        this.target_id =id;
        this.selectedItem.position = this.findSelectedName(id,this.positions);       
      break
      default:
      break;
    }
  }

  changeType(val):void{
    switch(val){
      case 0 :
        this.isReward = !this.isReward;
      break;
      case 1 :
        this.isPunishment = !this.isPunishment
      break;
      default:
      break;
    }
    if(this.isReward && this.isPunishment){
      this.type= -1;
    }else if(this.isReward){
      this.type =1
    }else if(this.isPunishment){
      this.type =0;
    }else{
      this.type = -1;
    }

  }

  findSelectedName(id:number,arr:any):string{
    if(id&&arr){
      arr.forEach(element => {
        if(id == element.id){
          return element.name;
        }
      });
    }else{
      return '';
    }
  }

}
