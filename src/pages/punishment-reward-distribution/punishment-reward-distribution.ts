import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController,AlertController} from 'ionic-angular';

import { PunishmentRewardProvider } from '../../providers/punishment-reward/punishment-reward';
import {BusinessServiceProvider} from '../../providers/business-service/business-service'; 
import { Business } from '../../models/business';
import {Shop} from '../../request/shop';
import {Dept} from '../../request/dept';
import {Position} from '../../models/position';
import { Punishment } from '../../models/punishment';

/**
 * Generated class for the PunishmentRewardDistributionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-punishment-reward-distribution',
  templateUrl: 'punishment-reward-distribution.html',
})
export class PunishmentRewardDistributionPage {
  type:number;
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
  avalible:Array<any>;
  unAvalible:Array<any>;
  patchParams :Array<any>=[];

constructor ( public navCtrl:NavController 
             ,public menuCtrl:MenuController
             ,public alertCtrl:AlertController
             ,private _businessService:BusinessServiceProvider
             ,public _punishmentRewardService:PunishmentRewardProvider
            ) {
              this._businessService = _businessService;                
              this._punishmentRewardService =_punishmentRewardService;   
      }

ionViewDidLoad() {
  console.log('ionViewDidLoad PunishmentRewardDistributionPage');
}

handleGoback () {
  this.navCtrl.pop();
}

handleShowFilterMenu () {
  this.menuCtrl.toggle();
  this.getBusiness();
}

handleConfirm():void{
  /*let pa =[
    {
        "id": 1,
        "status": 0
    },
    {
        "id": 2,
        "status": 1
    },
    {
        "id": 3,
        "status": 1
    },
    {
        "id": 4,
        "status": 0
    }
]*/
  this.patchActivePunishmentReward(this.patchParams);
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

patchActivePunishmentReward(viewParam:any){
  this._punishmentRewardService.patchActivePunishmentReward(viewParam).subscribe(
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

searchActivePunishmentReward(viewParam:any){
  this._punishmentRewardService.searchActivePunishmentReward(viewParam).subscribe(
      data => {
        if(data){
          this.punishments = data
        }       
        },
      (error) => {
      },
      () =>{
        this.handleData();
        this.menuCtrl.close();
      })
}

handleData():void{
  this.avalible =[];
  this.unAvalible =[];
  if(this.punishments){
    this.checkStatus(this.punishments);
    this.getPatchParams(this.punishments);
  }  
}

checkStatus(data:any){
  if(data){
    data.forEach(element => {
      if(element.status == "1"){
        this.avalible.push(element);
      }else{
        this.unAvalible.push(element);
      }
    });
  }
}

getPatchParams(data:any):void{
  this.patchParams=[];

  if(data){
    data.forEach(element => {
      let param ={
        "id":element.id,
        "status":element.status
      }
      this.patchParams.push(param);
    });
  }
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

findSelectedName(id:number,arr:any):string{
  if(id&&arr){
    arr.forEach(element => {
      if(id == element.id){
        this.titleName = element.name;
        return element.name;
      }
    });
  }else{
    return '';
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

search(event:any):void{
  let viewParam ={
      "target_id": this.target_id,
      "target_type": this.target_type,
      "type": this.type
    }
    /*test
     let viewParam =
      {
        "target_id": 6,
        "target_type": 2,
        "type": 0
      }*/
    
  this.searchActivePunishmentReward(viewParam);
}

reset():void{
  this.businesses =[];
  this.shops =[];
  this.depts=[];
  this.positions =[];
  this.isPunishment=false;
  this.isReward=false;
}

}
