import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AttendanceCheckProvider } from '../../providers/attendance-check/attendance-check';
import { EventHandlerProvider } from '../../providers/event-handler/event-handler';

/**
 * Generated class for the AttendanceSettingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attendance-setting-detail',
  templateUrl: 'attendance-setting-detail.html',
})
export class AttendanceSettingDetailPage {

  routeItem:any;
  routeItemId:number;
  postionAttendanceData:any;
  isApply : boolean;
  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public _attendanceCheckProvider : AttendanceCheckProvider
              ,public eventHandler : EventHandlerProvider    
            ) {
              this.routeItem = navParams.get('item');
              this.routeItemId = this.routeItem.id;
              this._attendanceCheckProvider =_attendanceCheckProvider;
              this.eventHandler = eventHandler;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendanceSettingDetailPage');
    this.isApply =false;
    let id = this.routeItemId;
    this.getPositionsAttendanceCheckList(id);
  }

  handleGoback () {
    this.navCtrl.pop();
  }

  handleSubmit(){
    
    let id = this.routeItemId;
    let viewParam =[];
    for(let i=0;i<this.postionAttendanceData.length;i++){
      if(this.postionAttendanceData.applicaiton && this.postionAttendanceData.applicaiton.length>0){
        break;
      }else{
        let item ={
          "name":this.postionAttendanceData.name,
          "amount":this.postionAttendanceData.amount
        };
        viewParam.push(item);
      }
    }
    /*test;
    let id =5;
    let viewParam =[
      {
        "name": "迟到",
        "amount": 100
      },
      {
        "name": "早退",
        "amount": 100
      },
      {
        "name": "旷工",
        "amount": 100
      },
      {
        "name": "请假",
        "amount": 100
      },
      {
        "name": "全勤",
        "amount": 100
      }
    ];*/
    this.addAttendanceCheckApply(viewParam,id);
  }

  addAttendanceCheckApply(viewParam:Array<any>,id:number):void{
    this._attendanceCheckProvider.addAttendanceCheckApply(viewParam,id).subscribe(
      data => {
        this.eventHandler.successHandle(data);
      },
      (error) => {
        this.eventHandler.errorHandle(error);
      },
      () =>{
        this.navCtrl.pop();
      }
    )
  }


  getPositionsAttendanceCheckList(id:number):void{
    this._attendanceCheckProvider.getPositionsAttendanceCheckList(id).subscribe(
      data => {
        if(data){
          this.postionAttendanceData = data;
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

  }

  checkAppalication(item:any):boolean{
    if(item.applicaiton && item.applicaiton.length >0){
      return true;
    }else{
      return false;
    }
  }

  triggerApply(){
    this.isApply = false;
  }
}
