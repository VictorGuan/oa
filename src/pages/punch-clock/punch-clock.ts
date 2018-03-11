import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';

import { AttendanceCheckProvider } from '../../providers/attendance-check/attendance-check';
import { EventHandlerProvider } from '../../providers/event-handler/event-handler';

/**
 * Generated class for the PunchClockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-punch-clock',
  templateUrl: 'punch-clock.html',
})
export class PunchClockPage {

  onOfficeTime :any;
  currentDay : any;
  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public alertCtrl:AlertController
              ,public _attendanceCheckProvider : AttendanceCheckProvider
              ,public eventHandler : EventHandlerProvider  
            ) {
              this._attendanceCheckProvider =_attendanceCheckProvider;
              this.eventHandler = eventHandler;
              this.currentDay = new Date().toLocaleDateString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PunchClockPage');
    this.getCurrentDayOnOfficeTime();
  }
  handleGoback () {
    this.navCtrl.pop();
  }
  handleNormalExplain () {
    this.alertCtrl.create({
      title:"迟到原因",
      inputs:[{
        name:"text",
        placeholder:"迟到原因"
      }],
      buttons:[{
        text:"取消",
        handler: () => {}
      },{
        text:"确定",
        handler: () => {}
      }]
    }).present();
  }
  
  handleLeaveExplain () {
    this.alertCtrl.create({
      title:"早退原因",
      inputs:[{
        name:"text",
        placeholder:"早退原因"
      }],
      buttons:[{
        text:"取消",
        handler: () => {}
      },{
        text:"确定",
        handler: () => {}
      }]
    }).present();
  }

  getCurrentDayOnOfficeTime():void{
    this._attendanceCheckProvider.getCurrentDayOnOfficeTime().subscribe(
      data => {
        if(data){
          this.onOfficeTime = data;
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

  addClockOnAndOff(viewParam:any):void{
    this._attendanceCheckProvider.addClockOnAndOff(viewParam).subscribe(
      data => {
        this.eventHandler.successHandle(data);
      },
      (error) => {
        this.eventHandler.errorHandle(error);
      },
      () =>{
        //this.handleData();
      }
    )
  }
}
