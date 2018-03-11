import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AttendanceCheckProvider } from '../../providers/attendance-check/attendance-check';
import { EventHandlerProvider } from '../../providers/event-handler/event-handler';
/**
 * Generated class for the AttendanceCheckItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attendance-check-item-detail',
  templateUrl: 'attendance-check-item-detail.html',
})
export class AttendanceCheckItemDetailPage {
  routeItem:any;
  routeItemId :number;
  attendanceDetailItemData:any;
  attendanceDetailItemModel:any={};
  checkModel:any ={};
  year:string;
  month:string;
  day:string;
  comments:string;
  decision:number;
  describles:string;
  isPositionView:boolean;
  isPersonalView:boolean;
  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public _attendanceCheckProvider : AttendanceCheckProvider
              ,public eventHandler : EventHandlerProvider             
            ) {
              this.routeItem = navParams.get('item');
              this.routeItemId = this.routeItem.id;
              this.routeItem = navParams.get('item');
              this.isPositionView = navParams.get('view') == 'position' ? true : false;
              this.isPersonalView = navParams.get('view') == 'personal' ? true : false;
              this._attendanceCheckProvider =_attendanceCheckProvider;
              this.eventHandler = eventHandler;
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendanceCheckItemDetailPage');
    if(this.isPersonalView){
      this.attendanceDetailItemModel = this.routeItem;
      let checkModels= this.attendanceDetailItemModel.check;
      this.checkModel = checkModels[0];
      this.handleData();
    }
    if(this.isPositionView){
      let id = this.routeItemId;
      this.getAttendanceCheckDetailList(id);
    }
  }
  
  handleGoback () {
    this.navCtrl.pop();
  }

  handleSubmit(){
    if(this.comments && this.decision){
      let id =7
      let param ={
        "attendance_record": this.attendanceDetailItemModel.id,
        "decision": Number(this.decision),
        "comment": this.comments
      }
      this.verifyAttendanceCheckDetail(param,id);
    }

  }

  getAttendanceCheckDetailList(id:number):void{
    this._attendanceCheckProvider.getAttendanceCheckDetailList(id).subscribe(
      data => {
        if(data){
          this.attendanceDetailItemData = data;
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

  verifyAttendanceCheckDetail(viewParam:any,id:number):void{
    this._attendanceCheckProvider.verifyAttendanceCheckDetail(viewParam,id).subscribe(
      data => {
        this.eventHandler.successHandle(data);
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
    if(this.attendanceDetailItemData){
      this.attendanceDetailItemModel = this.attendanceDetailItemData;
    }
    if(this.attendanceDetailItemModel){
      this.year = this.getStringDateItem('year',this.attendanceDetailItemModel.date);
      this.month = this.getStringDateItem('month',this.attendanceDetailItemModel.date);
      this.day = this.getStringDateItem('day',this.attendanceDetailItemModel.date);
      this.describles = this.attendanceDetailItemModel.describles.toString();
    }
  }

  getStringDateItem(type:string,stringDate:string):string{
    let value;
    switch(type){
      case "year":
        value = new Date(stringDate).getFullYear().toString();
      break;
      case "month":
        value = (new Date(stringDate).getMonth() +1).toString();
      break;
      case "day":
        value = new Date(stringDate).getDate().toString();
      break;
      default:
      break;
    }
    return value;
  }

  mapStatus(type:string,num:any):string{
    switch(type){
      case 'finalStatus':
        switch(num){
          case '0':
          return '正常';
          case '1':
          return '迟到';
          case '2':
          return '早退';
          case '3':
          return '旷工';
          case '-1':
          return '刚建立';
          default:
          break;
        }
      //break;
      case 'isAmended':
        switch(num){
          case '0':
          return '异常';
          case '1':
          return '正常';
          default:
          return '异常';
        }
      //break;
      case 'status':
        switch(num){
          case '0':
          return '刚建立，未核对';
          case '1':
          return '已经核对';
          default : 
          return '未核对';
        }
      //break;
      case 'decision':
      switch(num){
        case '0':
        return '正常';
        case '1':
        return '迟到';
        case '2':
        return '早退';
        case '3':
        return '旷工';
        default:
        break;
      }
      default:
      break;
    }
    return '';
  }
}
