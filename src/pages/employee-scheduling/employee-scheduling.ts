import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SchedulingProvider } from '../../providers/scheduling/scheduling';
import { EventHandlerProvider } from '../../providers/event-handler/event-handler';

/**
 * Generated class for the EmployeeSchedulingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employee-scheduling',
  templateUrl: 'employee-scheduling.html',
})
export class EmployeeSchedulingPage {
  days:Array<any>;
  dayCurrent:any;
  colors = ["#19B741","#AD2FEE","#EE2F63"]
  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public _schedulingProvider :SchedulingProvider  
              ,public eventHandler : EventHandlerProvider 
            ) {
              this._schedulingProvider =_schedulingProvider;
              this.eventHandler = eventHandler;
    this.days = [
      [
        {no:1,text:"早班",flag:1},
        {no:2,text:"",flag:0},
        {no:3,text:"中班",flag:2},
        {no:4,text:"早班",flag:1},
        {no:5,text:"",flag:0},
        {no:6,text:"早班",flag:1},
        {no:7,text:"",flag:0}
      ],
      [
        {no:8,text:"晚班",flag:3},
        {no:9,text:"",flag:0},
        {no:10,text:"中班",flag:2},
        {no:11,text:"",flag:0},
        {no:12,text:"晚班",flag:3},
        {no:13,text:"",flag:0},
        {no:14,text:"早班",flag:1}
      ],
      [
        {no:15,text:"",flag:0},
        {no:16,text:"中班",flag:2},
        {no:17,text:"",flag:0},
        {no:18,text:"早班",flag:1},
        {no:19,text:"晚班",flag:3},
        {no:20,text:"",flag:0},
        {no:21,text:"早班",flag:1}
      ],
      [
        {no:22,text:"",flag:0},
        {no:23,text:"晚班",flag:3},
        {no:24,text:"",flag:0},
        {no:25,text:"中班",flag:2},
        {no:26,text:"",flag:0},
        {no:27,text:"早班",flag:1},
        {no:28,text:"",flag:0}
      ],
      [
        {no:29,text:"",flag:0},
        {no:30,text:"早班",flag:1}
      ]
    ]
  }

  ionViewDidLoad() {
    
  }

  handleGoback () {
    this.navCtrl.pop();
  }

  handleOnDaySelect (day) {
    this.dayCurrent = day ;
  }
  handleSave () {}

  setEmployeeSchedule(viewParam:any,id:number){
    this._schedulingProvider.setEmployeeSchedule(viewParam,id).subscribe(
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

}
