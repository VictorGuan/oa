import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,MenuController} from 'ionic-angular';

import { PunishmentRewardProvider } from '../../providers/punishment-reward/punishment-reward';
import { Punishment } from '../../models/punishment';

/**
 * Generated class for the PunishmentRewardRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-punishment-reward-record',
  templateUrl: 'punishment-reward-record.html',
})
export class PunishmentRewardRecordPage {
    type:number;
    status:number;
    tabIndex:string;
    selectedDate :string ='';
    //punishments : Array<Punishment>[] =[];
    empPunishments :any =[];
    empDeliver : any =[];
    rewardCount:number=0;
    punishmentCount:number= 0;
    amountCount :number=0;
    titleDate:string ='';
    constructor (public navCtrl:NavController 
                ,public alertCtrl:AlertController 
                ,public menuCtrl:MenuController 
                ,public _punishmentRewardService:PunishmentRewardProvider
            
            ) {
                this._punishmentRewardService =_punishmentRewardService;  
        this.tabIndex = "1" ;
    }
    ionViewDidLoad() {
       
    }

    handleGoback () {
        this.navCtrl.pop();
    }
    handleShowFilterMenu () {
        this.menuCtrl.toggle();
    }

    search ():void{
       /* let param={
            "month": this.selectedDate,
            "type": this.type
        } */
        //test
        let paramPunishment={
            "month": "2018-01-01",
            "type": -1
        }

        let paramDeliver={
            "month": "2018-01-01",
            "status": 0
        }
        this.getMyPunishmentReward(paramPunishment);
        this.getMyDeliver(paramDeliver);
    }

    reset():void{
        this.selectedDate = "1901-01-01";
        this.type = 2;
        this.status = 2;
    }

    count(data):void{
        this.rewardCount=0;
        this.punishmentCount=0;
        this.amountCount=0;
        if(data){
            data.forEach(element => {
                if(element.type == 0){
                    this.rewardCount ++;
                }else{
                    this.punishmentCount ++
                }
                this.amountCount =this.amountCount+ Number(element.amount);
                this.titleDate=element.created_at;
            });
        }
    }

    getMyPunishmentReward(viewParam:any):void{
        this._punishmentRewardService.getMyPunishmentReward(viewParam).subscribe(
            data => {  
                if(data){
                    this.empPunishments =data;
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

    getMyDeliver(viewParam:any):void{
        this._punishmentRewardService.getMyDeliver(viewParam).subscribe(
            data => {  
                if(data){
                    this.empDeliver =data;
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
      if(this.empPunishments){
          this.count(this.empPunishments);
     }

    }

    changeIndex(event:any):void {
        switch(this.tabIndex){
            case "1":
                if(this.empPunishments){
                    this.count(this.empPunishments);
                }
            break;
            case "2":
                if(this.empPunishments){
                    this.count(this.empDeliver);
                }
            break;
            default:
            break;

        }
    }

}
