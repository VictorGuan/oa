import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController,MenuController} from 'ionic-angular';

import { AttendanceCheckProvider } from '../../providers/attendance-check/attendance-check';
import { EventHandlerProvider } from '../../providers/event-handler/event-handler';
/**
 * Generated class for the AttendanceCheckDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attendance-check-detail',
  templateUrl: 'attendance-check-detail.html',
})
export class AttendanceCheckDetailPage {

  routeItem:any;
  attendanceDetailData:any;
  menu:any;
  status:number;
  filter:number;
  selectDate:string;
  year:string;
  month:string;
  day:string;
  isCalendar : boolean;
  isPositionView:boolean;
  isPersonalView:boolean;
  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public modalCtrl:ModalController  
              ,public menuCtrl:MenuController
              ,public _attendanceCheckProvider : AttendanceCheckProvider
              ,public eventHandler : EventHandlerProvider 
            ) {
              this.menu = menuCtrl ;
              this.routeItem = navParams.get('item');
              this.isPositionView = navParams.get('view') == 'position' ? true : false;
              this.isPersonalView = navParams.get('view') == 'personal' ? true : false;
              this._attendanceCheckProvider =_attendanceCheckProvider;
              this.eventHandler = eventHandler;
              this.isCalendar = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendanceCheckDetailPage');
  }

  handleGoback () {
    this.navCtrl.pop();
  }

  handleItemDetail(item){
    //this.modalCtrl.create('AttendanceCheckItemDetailPage').present();
    if(this.isPositionView){
      this.navCtrl.push('AttendanceCheckItemDetailPage',{item:item,"view":"position"});
    }
    if(this.isPersonalView){
      this.navCtrl.push('AttendanceCheckItemDetailPage',{item:item,"view":"personal"});
    }
  }



  showEmployeeAttendanceCheckRecord(viewParam:any,id:number):void{
    this._attendanceCheckProvider.showEmployeeAttendanceCheckRecord(viewParam,id).subscribe(
      data => {
        if(data){
          this.attendanceDetailData = data;
        }
      },
      (error) => {
        this.eventHandler.errorHandle(error);
      },
      () =>{
        this.menu.close();
        this.handleData();
      }
    )
  }

  getEmployeePersonalAttendanceChcekDetail(viewParam:any){
    this._attendanceCheckProvider.getEmployeeAttendanceChcekDetail(viewParam).subscribe(
      data => {
        if(data){
          this.attendanceDetailData = data;
        }
      },
      (error) => {
        this.eventHandler.errorHandle(error);
      },
      () =>{
        this.menu.close();
        this.handleData();
      }
    )
  }

  handleData():void{
    if(this.attendanceDetailData.length >0){
      this.year = this.getStringDateItem('year',this.attendanceDetailData[0].date);
      this.month = this.getStringDateItem('month',this.attendanceDetailData[0].date);
      this.day = this.getStringDateItem('day',this.attendanceDetailData[0].date);
      this.isCalendar = true;
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

  search(event:any):void{
    if(this.selectDate){
      let year = this.getStringDateItem('year',this.selectDate);
      let month = this.getStringDateItem('month',this.selectDate);
      let day = this.getStringDateItem('day',this.selectDate);
      //let id = this.routeItem.id;
      if(this.isPositionView){
        let viewParam = {
          "year":year,
          "month":month,
          "day":day,
          "filter":Number(this.filter)
        };
        //test
        let param ={
          "year": "2018",
          "month": "01",
          "day": "22",
          "filter": 0
        };
        let id = this.routeItem.id;
        this.showEmployeeAttendanceCheckRecord(viewParam,id);
      }
      if(this.isPersonalView){
        let param ={
          "year": year,
          "month": month,
          "day": day,
          "filter": Number(this.filter)
        }
        this.getEmployeePersonalAttendanceChcekDetail(param);
      }
    }
  }

  reset():void{
    this.selectDate='';
    this.filter =9999;
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
      default:
      break;
    }
    return '';
  }

  checkOnduty(item:any):string{
    let hourFrom = new Date(item.on_duty_time).getHours();
    let minuteFrom = new Date(item.on_duty_time).getMinutes();
    let hourTo = new Date(item.off_duty_time).getHours();
    let minuteTo = new Date(item.off_duty_time).getMinutes();
    if((Number(item.from.slice(0,item.from.indexOf(':'))) < hourFrom) || (Number(item.to.slice(0,item.from.indexOf(':'))) > hourTo) ){
      return '有无效的打卡记录';
    }else if((Number(item.from.slice(0,item.from.indexOf(':'))) == hourFrom && Number(item.from.slice(item.from.indexOf(':')+1,item.from.indexOf(':')+3)) < minuteFrom)
              || (Number(item.to.slice(0,item.to.indexOf(':'))) == hourTo && Number(item.to.slice(item.to.indexOf(':')+1,item.to.indexOf(':')+3)) > minuteTo)
            ){
      return '有无效的打卡记录';
    }else{
      return '正常打卡';
    }
  }

}
