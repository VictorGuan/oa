import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { SchedulingProvider } from '../../providers/scheduling/scheduling';
import { EventHandlerProvider } from '../../providers/event-handler/event-handler';
/**
 * Generated class for the EmployeeSchedulingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employee-scheduling-detail',
  templateUrl: 'employee-scheduling-detail.html',
})
export class EmployeeSchedulingDetailPage {

  routeItem:any;
  routeId:number;
  routeName:string;
  routeMonth : number;
  routeYear : number;
  days:Array<any>;
  showDay:any=[];
  dayCurrent:any;
  colors = ["#19B741","#AD2FEE","#EE2F63"]
  employeeScheduleData : any;
  scheduleDay:any;
  break:number;
  constructor(public navCtrl: NavController
              , public navParams: NavParams
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
              this.days = [
      [
        {no:1,text:"",flag:1},
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


  this.showDay = [   
      {no:1,text:"",flag:0},
      {no:2,text:"",flag:0},
      {no:3,text:"",flag:0},
      {no:4,text:"",flag:0},
      {no:5,text:"",flag:0},
      {no:6,text:"",flag:0},
      {no:7,text:"",flag:0},      
      {no:8,text:"",flag:0},
      {no:9,text:"",flag:0},
      {no:10,text:"",flag:0},
      {no:11,text:"",flag:0},
      {no:12,text:"",flag:0},
      {no:13,text:"",flag:0},
      {no:14,text:"",flag:0},    
      {no:15,text:"",flag:0},
      {no:16,text:"",flag:0},
      {no:17,text:"",flag:0},
      {no:18,text:"",flag:0},
      {no:19,text:"",flag:0},
      {no:20,text:"",flag:0},
      {no:21,text:"",flag:0},
      {no:22,text:"",flag:0},
      {no:23,text:"",flag:0},
      {no:24,text:"",flag:0},
      {no:25,text:"",flag:0},
      {no:26,text:"",flag:0},
      {no:27,text:"",flag:0},
      {no:28,text:"",flag:0},
      {no:29,text:"",flag:0},
      {no:30,text:"",flag:0}]
};

  ionViewDidLoad(){ 
    let viewParam ={
      "year":this.routeYear,
      "month":this.routeMonth
    };
    //let id = this.routeId;
    let id =25;
    this.showEmployeeSchedule(viewParam,id);
  }

  handleGoback () {
    this.navCtrl.pop();
  }

  handleOnDaySelect (day) {
    this.dayCurrent = day ;
  }

  showEmployeeSchedule(viewParam:any,id:number){
    this._schedulingProvider.showEmployeeSchedule(viewParam,id).subscribe(
      data => {
        if(data){
          this.employeeScheduleData =data
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
    this.activeMonth();
    if(this.employeeScheduleData){
      this.scheduleDay = this.employeeScheduleData.days;
      this.break = this.employeeScheduleData.break;
    }
  }

  mappingDays():void{
    
  }

  isActive(id:number){
    if(id == this.routeMonth){
      return "actived"
    }else{
      return "";
    }
  }

  activeMonth():void{
    for(let i=1;i<=12;i++){
      this.isActive(i);
    }
  }
}
