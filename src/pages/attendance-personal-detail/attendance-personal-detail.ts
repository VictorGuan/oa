import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController ,MenuController} from 'ionic-angular';

import { AttendanceCheckProvider } from '../../providers/attendance-check/attendance-check';
import { EventHandlerProvider } from '../../providers/event-handler/event-handler';
/**
 * Generated class for the AttendancePersonalDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attendance-personal-detail',
  templateUrl: 'attendance-personal-detail.html',
})
export class AttendancePersonalDetailPage {
  personalAttendanceDetailData:any;
  menu:any;
  status:number;
  filter:number;
  selectDate:string;
  year:string;
  month:string;
  day:string;
  isCalendar : boolean;
  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public modalCtrl:ModalController
              ,public menuCtrl:MenuController
              ,public _attendanceCheckProvider : AttendanceCheckProvider
              ,public eventHandler : EventHandlerProvider 
            ) {
              this.menu = menuCtrl ;
              this._attendanceCheckProvider =_attendanceCheckProvider;
              this.eventHandler = eventHandler;
              this.isCalendar = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendancePersonalDetailPage');
  }

  
  handleGoback () {
    this.navCtrl.pop();
  }

  search():void{
    let param={
      "year": "2018",
      "month": "01",
      "day": "22",
      "filter": 0
    };
    this.getEmployeeAttendanceChcekDetail(param);
  }

  reset():void{
    this.selectDate='';
    this.filter = 9999;
  }

  handleItemDetail () {
    this.modalCtrl.create('AttendancePersonalCheckDetailPage').present();
  }

  getEmployeeAttendanceChcekDetail(viewParam:any){
    this._attendanceCheckProvider.getEmployeeAttendanceChcekDetail(viewParam).subscribe(
      data => {
        if(data){
          this.personalAttendanceDetailData = data;
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

   }
  
}
