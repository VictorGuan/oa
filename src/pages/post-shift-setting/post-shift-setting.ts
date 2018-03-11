import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SchedulingProvider } from '../../providers/scheduling/scheduling';
import { EventHandlerProvider } from '../../providers/event-handler/event-handler';

import { Schedule } from '../../models/schedule';
/**
 * Generated class for the PostShiftSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-shift-setting',
  templateUrl: 'post-shift-setting.html',
})
export class PostShiftSettingPage {

  routeItem:any;
  routeId:number;
  routeName:string;
  routeMonth : number;
  routeYear : number;
  break:number;
  scheduleModel : Schedule;
  typesModel: Array<any> =[];
  typeModel:any={};
  isEdit:boolean =false;
  isAdd:boolean =false;

  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public _schedulingProvider :SchedulingProvider  
              ,public eventHandler : EventHandlerProvider         
            ) {
              this._schedulingProvider =_schedulingProvider;
              this.eventHandler = eventHandler;
              this.routeItem = navParams.get('item');
              this.routeId = this.routeItem.item.id;
              this.routeName = this.routeItem.item.name;
              this.routeMonth = this.routeItem.Date.month;
              this.routeYear = this.routeItem.Date.year;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostShiftSettingPage');
    let id = this.routeId;
    let viewParam = this.routeItem.Date;
    this.showPositionSchedule(viewParam,id);
  }

    // 返回
    handleGoback(){
      this.navCtrl.pop();
    }
  
    handleSubmit(){
      this.scheduleModel.year = this.routeYear;
      this.scheduleModel.month = this.routeMonth;
      this.scheduleModel.break = Number(this.break);
      this.scheduleModel.types = this.typesModel; 
      let id = this.routeId;
      let viewParam ={
        "year": this.scheduleModel.year,
        "month": this.scheduleModel.month,
        "break": this.scheduleModel.break,
        "types": this.scheduleModel.types
      }
      this.addPositionSchedule(viewParam,id);
    }

  addPositionSchedule(viewParam:any,id:number){
        this._schedulingProvider.addPositionSchedule(viewParam,id).subscribe(
          data => {
            this.eventHandler.successHandle(data);
          },
          (error) => {
            this.eventHandler.errorHandle(error);
          },
          () =>{
          }
        )
      }

  editPositionSchedule(viewParam:any,id:number){
        this._schedulingProvider.editPositionSchedule(viewParam,id).subscribe(
          data => {
            this.eventHandler.successHandle(data);
          },
          (error) => {
            this.eventHandler.errorHandle(error);
          },
          () =>{
          }
        )
      }

  showPositionSchedule(viewParam:any,id:number){
        this._schedulingProvider.showPositionSchedule(viewParam,id).subscribe(
          data => {
            //this.eventHandler.successHandle(data);
            if(data){
              this.scheduleModel =data;
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
  
  handleData():void{
    if(this.scheduleModel && this.scheduleModel.types){
      this.isEdit =true;
      this.isAdd =false;
      this.typesModel =this.scheduleModel.types;
      this.break = this.scheduleModel.break;
    }{
      this.isEdit =false;
      this.isAdd =true;
      let type;
      if(this.typesModel){
        for(let i=0;i<3;i++){
          type={
            "type":i,
            "from":"",
            "to":""
          };
          this.typesModel.push(type);
        }
      }
    }
  }

  changeType(type:string,event:any):void{
    switch(type){
      case "morning":
        if(event._value){
          this.typeModel.type=0;
        }else{
          this.typeModel.type =-1;
        }
        break;
      case "afternoon":
        if(event._value){
          this.typeModel.type =1;
        }else{
          this.typeModel.type =-1;
        }
      break;
      case "evening":
        if(event._value){
          this.typeModel.type =2;
        }else{
          this.typeModel.type =-1;
        }
      break;
      default:
      break;
    }
  }

  getExistance(i:number):boolean{
    if(i==1){
      return true;
    }else{
      return false;
    }
  }
  
}
