import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


import { PunishmentRewardProvider } from '../../providers/punishment-reward/punishment-reward';
/**
 * Generated class for the PunishmentDeliverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-punishment-deliver',
  templateUrl: 'punishment-deliver.html',
})
export class PunishmentDeliverPage {
  titleName:string='';
  deptName:string='';
  punishmentDetail:any=[];
  depts:any=[];
  deptAmount : number;
  isShop :boolean =false;
  isDept :boolean =false;
  amountCount:number =0;
  amountShop :number;
  amountPosition:number;
  commnent :string ='';
  description : string ='';
  testDepts :any;

  constructor(public navCtrl: NavController
              , public navParams: NavParams
              ,public alertCtrl:AlertController
              ,private loadingCtrl : LoadingController
              ,public _punishmentRewardService:PunishmentRewardProvider
            ) {
              this._punishmentRewardService =_punishmentRewardService; 
              this.testDepts =[{"name":"victor","amount":100},{"name":"janet","amount":999}];
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad PunishmentDeliverPage');
    //test
    this.getShopDeptPunishment(1);
    //check isShop or isDept
    if(true){
      this.isShop = true;
    }else{
      //this.isDept = true;
    }
  }


handleGoback () {
    this.navCtrl.pop();
}

handleConfirm(){
  let id;
  let param;
    if(this.isShop){
      if(this.checkAmount(this.amountShop,this.amountCount)){
      id =2;
      //test
      param =[{
        "department": 1,
        "amount": 100
    },
    {
        "department": 2,
        "amount": 100
    },
    {
        "department": 3,
        "amount": 100
    },
    {
        "department": 4,
        "amount": 100
    },
    {
        "department": 5,
        "amount": 100
    },
    {
        "department": 6,
        "amount": 100
    }];
      this.deliverShopPunishement(param,id);
    }else{
      this.alertAmount();
      }
    }else if(this.isDept){
      if(this.checkAmount(this.amountPosition,this.amountCount)){
      id=26;
      param ={};
      this.deliverDeptPunishment(param,id);
      }else{
        this.alertAmount();
      }
    }

}

checkAmount(amount:number,amountCount:number):boolean{
  if(amount == amountCount){
    return true;
  }else{
    return false;
  }
}
 
alertAmount(){
  let amountAlert = this.alertCtrl.create(
    {
      title:"amount 总数不相等"
    }
  );
  amountAlert.present();
  setTimeout(() => {
    amountAlert.dismiss();
  }, 1000);
}

getShopDeptPunishment(id:number):void{
  let loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 3000
    });
    loader.present().then(() => {this._punishmentRewardService.getShopPunishment(id).subscribe(
      data => {          
        this.punishmentDetail=data;
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
      () =>{
        this.handleData();
      }
    )}
    )
}

handleData():void{
  if(this.punishmentDetail){
    this.count(this.punishmentDetail);
    this.commnent = this.punishmentDetail.comment;
    this.description= this.punishmentDetail["comment"];
    this.depts= this.punishmentDetail["部门信息"];
    this.titleName = this.punishmentDetail.target_id;
    this.deptName = this.depts[0].name;
  }
}

count(data:any):void{
  this.amountCount =0;
  if(data.length >1){
    data.forEach(element => {
      this.amountCount = this.amountCount +element.amount;
    });
  }else{
    this.amountCount =data.amount;
  }
}

deliverDeptPunishment(viewParam:any,id:number):void{
  this._punishmentRewardService.deliverDeptPunishment(viewParam,id).subscribe(
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

deliverShopPunishement(viewParam:any,id:number):void{
  this._punishmentRewardService.deliverShopPunishement(viewParam,id).subscribe(
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

}
